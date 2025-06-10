import { useState } from 'react';
import type EnquireFormInterface from '../../interfaces/EnquireFormInterface';
import "../../styles/enquire-form.css";

const EnquireSection = () => {
    // State to manage form input values
    const [formData, setFormData] = useState<EnquireFormInterface>({
        fname: '',
        email: '',
        phone: '',
        company: '',
        message: '',
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here (e.g., API call)
    };

    return (
        <>
            {/* Enquiry and Location Section */}
            <section className="px-[28px] py-[25px] max-[992px]:px-3 max-[992px]:py-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-4 lg:gap-10">
                    {/* Enquiry Form */}
                    <div className="max-w-full md:w-full">
                        <div className="flex flex-col w-full min-h-[320px] max-[992px]:min-h-[360px]">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-4 lg:gap-2">
                                    {/* Heading */}
                                    <div className="col-span-2 flex items-center max-[992px]:mb-[10px]">
                                        <div>
                                            <h2 className="uppercase text-white text-[20px] mb-[15px]">Enquiry Form</h2>
                                        </div>
                                    </div>

                                    {/* Full Name */}
                                    <div className="max-[992px]:w-1/2 max-[992px]:px-[6px]">
                                        <div className="input-contain">
                                            <input
                                                type="text"
                                                id="fname"
                                                name="fname"
                                                value={formData.fname}
                                                onChange={handleChange}
                                                placeholder=" "
                                                required
                                                autoComplete="off"
                                                aria-label="Full Name"
                                            />
                                            <label htmlFor="fname" className="placeholder-text">
                                                FULL NAME
                                            </label>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="max-[992px]:w-1/2 max-[992px]:px-[6px]">
                                        <div className="input-contain">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder=" "
                                                required
                                                autoComplete="off"
                                                aria-label="Email Address"
                                            />
                                            <label htmlFor="email" className="placeholder-text">
                                                EMAIL ADDRESS
                                            </label>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="max-[992px]:w-1/2 max-[992px]:px-[6px]">
                                        <div className="input-contain">
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder=" "
                                                required
                                                autoComplete="off"
                                                aria-label="Phone Number"
                                            />
                                            <label htmlFor="phone" className="placeholder-text">
                                                PHONE NUMBER
                                            </label>
                                        </div>
                                    </div>

                                    {/* Company Name */}
                                    <div className="max-[992px]:w-1/2 max-[992px]:px-[6px]">
                                        <div className="input-contain">
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder=" "
                                                required
                                                autoComplete="off"
                                                aria-label="Company Name"
                                            />
                                            <label htmlFor="company" className="placeholder-text">
                                                COMPANY NAME
                                            </label>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="col-span-2">
                                        <div className="input-contain">
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={1}
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder=" "
                                                required
                                                aria-label="Message"
                                            ></textarea>
                                            <label htmlFor="message" className="placeholder-text">
                                                MESSAGE
                                            </label>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <div className="col-span-2">
                                        <div className="flex justify-center max-[992px]:justify-center mt-auto">
                                            <button
                                                type="submit"
                                                className="bg-main-red text-white font-semibold leading-[40px] w-full border-none hover:scale-95 transition-transform duration-300 ease-in-out max-[992px]:w-auto max-[992px]:px-5 max-[992px]:leading-[35px]"
                                            >
                                                SEND NOW
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Location Map */}
                    <div className="max-w-full md:w-full">
                        <div className="w-full min-h-[320px] max-[992px]:min-h-[360px] relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.728679471876!2d77.3799222!3d28.6208897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef6105705e55%3A0xe206b5e4f7fd200c!2sJaikvik%20Technology%20India%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1747125883950!5m2!1sen!2sin"
                                className="absolute inset-0 w-full h-full border border-[#e5e5e5] rounded-[5px]"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default EnquireSection;