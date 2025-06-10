import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import NavLayerTop from './NavLayerTop';
import NavLayerBottom from './NavLayerBottom';
import { digitalMarketingItems, filmProductionItems, seoServiceItems, softwareDevelopmentItems, websiteDevelopmentItems } from '../../configs/navConfigs';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    // State for popups and off-canvas menu
    const [isTranslatePopupOpen, setIsTranslatePopupOpen] = useState(false);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // Handle scroll for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            const windowTop = window.scrollY + 1;
            setIsSticky(windowTop > 250);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle click outside for translate popup
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const popup = document.getElementById('translate_popup');
            const languageLinks = document.querySelectorAll('.language-menu a');
            const isLanguageLink = Array.from(languageLinks).some((link) => link.contains(event.target as Node));
            const isPopup = popup?.contains(event.target as Node);

            if (!isLanguageLink && !isPopup && isTranslatePopupOpen) {
                setIsTranslatePopupOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isTranslatePopupOpen]);

    const toggleTranslateDropdown = () => {
        setIsTranslatePopupOpen(!isTranslatePopupOpen);
        if (!isTranslatePopupOpen) {
            setTimeout(() => {
                const select = document.querySelector('#google_translate_element_popup select') as HTMLSelectElement;
                if (select) {
                    select.focus();
                }
            }, 100);
        }
    };

    const toggleOffCanvas = () => {
        setIsOffCanvasOpen(!isOffCanvasOpen);
        document.body.classList.toggle('overflow-hidden');
    };

    return (
        <>
            <style>
                {`
          @keyframes rgbBorder {
            0% { border-color: #ff0000; }
            33% { border-color: #00ff00; }
            66% { border-color: #0000ff; }
            100% { border-color: #ff0000; }
          }

          @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes slideInRight {
            from { transform: translateX(50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          @keyframes sticky {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(0); }
          }

          .menu-expand::before,
          .menu-expand::after {
            position: absolute;
            top: calc(50% - 1px);
            left: calc(50% - 7px);
            width: 14px;
            height: 2px;
            content: "";
            transition: all 0.5s ease;
            transform: scale(0.75);
            background-color: white;
          }

          .menu-expand::after {
            transform: rotate(90deg) scale(0.75);
          }

          .menu-expand.active::after {
            transform: rotate(0) scale(0.75);
          }

          .offcanvas-close::after,
          .offcanvas-close::before {
            position: absolute;
            top: calc(50% - 1px);
            left: 50%;
            margin-left: -10px;
            width: 20px;
            height: 2px;
            content: "";
            transition: all 0.5s ease;
            background-color: #fff;
          }

          .offcanvas-close::before {
            transform: rotate(45deg);
          }

          .offcanvas-close::after {
            transform: rotate(-45deg);
          }

          .offcanvas-close:hover::before {
            transform: rotate(180deg);
          }

          .offcanvas-close:hover::after {
            transform: rotate(0deg);
          }

          .quote-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 2px solid transparent;
            border-radius: 5px;
            animation: rgbBorder 3s linear infinite;
            z-index: 0;
          }
        `}
            </style>

            {/* Topbar */}
            <NavLayerTop />

            {/* Bottom */}
            <NavLayerBottom 
                isSticky={isSticky}
                isTranslatePopupOpen={isTranslatePopupOpen}
                setIsTranslatePopupOpen={setIsTranslatePopupOpen}
            />

            {/* OffCanvas Overlay */}
            <div className={`offcanvas-overlay fixed inset-0 bg-black/50 z-[999] ${isOffCanvasOpen ? 'block' : 'hidden'}`} onClick={toggleOffCanvas}></div>

            {/* OffCanvas Menu */}
            <div id="offcanvas-mobile-menu" className={`offcanvas offcanvas-mobile-menu fixed top-0 left-0 w-[350px] h-full bg-black text-white p-6 transform ${isOffCanvasOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 z-[1000] lg:hidden`}>
                <button className="offcanvas-close absolute top-1 left-[80%] w-10 h-10 bg-red-500 rounded-full flex items-center justify-center" onClick={toggleOffCanvas}>
                    <IoClose size={24} />
                </button>
                <div className="inner customScroll flex flex-col h-full">
                    <div className="offcanvas-menu mb-4">
                        <ul className="list-none m-0 p-0">
                            <li><Link to={'/'} className="block px-2 py-2 text-white text-base font-semibold border-b border-gray-700 hover:text-white">Home</Link></li>
                            <li><Link to={'/about'} className="block px-2 py-2 text-white text-base font-semibold border-b border-gray-700 hover:text-white">About Us</Link></li>
                            <li>
                                <a href="#" className="block px-2 py-2 text-white text-base font-semibold border-b border-gray-700 hover:text-white">Services</a>
                                <ul className="sub-menu hidden pl-0">
                                    <li>
                                        <a href="Customized_Software.php" className="block px-2 py-2 text-white text-base font-semibold bg-gray-900">Software Development</a>
                                        <ul className="sub-menu hidden pl-0">
                                            {softwareDevelopmentItems.map((item, index) => (
                                                <li key={index}>
                                                    <a href={item.href} className="container-img relative block bg-gray-900 px-2 py-2 text-gray-200 text-sm font-medium">
                                                        <img src={item.img} alt={item.text} className="w-full rounded-md shadow-lg" />
                                                        <div className="image-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white font-medium text-sm text-center px-3 py-2 w-4/5">{item.text}</div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="website-development-page.php" className="block px-2 py-2 text-white text-base font-semibold bg-gray-900">Website Development</a>
                                        <ul className="sub-menu hidden pl-0">
                                            {websiteDevelopmentItems.map((item, index) => (
                                                <li key={index}>
                                                    <a href={item.href} className="container-img relative block bg-gray-900 px-2 py-2 text-gray-200 text-sm font-medium">
                                                        <img src={item.img} alt={item.text} className="w-full rounded-md shadow-lg" />
                                                        <div className="image-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white font-medium text-sm text-center px-3 py-2 w-4/5">{item.text}</div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="digital-marketing.php" className="block px-2 py-2 text-white text-base font-semibold bg-gray-900">Digital Marketing</a>
                                        <ul className="sub-menu hidden pl-0">
                                            {digitalMarketingItems.map((item, index) => (
                                                <li key={index}>
                                                    <a href={item.href} className="container-img relative block bg-gray-900 px-2 py-2 text-gray-200 text-sm font-medium">
                                                        <img src={item.img} alt={item.text} className="w-full rounded-md shadow-lg" />
                                                        <div className="image-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white font-medium text-sm text-center px-3 py-2 w-4/5">{item.text}</div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="SEO-service.php" className="block px-2 py-2 text-white text-base font-semibold bg-gray-900">Google SEO Services</a>
                                        <ul className="sub-menu hidden pl-0">
                                            {seoServiceItems.map((item, index) => (
                                                <li key={index}>
                                                    <a href={item.href} className="container-img relative block bg-gray-900 px-2 py-2 text-gray-200 text-sm font-medium">
                                                        <img src={item.img} alt={item.text} className="w-full rounded-md shadow-lg" />
                                                        <div className="image-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white font-medium text-sm text-center px-3 py-2 w-4/5">{item.text}</div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="Film_production.php" className="block px-2 py-2 text-white text-base font-semibold bg-gray-900">Film Production</a>
                                        <ul className="sub-menu hidden pl-0">
                                            {filmProductionItems.map((item, index) => (
                                                <li key={index}>
                                                    <a href={item.href} className="container-img relative block bg-gray-900 px-2 py-2 text-gray-200 text-sm font-medium">
                                                        <img src={item.img} alt={item.text} className="w-full rounded-md shadow-lg" />
                                                        <div className="image-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white font-medium text-sm text-center px-3 py-2 w-4/5">{item.text}</div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="language-menu">
                                        <a href="#" onClick={toggleTranslateDropdown} className="block px-2 py-2 text-red-500 text-base font-semibold border-b border-gray-700 hover:text-red-700">Language</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="offcanvas-social mt-auto">
                        <ul className="flex space-x-2">
                            <li><a href="https://facebook.com" className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black"><FaFacebookF /></a></li>
                            <li><a href="https://twitter.com" className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black"><FaTwitter /></a></li>
                            <li><a href="https://instagram.com" className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black"><FaInstagram /></a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Language Translate Popup */}
            <div id="translate_popup" className={`translate-popup fixed top-20 right-5 z-[1000] ${isTranslatePopupOpen ? 'block' : 'hidden'}`}>
                <div className="translate-popup-content bg-gradient-to-br from-gray-600 to-gray-100 rounded-lg p-4 w-64 shadow-2xl animate-[slideInRight_0.3s_ease-out]">
                    <div className="flex justify-between items-center mb-2">
                        <h6 className="text-base font-semibold text-gray-900">Select Language</h6>
                        <a href="#" onClick={toggleTranslateDropdown} className="text-xl text-gray-700 hover:text-red-500">×</a>
                    </div>
                    <div id="google_translate_element_popup" className="p-2">
                        <select className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/30"></select>
                    </div>
                </div>
            </div>

            {/* Google Translate Script */}
            <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
        </>
    );
};

export default Navbar;