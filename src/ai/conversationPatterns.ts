export interface conversationPatternsInterface {
    name?: string;
    steps: {
        type?: string;
        intent?: string;
    }[];
    response?: string;
}

// Conversation patterns
const conversationPatterns: conversationPatternsInterface[] = [
    {
        name: 'service inquiry',
        steps: [
            { type: 'user', intent: 'services' },
            { type: 'bot', intent: 'informational' },
            { type: 'user', intent: 'commercial' },
            { type: 'bot', intent: 'commercial' },
        ],
        response: 'Would you like me to connect you with a specialist for a detailed consultation?',
    },
    {
        name: 'support request',
        steps: [
            { type: 'user', intent: 'help' },
            { type: 'bot', intent: 'support' },
            { type: 'user', intent: 'support' },
        ],
        response: 'I can escalate this to our support team. Would you like me to do that?',
    },
    {
        name: 'contact information',
        steps: [
            { type: 'user', intent: 'contact' },
            { type: 'bot', intent: 'contact' },
            { type: 'user', intent: 'contact' },
        ],
        response: 'Would you like me to open the contact form for you?',
    },
];

export default conversationPatterns;