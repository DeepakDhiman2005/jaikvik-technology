import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import aiResponses from './aiResponses';
import conversationPatterns from './conversationPatterns';
import serviceOptions from './serviceOptions';
import type { AIMessage, AnalyticsEvent, ConversationContextItem } from '../interfaces/ai-interface';
import AIContactModal from './AIContactModal';
import inactivityMessages from './inactivityMessages';

// Define interfaces for aiResponses
interface AIResponseCategory {
  keywords?: string[];
  priority: number;
  responses: string[];
  followUp?: string;
  followUpThreshold?: number;
  intent: string;
  reachMessages?: Record<string, string>;
}

const ChatBot: React.FC = () => {
  const getTimestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<AIMessage[]>([{
    sender: 'bot',
    text: 'Welcome to Jaikvik Technology! How can I assist you today? Select a service or type a message below.',
    timestamp: getTimestamp()
  }]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [conversationContext, setConversationContext] = useState<ConversationContextItem[]>([]);
  // const [conversationHistory, setConversationHistory] = useState<AnalyticsEvent[]>([]);
  const [_, setConversationHistory] = useState<AnalyticsEvent[]>([]);

  const messagesRef = useRef<HTMLDivElement>(null);
  const inactivityTimer = useRef<number | null>(null);
  const typingTimeout = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChatOpen(true);
      trackInteraction('chatbot_opened');
      startInactivityTimer();
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isContactOpen) {
        setIsContactOpen(false);
        trackInteraction('contact_popup_closed');
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isContactOpen]);

  const log = (message: string, type: 'info' | 'error' = 'info') => {
    console[type](`[${getTimestamp()}] ${message}`);
  };

  const trackInteraction = (event: string, data: Record<string, any> = {}) => {
    const analyticsData: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      ...data,
      conversationLength: conversationContext.filter(m => m.sender === 'user').length,
    };
    setConversationHistory(prev => [...prev, analyticsData]);
    log(`Analytics event: ${event}, data: ${JSON.stringify(data)}`);
  };

  const startInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      if (messages.length > 0) {
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: inactivityMessages[messageIndex] || 'Are you still there?',
          timestamp: getTimestamp()
        }]);
        setMessageIndex((prev) => (prev + 1) % inactivityMessages.length);
        trackInteraction('inactivity_message_shown', { message: inactivityMessages[messageIndex] });
      }
      startInactivityTimer();
    }, 15000);
  };

  const sanitizeHTML = (str: string): string => {
    const div = document.createElement('div');
    div.innerHTML = str;
    const allowedTags = ['a', 'b', 'i', 'strong', 'em'];
    const allowedAttributes: Record<string, string[]> = { a: ['href', 'target'] };

    const sanitizeNode = (node: ChildNode) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tag = element.tagName.toLowerCase();
        if (!allowedTags.includes(tag)) {
          node.replaceWith(...Array.from(node.childNodes));
          return;
        }
        Array.from(element.attributes).forEach(attr => {
          if (!allowedAttributes[tag]?.includes(attr.name)) {
            element.removeAttribute(attr.name);
          }
        });
        Array.from(node.childNodes).forEach(sanitizeNode);
      }
    };

    sanitizeNode(div);
    return div.innerHTML;
  };

  const showTypingIndicator = () => {
    if (isTyping) return;
    setIsTyping(true);
    setMessages(prev => [...prev, { sender: 'typing', text: 'Bot is thinking', timestamp: '' }]);
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => prev.filter(msg => msg.sender !== 'typing'));
    }, 1000 + Math.random() * 2000);
  };

  const handleServiceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (!selectedValue) return;

    setInputValue(selectedValue);
    const userMessage: AIMessage = {
      sender: 'user',
      text: selectedValue,
      timestamp: getTimestamp()
    };
    setMessages(prev => [...prev, userMessage]);
    setConversationContext(prev => [...prev, {
      sender: 'user',
      message: selectedValue,
      category: 'services',
      intent: 'informational'
    }]);
    showTypingIndicator();

    setTimeout(() => {
      const { response, category } = getAIResponse(selectedValue, conversationContext);
      setMessages(prev => prev.filter(msg => msg.sender !== 'typing').concat([{
        sender: 'bot',
        text: response || 'Sorry, I couldn’t generate a response.',
        timestamp: getTimestamp()
      }]));
      setConversationContext(prev => [...prev, {
        sender: 'bot',
        message: response || 'Sorry, I couldn’t generate a response.',
        category,
        intent: aiResponses[category as keyof typeof aiResponses]?.intent || 'unknown'
      }]);
      checkConversationPatterns();

      const reachMessage = getReachMessage(selectedValue);
      if (reachMessage) {
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: reachMessage,
          timestamp: getTimestamp()
        }]);
        setConversationContext(prev => [...prev, {
          sender: 'bot',
          message: reachMessage,
          category: 'services',
          intent: 'informational'
        }]);
        trackInteraction('reach_message_displayed', { service: selectedValue });
      }

      trackInteraction('service_selected', { service: selectedValue });
      e.target.value = '';
    }, 1000 + Math.random() * 500);
  };

  const getReachMessage = (service: string): string | null => {
    return aiResponses?.services?.reachMessages?.[service?.toLowerCase() as keyof typeof aiResponses.services.reachMessages] || null;
  };

  const getAIResponse = (message: string, context: ConversationContextItem[]): { response: string, category: string } => {
    const lowerMessage = message.toLowerCase().trim();
    let bestMatch: { category: string; priority: number } = { category: 'default', priority: -1 };
    let responseData: AIResponseCategory;

    for (const key in aiResponses) {
      if (key === 'default') continue;
      const entry = aiResponses[key as keyof typeof aiResponses];

      if ('keywords' in entry && Array.isArray(entry.keywords)) {
        if (entry.keywords.some((keyword: string) => keyword.toLowerCase() === lowerMessage)) {
          bestMatch = { category: key, priority: aiResponses[key as keyof typeof aiResponses].priority };
          break;
        }
      }
    }

    if (bestMatch.priority === -1) {
      for (const key in aiResponses) {
        const response = aiResponses[key as keyof typeof aiResponses];

        // Skip if it's the default or if 'keywords' is not present
        if (key === 'default' || !('keywords' in response) || !Array.isArray(response.keywords)) continue;

        if (response.keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
          if (response.priority > bestMatch.priority) {
            bestMatch = { category: key, priority: response.priority };
          }
        }
      }
    }

    responseData = aiResponses[bestMatch.category as keyof typeof aiResponses];
    let response = responseData.responses[Math.floor(Math.random() * responseData.responses.length)] || 'Sorry, I couldn’t generate a response.';

    if (bestMatch.category === 'services') {
      response = response.replace('[SERVICE]', message);
    }

    if (context.length > 0) {
      const lastUserMessage = context.filter(m => m.sender === 'user').pop();
      const lastBotMessage = context.filter(m => m.sender === 'bot').pop();
      const conversationLength = context.filter(item => item.sender === 'user').length;
      const recentIntents = context.slice(-3).map(item => aiResponses[item.category as keyof typeof aiResponses]?.intent || 'unknown');
      const isCasual = recentIntents.includes('casual') && !recentIntents.includes('support') && !recentIntents.includes('contact');
      const isCommercial = recentIntents.includes('commercial');
      const isInformational = recentIntents.includes('informational');

      if (lastBotMessage?.category === bestMatch.category && Math.random() < (responseData.followUpThreshold || 0)) {
        response = responseData.followUp?.replace('[SERVICE]', message) || response;
      } else if (isCasual && conversationLength > 2 && Math.random() < 0.2) {
        response = `Loving our chat! Ready to dive into our software, apps, or marketing solutions?`;
      } else if (conversationLength > 4 && Math.random() < 0.2) {
        response = `Thanks for chatting! ${responseData.followUp?.replace('[SERVICE]', message) || ''}`;
      } else if (isCommercial && bestMatch.category === 'services') {
        response = `For pricing on ${message}, we'll need to understand your specific requirements. Would you like to discuss this with our sales team?`;
      } else if (isInformational && lastUserMessage?.intent === 'informational') {
        response = `To expand on ${lastUserMessage?.message}, ${response.toLowerCase()}`;
      }
    }

    return { response, category: bestMatch.category };
  };

  const checkConversationPatterns = () => {
    if (conversationContext.length < 2) return;

    const recentMessages = conversationContext.slice(-4);
    // const messageIntents = recentMessages.map(msg => msg.intent);

    for (const pattern of conversationPatterns) {
      if (pattern.steps.length > recentMessages.length) continue;

      let match = true;
      for (let i = 0; i < pattern.steps.length; i++) {
        const step = pattern.steps[i];
        const msg = recentMessages[recentMessages.length - pattern.steps.length + i];
        if (msg.sender !== step.type || msg.intent !== step.intent) {
          match = false;
          break;
        }
      }

      if (match) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            sender: 'bot',
            text: pattern.response || 'Let’s continue the conversation!',
            timestamp: getTimestamp()
          }]);
          setConversationContext(prev => [...prev, {
            sender: 'bot',
            message: pattern.response || 'Let’s continue the conversation!',
            category: 'followup',
            intent: 'followup'
          }]);
          trackInteraction('pattern_response', { pattern: pattern.name });
        }, 1500);
        break;
      }
    }
  };

  const sendMessage = async () => {
    const input = document.getElementById('jkvInput') as HTMLInputElement;
    if (!inputValue.trim()) {
      setInputValue('');
      input.setAttribute('aria-invalid', 'true');
      input.placeholder = 'Please enter a message';
      input.focus();
      setTimeout(() => {
        input.setAttribute('aria-invalid', 'false');
        input.placeholder = 'Type a message...';
      }, 2000);
      return;
    }

    const userMessage: AIMessage = {
      sender: 'user',
      text: inputValue,
      timestamp: getTimestamp()
    };
    const { category, intent } = analyzeMessage(inputValue);
    setMessages(prev => [...prev, userMessage]);
    setConversationContext(prev => [...prev, {
      sender: 'user',
      message: inputValue,
      category,
      intent
    }]);
    setInputValue('');
    showTypingIndicator();

    try {
      const processingTime = Math.min(2000, Math.max(800, inputValue.length * 20));
      await new Promise(resolve => setTimeout(resolve, processingTime));

      const { response, category: responseCategory } = getAIResponse(inputValue, conversationContext);

      if (response.length > 100) {
        showTypingIndicator();
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      setMessages(prev => prev.filter(msg => msg.sender !== 'typing').concat([{
        sender: 'bot',
        text: response || 'Sorry, I couldn’t generate a response.',
        timestamp: getTimestamp()
      }]));
      setConversationContext(prev => [...prev, {
        sender: 'bot',
        message: response || 'Sorry, I couldn’t generate a response.',
        category: responseCategory,
        intent: aiResponses[responseCategory as keyof typeof aiResponses]?.intent || 'unknown'
      }]);
      checkConversationPatterns();

      if (responseCategory === 'services') {
        const reachMessage = getReachMessage(inputValue);
        if (reachMessage) {
          await new Promise(resolve => setTimeout(resolve, 500));
          setMessages(prev => [...prev, {
            sender: 'bot',
            text: reachMessage,
            timestamp: getTimestamp()
          }]);
          setConversationContext(prev => [...prev, {
            sender: 'bot',
            message: reachMessage,
            category: 'services',
            intent: 'informational'
          }]);
          trackInteraction('reach_message_displayed', { service: inputValue });
        }
      }

      trackInteraction('message_sent', {
        message: inputValue,
        intent: responseCategory,
        responseLength: response.length
      });
    } catch (error) {
      const err = error as Error;
      setMessages(prev => prev.filter(msg => msg.sender !== 'typing').concat([{
        sender: 'bot',
        text: 'Sorry, something went wrong. Please try again.',
        timestamp: getTimestamp()
      }]));
      trackInteraction('message_error', { error: err.message });
    } finally {
      setIsTyping(false);
    }

    startInactivityTimer();
  };

  const analyzeMessage = (message: string): { category: string, intent: string } => {
    const lowerMessage = message.toLowerCase();
    let category = 'default';
    let intent = 'unknown';

    for (const [key, data] of Object.entries(aiResponses)) {
      if ('keywords' in data && Array.isArray(data.keywords)) {
        if (data?.keywords?.some((keyword: string) => keyword.toLowerCase() === lowerMessage)) {
          category = key;
          intent = data.intent;
          break;
        }
      }
    }

    if (category === 'default') {
      for (const [key, data] of Object.entries(aiResponses)) {
        if ('keywords' in data && Array.isArray(data.keywords)) {
          if (data?.keywords?.some((keyword: string) => lowerMessage.includes(keyword.toLowerCase()))) {
            if (data.priority > aiResponses[category as keyof typeof aiResponses].priority) {
              category = key;
              intent = data.intent;
            }
          }
        }
      }
    }

    if (lowerMessage.includes('how much') || lowerMessage.includes('price')) {
      intent = 'commercial';
    }
    if (lowerMessage.includes('thank')) {
      intent = 'gratitude';
    }
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      intent = 'farewell';
    }

    return { category, intent };
  };

  const resetConversation = () => {
    setMessages([{
      sender: 'bot',
      text: 'Welcome to Jaikvik Technology! How can I assist you today? Select a service or type a message below.',
      timestamp: getTimestamp()
    }]);
    setConversationContext([]);
    setConversationHistory([]);
    setInputValue('');
    startInactivityTimer();
    trackInteraction('conversation_reset');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 w-[clamp(280px,80%,360px)] bg-white p-[clamp(12px,3vw,16px)] rounded-xl shadow-lg z-[1000] font-sans transition-all duration-500 ease-out animate-slide-up ${isChatOpen ? 'block' : 'hidden'}`}
        role="dialog"
        aria-hidden={!isChatOpen}
        aria-label="Jaikvik AI Chatbot"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Jaikvik Technology Chatbot</h3>
          <FaTimes
            className="text-2xl text-gray-800 cursor-pointer transition-transform duration-300 hover:text-blue-500 hover:rotate-90"
            onClick={() => {
              setIsChatOpen(false);
              trackInteraction('chatbot_closed');
            }}
            aria-label="Close chatbot"
          />
        </div>
        <div
          className="max-h-80 overflow-y-auto mb-3 p-3 border border-indigo-100 rounded-lg bg-gray-50"
          ref={messagesRef}
          aria-live="polite"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 mx-3 p-3 rounded-lg text-sm text-gray-800 max-w-[80%] break-words animate-message-appear ${msg.sender === 'user' ? 'bg-sky-100 ml-auto text-right' : msg.sender === 'typing' ? 'bg-indigo-100 italic text-gray-600 flex items-center gap-2' : 'bg-indigo-100'}`}
            >
              {msg.sender === 'typing' && <span className="animate-typing">•••</span>}
              <span dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.text) }} />
              <span className="block text-xs text-gray-500 mt-1 text-right">{msg.timestamp}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <select
            id="jkvServiceSelect"
            className="p-2 border border-gray-700 rounded-lg bg-white text-sm cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-neutral-800"
            onChange={handleServiceSelect}
            onFocus={() => trackInteraction('service_select_focused')}
            aria-label="Select a service"
          >
            <option value="">Select a service...</option>
            {serviceOptions.map((group, index) => (
              <optgroup key={index} label={group.group} className="font-semibold text-gray-800">
                {group?.options?.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            <input
              id="jkvInput"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => trackInteraction('input_field_focused')}
              placeholder="Type a message..."
              maxLength={200}
              aria-label="Type your message"
              className="flex-1 p-2 border border-gray-700 !text-neutral-800 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50"
            />
            <button
              id="jkvSubmit"
              onClick={sendMessage}
              disabled={isTyping}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg text-sm font-medium transition-all duration-300 enabled:hover:from-blue-600 enabled:hover:to-blue-500 enabled:hover:-translate-y-0.5 enabled:hover:shadow-md disabled:bg-indigo-100 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              Send
            </button>
            <button
              id="jkvReset"
              onClick={resetConversation}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:from-red-600 hover:to-red-500 hover:-translate-y-0.5 hover:shadow-md"
              aria-label="Clear conversation"
            >
              Clear
            </button>
            <button
              id="jkvContact"
              onClick={() => {
                setIsContactOpen(true);
                trackInteraction('contact_popup_opened');
              }}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:from-green-600 hover:to-green-500 hover:-translate-y-0.5 hover:shadow-md"
              aria-label="Open contact form"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* contact modal */}
      <AIContactModal
        isContactOpen={isContactOpen}
        setIsContactOpen={setIsContactOpen}
        trackInteraction={trackInteraction}
        log={log}
      />

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pop-up {
          from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes message-appear {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing {
          0% { content: '•'; }
          33% { content: '••'; }
          66% { content: '•••'; }
          100% { content: '•'; }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
