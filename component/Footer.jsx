import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Footer = () => {
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  
  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      // On home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // Adjust based on your navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Not on home page, navigate to home with hash
      navigate(`/#${sectionId}`);
      // After navigation, scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
  }, []);

  const footerBg = theme === 'dark' 
    ? 'bg-[#bef6]/90' 
    : 'bg-gray-100/90 border-t border-gray-200';
  
  const textColor = theme === 'dark' 
    ? 'text-white' 
    : 'text-gray-800';
  
  const hoverColor = theme === 'dark' 
    ? 'hover:text-gray-300' 
    : 'hover:text-gray-600';

  const footerLinks = [
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className={`footer footer-center p-6 sm:p-8 md:p-10 backdrop-blur-sm ${footerBg} ${textColor}`}>
  <aside className="mb-4 sm:mb-6">
    <p className="font-bold text-base sm:text-lg md:text-xl">
      FM Ltd.
      <br />
      <span className="font-normal text-sm sm:text-base md:text-lg">
        Providing JOBS since 2025
      </span>
    </p>
    <p className="mt-2 text-sm sm:text-base">
      Copyright © {new Date().getFullYear()} - All rights reserved
    </p>
  </aside>

  {/* Navigation Links */}
  <nav className="mb-4 sm:mb-6">
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
      {footerLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => scrollToSection(link.id)}
          className={`px-3 py-1 rounded transition duration-300 text-sm sm:text-base ${hoverColor} hover:bg-opacity-10 ${
            theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-800'
          }`}
        >
          {link.label}
        </button>
      ))}
      
      {/* Page Links */}
      <a 
        href="/alljobs" 
        className={`px-3 py-1 rounded transition duration-300 text-sm sm:text-base ${hoverColor} hover:bg-opacity-10 ${
          theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-800'
        }`}
      >
        Browse Jobs
      </a>
      <a 
        href="/terms" 
        className={`px-3 py-1 rounded transition duration-300 text-sm sm:text-base ${hoverColor} hover:bg-opacity-10 ${
          theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-800'
        }`}
      >
        Terms & Conditions
      </a>
    </div>
  </nav>

  {/* Social Icons */}
  <nav className="mb-4 sm:mb-6">
    <div className="grid grid-flow-col gap-4 sm:gap-5 md:gap-6">
      {/* Twitter/X */}
      <a 
        href="https://twitter.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="transition transform hover:scale-110 hover:drop-shadow-lg duration-300 hover:text-[#1DA1F2]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-current ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          <path d="M18.244 2H21L13.358 10.59L22 22H15.245L9.868 15.065L3.728 22H1L9.062 12.897L1 2H7.926L12.793 8.355L18.244 2ZM16.98 19.94H18.839L7.112 4.15H5.137L16.98 19.94Z" />
        </svg>
      </a>

      {/* Similar fixes for other icons */}
    </div>
  </nav>

  <div className="text-center">
    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-xs sm:text-sm`}>
      📧 contact@fmltd.com | 📞 +8801234567890
    </p>
  </div>
</footer>
  );
};

export default Footer;