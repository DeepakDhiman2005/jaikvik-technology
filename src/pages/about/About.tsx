import React, { useEffect, useRef } from 'react';
import HeroSection from './HeroSection';
import MissionVision from './MissionVision';
import WhyUsSection from './WhyUsSection';
import StatesSection from './StatesSection';
import WhyChooseUs from './WhyChooseUs';
import PromotersSection from './PromotersSection';

const About: React.FC = () => {
  const progressBarsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const statNumbersRef = useRef<NodeListOf<HTMLElement> | null>(null);

  useEffect(() => {
    // Progress bar animation
    progressBarsRef.current = document.querySelectorAll('[data-title]');
    progressBarsRef.current.forEach((progress, index) => {
      const bar = progress.querySelector('.about-progress-bar') as HTMLElement;
      const percentage = progress.querySelector('.about-progress-percentage') as HTMLElement;
      const value = parseInt(progress.getAttribute('data-value') || '0');

      setTimeout(() => {
        let current = 0;
        const increment = value / 100;
        const duration = 3000;
        const intervalTime = duration / 100;

        const animate = setInterval(() => {
          if (current >= value) {
            clearInterval(animate);
            percentage.textContent = `${value}%`;
            bar.style.width = `${value}%`;
            return;
          }
          current += increment;
          percentage.textContent = `${Math.round(current)}%`;
          bar.style.width = `${current}%`;
        }, intervalTime);
      }, index * 500);
    });

    // Stats counter animation
    statNumbersRef.current = document.querySelectorAll('[data-count]');
    const options: IntersectionObserverInit = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target as HTMLElement;
          const target = parseInt(statNumber.getAttribute('data-count') || '0');
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              clearInterval(counter);
              statNumber.textContent = target.toString();
            } else {
              statNumber.textContent = Math.floor(current).toString();
            }
          }, 16);
          observer.unobserve(statNumber);
        }
      });
    }, options);

    statNumbersRef.current.forEach((statNumber) => {
      observer.observe(statNumber);
    });

    return () => {
      statNumbersRef.current?.forEach((statNumber) => observer.unobserve(statNumber));
    };
  }, []);

  return (
    <div className="font-mulish bg-black text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* About Company Section */}
      <section id="about" className="bg-main-primary py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-5 animate-fadeIn">Who We Are</h2>
          <p className="text-lg max-w-3xl mx-auto mb-5 animate-fadeIn animation-delay-1500">
            Established in 2016, Jaikvik Technology started as a partnership and had embarked on a journey with the vision
            of empowering businesses through digital means. Eventually, into 2022, observing the growth and
            diversification of the portfolio, the company was promoted to a Private Limited company and is now known as
            Jaikvik Technology India Private Limited.
          </p>
          <p className="text-lg max-w-3xl mx-auto mb-5 animate-fadeIn animation-delay-1500">
            Headquartered in India, we are a dynamic team of software developers, digital strategists, creatives, and brand
            specialists, committed to transforming business ideas into scalable, tech-driven realities.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <MissionVision />

      {/* Why Us Section */}
      <WhyUsSection />

      {/* Stats Section */}
      <StatesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Promoters Section */}
      <PromotersSection />

      {/* Clients Section */}
      <section className="bg-main-primary py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-10 animate-fadeIn">Trusted By Industry Leaders</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-900 p-5 rounded-lg w-40 h-24 flex items-center justify-center transition-transform duration-300 hover:scale-110 animate-fadeInUp animation-delay-1600">
              <img
                src="https://via.placeholder.com/100x50?text=Client+1"
                alt="Client 1 Logo"
                className="max-w-full max-h-full grayscale brightness-200 hover:grayscale-0 hover:brightness-100 transition-filter duration-300"
              />
            </div>
            <div className="bg-gray-900 p-5 rounded-lg w-40 h-24 flex items-center justify-center transition-transform duration-300 hover:scale-110 animate-fadeInUp animation-delay-1600">
              <img
                src="https://via.placeholder.com/100x50?text=Client+2"
                alt="Client 2 Logo"
                className="max-w-full max-h-full grayscale brightness-200 hover:grayscale-0 hover:brightness-100 transition-filter duration-300"
              />
            </div>
            <div className="bg-gray-900 p-5 rounded-lg w-40 h-24 flex items-center justify-center transition-transform duration-300 hover:scale-110 animate-fadeInUp animation-delay-1600">
              <img
                src="https://via.placeholder.com/100x50?text=Client+3"
                alt="Client 3 Logo"
                className="max-w-full max-h-full grayscale brightness-200 hover:grayscale-0 hover:brightness-100 transition-filter duration-300"
              />
            </div>
            <div className="bg-gray-900 p-5 rounded-lg w-40 h-24 flex items-center justify-center transition-transform duration-300 hover:scale-110 animate-fadeInUp animation-delay-1600">
              <img
                src="https://via.placeholder.com/100x50?text=Client+4"
                alt="Client 4 Logo"
                className="max-w-full max-h-full grayscale brightness-200 hover:grayscale-0 hover:brightness-100 transition-filter duration-300"
              />
            </div>
            <div className="bg-gray-900 p-5 rounded-lg w-40 h-24 flex items-center justify-center transition-transform duration-300 hover:scale-110 animate-fadeInUp animation-delay-1600">
              <img
                src="https://via.placeholder.com/100x50?text=Client+5"
                alt="Client 5 Logo"
                className="max-w-full max-h-full grayscale brightness-200 hover:grayscale-0 hover:brightness-100 transition-filter duration-300"
              />
            </div>
            <div className="bg-gray-900 p-5 rounded-lg w-40 h-24 flex items-center justify-center transition-transform duration-300 hover:scale-110 animate-fadeInUp animation-delay-1600">
              <img
                src="https://via.placeholder.com/100x50?text=Client+6"
                alt="Client 6 Logo"
                className="max-w-full max-h-full grayscale brightness-200 hover:grayscale-0 hover:brightness-100 transition-filter duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-main-secondary py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-10 animate-fadeIn">What Our Clients Say</h2>
          <div className="bg-main-primary p-8 rounded-lg max-w-3xl mx-auto animate-fadeInUp animation-delay-1600">
            <p className="text-lg italic mb-5">
              "Jaikvik Technology transformed our digital presence with a seamless website and impactful digital marketing
              strategies. Their tailored solutions and creative approach have significantly boosted our brand's visibility
              and engagement."
            </p>
            <p className="font-bold text-main-red">- Rohan Mehta, CEO of TechSolutions Inc.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-20 text-center">
        <div className="container mx-auto px-4">
          <div>
            <h2 className="text-4xl font-bold mb-5 animate-fadeIn">Ready to Transform Your Digital Presence?</h2>
            <p className="text-lg mb-8 animate-fadeIn animation-delay-1200">
              Let's discuss how Jaikvik Technology can help your business grow in the digital space.
            </p>
            <a
              href="contact.php"
              className="inline-block bg-black text-white py-3 px-8 rounded-md text-lg transition-all duration-300 hover:bg-gray-900 hover:scale-105 animate-fadeInUp animation-delay-1500"
              role="button"
              aria-label="Contact Jaikvik Technology"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.6s ease-in-out;
        }

        .animation-delay-1200 {
          animation-delay: 1.2s;
        }

        .animation-delay-1400 {
          animation-delay: 1.4s;
        }

        .animation-delay-1500 {
          animation-delay: 1.5s;
        }

        .animation-delay-1600 {
          animation-delay: 1.6s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .transition-filter {
          transition-property: filter;
        }
      `}</style>
    </div>
  );
};

export default About;