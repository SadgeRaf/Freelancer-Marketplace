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
    <footer className={`footer footer-center p-10 backdrop-blur-sm ${footerBg} ${textColor}`}>
      <aside>
        <p className="font-bold text-lg">
          FM Ltd.
          <br />
          <span className="font-normal text-base">Providing JOBS since 2025</span>
        </p>
        <p className="mt-2">Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>

      {/* Navigation Links */}
      <nav className="mt-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {footerLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-3 py-1 rounded transition duration-300 ${hoverColor} hover:bg-opacity-10 ${
                theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          {/* Page Links (will navigate to new pages) */}
          <a 
            href="/alljobs" 
            className={`px-3 py-1 rounded transition duration-300 ${hoverColor} hover:bg-opacity-10 ${
              theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-800'
            }`}
          >
            Browse Jobs
          </a>
          <a 
            href="/terms" 
            className={`px-3 py-1 rounded transition duration-300 ${hoverColor} hover:bg-opacity-10 ${
              theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-800'
            }`}
          >
            Terms & Conditions
          </a>
        </div>
      </nav>

      {/* Social Icons */}
      <nav className="mt-6">
        <div className="grid grid-flow-col gap-6">
          {/* Twitter/X */}
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition transform hover:scale-110 hover:drop-shadow-lg duration-300 hover:text-[#1DA1F2]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`fill-current ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            >
              <path d="M18.244 2H21L13.358 10.59L22 22H15.245L9.868 15.065L3.728 22H1L9.062 12.897L1 2H7.926L12.793 8.355L18.244 2ZM16.98 19.94H18.839L7.112 4.15H5.137L16.98 19.94Z" />
            </svg>
          </a>

          {/* YouTube */}
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition transform hover:scale-110 hover:drop-shadow-lg duration-300 hover:text-[#FF0000]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`fill-current ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>

          {/* Facebook */}
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition transform hover:scale-110 hover:drop-shadow-lg duration-300 hover:text-[#1877F2]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`fill-current ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </nav>

      <div className="mt-6 text-center">
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
          📧 contact@fmltd.com | 📞 +1 (555) 123-4567
        </p>
      </div>
    </footer>
  );
};

export default Footer;