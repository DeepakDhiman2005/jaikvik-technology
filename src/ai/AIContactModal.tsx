import type React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaTimes, FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import * as yup from 'yup';

// Yup validation schema
const schema = yup.object().shape({
    fname: yup.string().required('Full Name is required'),
    phone: yup.string().matches(/^\+?\d{10,15}$/, 'Valid phone number is required').required('Phone number is required'),
    email: yup.string().email('Valid email address is required').required('Email is required'),
    subject: yup.string().required('Subject is required'),
    msg: yup.string().required('Message is required'),
});

// Form data type
interface FormData {
    fname: string;
    phone: string;
    email: string;
    subject: string;
    msg: string;
}

const AIContactModal: React.FC<{
    isContactOpen: boolean;
    setIsContactOpen: (value: boolean) => void;
    trackInteraction: (value: string, value2?: { error: string }) => void;
    log: (value: string, value2: 'info' | 'error') => void;
}> = ({
    isContactOpen,
    setIsContactOpen,
    trackInteraction,
    log,
}) => {
        const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
            resolver: yupResolver(schema),
        });

        const onSubmit = async () => {
            const feedback = document.getElementById('jkvFormFeedback') as HTMLDivElement;
            try {
                const form = document.getElementById('jkvContactForm') as HTMLFormElement;
                const formData = new FormData(form);

                const response = await fetch('contact-mail.php', {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' },
                });

                if (!response.ok) throw new Error(`Server error: ${response.status}`);

                feedback.textContent = 'Message sent successfully!';
                feedback.className = 'jkv-form-feedback success bg-green-100 text-green-700';
                feedback.style.display = 'block';
                reset();
                trackInteraction('contact_form_submitted');
                setTimeout(() => setIsContactOpen(false), 2000);
            } catch (error) {
                const err = error as Error;
                feedback.textContent = 'Failed to send message. Please try again.';
                feedback.className = 'jkv-form-feedback error bg-red-100 text-red-700';
                feedback.style.display = 'block';
                log('Form submission failed: ' + err.message, 'error');
                trackInteraction('contact_form_error', { error: err.message });
            }
        };

        return <>
            <div
                id="jkvContactPopupOverlay"
                className={`fixed inset-0 bg-black/50 z-[1100] transition-opacity duration-300 animate-fade-in ${isContactOpen ? 'block' : 'hidden'}`}
                onClick={() => {
                    setIsContactOpen(false);
                    trackInteraction('contact_popup_closed');
                }}
                role="button"
                aria-label="Close contact popup"
            >
                <div
                    id="jkvContactPopup"
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-[clamp(16px,4vw,24px)] rounded-xl shadow-2xl w-[clamp(280px,90%,600px)] max-h-[90vh] overflow-y-auto z-[1200] animate-pop-up"
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-hidden={!isContactOpen}
                    aria-label="Contact Form"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-semibold text-gray-800">Get In Touch</h4>
                        <FaTimes
                            className="text-2xl text-gray-800 cursor-pointer transition-transform duration-300 hover:text-blue-500 hover:rotate-90"
                            onClick={() => {
                                setIsContactOpen(false);
                                trackInteraction('contact_popup_closed');
                            }}
                            aria-label="Close contact popup"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <form id="jkvContactForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    id="fname"
                                    {...register('fname')}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50"
                                    aria-label="Full Name"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="fname" className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">Full Name</label>
                                {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname.message}</p>}
                            </div>
                            <div className="relative">
                                <input
                                    type="tel"
                                    id="phone"
                                    {...register('phone')}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50"
                                    aria-label="Phone Number"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="phone" className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">Phone Number</label>
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                            </div>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    {...register('email')}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50"
                                    aria-label="Email Address"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="email" className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">Email Address</label>
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="subject"
                                    {...register('subject')}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50"
                                    aria-label="Subject"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="subject" className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">Subject</label>
                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                            </div>
                            <div className="relative">
                                <textarea
                                    id="msg"
                                    {...register('msg')}
                                    rows={5}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm resize-y min-h-[100px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50"
                                    aria-label="Your Message"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="msg" className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">Your Message</label>
                                {errors.msg && <p className="text-red-500 text-sm mt-1">{errors.msg.message}</p>}
                            </div>
                            <button
                                type="submit"
                                id="jkvFormSubmit"
                                disabled={isSubmitting}
                                className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg text-sm font-medium transition-all duration-300 enabled:hover:from-blue-600 enabled:hover:to-blue-500 enabled:hover:-translate-y-0.5 enabled:hover:shadow-md disabled:bg-indigo-100 disabled:cursor-not-allowed"
                            >
                                Send Message
                            </button>
                            <div id="jkvFormFeedback" className="hidden p-2 rounded-lg text-sm text-center" role="alert" />
                        </form>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h5 className="text-base font-semibold text-gray-800 mb-3">Contact Us</h5>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-blue-500 text-base" />
                                <a href="https://www.google.com/maps/place/Jaikvik+Technology+India+Pvt.+Ltd./@28.6208897,77.3799222,17z" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    A-82, Sector 63, Noida, UP
                                </a>
                            </p>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                <FaEnvelope className="text-blue-500 text-base" />
                                <a href="mailto:info@jaikviktechnology.com" className="text-blue-500 hover:underline">
                                    info@jaikviktechnology.com
                                </a>
                            </p>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                <FaPhone className="text-blue-500 text-base" />
                                <a href="tel:+919310907227" className="text-blue-500 hover:underline">
                                    +91-9310907227
                                </a>
                            </p>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                <FaPhone className="text-blue-500 text-base" />
                                <a href="tel:+911204200970" className="text-blue-500 hover:underline">
                                    +91-120-4200970
                                </a>
                            </p>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                <FaPhone className="text-blue-500 text-base" />
                                <a href="tel:+919220826934" className="text-blue-500 hover:underline">
                                    +91-9220826934
                                </a>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                <FaWhatsapp className="text-blue-500 text-base" />
                                <a href="https://wa.me/+918307802850" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    +91-8307802850
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

export default AIContactModal