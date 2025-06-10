import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaMapMarkerAlt, FaEnvelopeOpenText, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <>
            <footer className="bg-main-primary pt-12 px-4 md:px-12 lg:pt-12 lg:px-[28px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_2fr] gap-3 md:gap-4 lg:gap-10">
                    <div className="col-span-1 lg:col-span-1 md:col-span-1">
                        <div className="mb-4">
                            <div className="flex gap-6 mb-4">
                                <a href="https://www.facebook.com/jaikviktechnology" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF className="text-white text-xl hover:text-main-red" />
                                </a>
                                <a href="https://www.instagram.com/jaikviktechnology/" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className="text-white text-xl hover:text-main-red" />
                                </a>
                                <a href="https://twitter.com/jaikvik" target="_blank" rel="noopener noreferrer">
                                    <FaXTwitter className="text-white text-xl hover:text-main-red" />
                                </a>
                                <a href="https://www.youtube.com/@jaikviktechnology" target="_blank" rel="noopener noreferrer">
                                    <FaYoutube className="text-white text-xl hover:text-main-red" />
                                </a>
                                <a href="https://www.linkedin.com/company/jaikviktechnology/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedinIn className="text-white text-xl hover:text-main-red" />
                                </a>
                            </div>
                            <p className="text-main-gray text-[16px]">
                                Welcome to Jaikvik Technology India Private Limited, We utilise our experience and world-class
                                knowledge to help businesses reach at their full online and digital potentials also ensure a steady
                                growth. For this, there is a team of highly dedicated and &apos;self-confessed&apos; digital marketing geeks
                                <a href="about-us.php" className="text-main-red hover:underline"> More...</a>
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-1">
                        <div>
                            <h3 className="text-lg text-gray-200 mb-2 font-bold">Useful Links</h3>
                            <ul className="list-none p-0 m-0 text-[16px]">
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="about-us.php" className="text-main-gray hover:underline transition-all duration-300">About Us</a>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="#" className="text-main-gray hover:underline transition-all duration-300">Portfolio</a>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="blog.php" className="text-main-gray hover:underline transition-all duration-300">Our Blogs</a>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="career.php" className="text-main-gray hover:underline transition-all duration-300">Career</a>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="privacy-policy.php" className="text-main-gray hover:underline transition-all duration-300">Privacy Policy</a>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="contact-us.php" className="text-main-gray hover:underline transition-all duration-300">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-1">
                        <div>
                            <h3 className="text-lg text-gray-200 mb-2 font-bold">Our Services</h3>
                            <ul className="list-none p-0 m-0 text-[16px]">
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="digital-marketing.php" className="text-main-gray hover:underline transition-all duration-300">Digital Marketing</a>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="mobile-application.php" className="text-main-gray hover:underline transition-all duration-300">Software Development</a>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="Film_production.php" className="text-main-gray hover:underline transition-all duration-300">Film Making</a>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="SEO-service.php" className="text-main-gray hover:underline transition-all duration-300">SEO (Search Engine Optimization)</a>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="" className="text-main-gray hover:underline transition-all duration-300">E-Commerce</a>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <a href="website-development-page.php" className="text-main-gray hover:underline transition-all duration-300">Website Development</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-1 md:col-span-1">
                        <div>
                            <h3 className="text-lg text-gray-200 mb-2 font-bold">Get In Touch</h3>
                            <ul className="list-none p-0 m-0">
                                <li className="flex items-center gap-2 mt-2">
                                    <FaMapMarkerAlt className="text-main-red" />
                                    <p className="text-main-gray text-[16px]">Corporate Office - A 82, Sector 63, Noida, UP</p>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <FaMapMarkerAlt className="text-main-red" />
                                    <p className="text-main-gray text-[16px]">Regional Office - 7/1, Marhatta Ditch Lane Kolkata</p>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <FaMapMarkerAlt className="text-main-red" />
                                    <p className="text-main-gray text-[16px]">Regional Office - 304, Peninsula Spenta-1, Senapati Bapat Marg, Lower Parel Mumbai</p>
                                </li>
                                <li className="flex items-center gap-2 mt-2">
                                    <FaEnvelopeOpenText className="text-main-red" />
                                    <a href="mailto:info@jaikviktechnology.com" className="text-main-gray hover:underline transition-all duration-300">info@jaikviktechnology.com</a>
                                </li>
                                <li className="flex items-center gap-2 mt-2 text-[16px]">
                                    <FaPhone className="text-main-red" />
                                    <ul className="flex flex-wrap gap-2 p-0 m-0 leading-4">
                                        <li><a href="tel:+91-9220826934" className="text-main-gray hover:underline transition-all duration-300">+91-9220826934</a></li>
                                        <li><a href="tel:+91-9718587705" className="text-main-gray hover:underline transition-all duration-300">+91-9718587705</a></li>
                                        <li><a href="tel:0120-4200970" className="text-main-gray hover:underline transition-all duration-300">0120-4200970</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4 py-4">
                    <p className="text-main-gray text-[15px]">
                        © 2016 All Rights Reserved 
                        <a href="index.php" target="_blank" rel="noopener noreferrer" className="text-main-red hover:underline ml-1">Jaikvik Technology India Pvt Ltd</a>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;