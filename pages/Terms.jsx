import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaCheck, FaExclamationTriangle, FaLock, FaUserShield, FaFileContract, FaArrowUp, FaSearch } from 'react-icons/fa';

const Terms = () => {
  const [accepted, setAccepted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('introduction');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Terms sections data
  const termsSections = [
    { id: 'introduction', title: 'Introduction', icon: <FaFileContract /> },
    { id: 'definitions', title: 'Definitions', icon: <FaUserShield /> },
    { id: 'accounts', title: 'User Accounts', icon: <FaUserShield /> },
    { id: 'services', title: 'Our Services', icon: <FaFileContract /> },
    { id: 'payments', title: 'Payments & Fees', icon: <FaLock /> },
    { id: 'privacy', title: 'Privacy & Data', icon: <FaLock /> },
    { id: 'content', title: 'Content Guidelines', icon: <FaExclamationTriangle /> },
    { id: 'liability', title: 'Liability', icon: <FaExclamationTriangle /> },
    { id: 'termination', title: 'Termination', icon: <FaExclamationTriangle /> },
    { id: 'changes', title: 'Changes to Terms', icon: <FaFileContract /> },
    { id: 'contact', title: 'Contact Us', icon: <FaUserShield /> },
  ];

  // Key points with icons
  const keyPoints = [
    { icon: <FaUserShield />, title: 'User Protection', text: 'Your data is encrypted and secure' },
    { icon: <FaLock />, title: 'Secure Payments', text: 'All transactions are protected' },
    { icon: <FaCheck />, title: 'Clear Policies', text: 'No hidden fees or conditions' },
    { icon: <FaExclamationTriangle />, title: 'Transparency', text: 'We communicate changes clearly' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 400);
      
      // Update active section based on scroll position
      const sections = termsSections.map(section => document.getElementById(section.id));
      const scrollPosition = window.pageYOffset + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPosition) {
          setActiveSection(termsSections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 animate-bounce"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & <span className="text-blue-600">Conditions</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mt-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Contents</h3>
              <nav className="space-y-2">
                {termsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-3">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>

              {/* Key Points */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Key Points</h4>
                <div className="space-y-4">
                  {keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        {point.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{point.title}</h5>
                        <p className="text-sm text-gray-600">{point.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mr-4">
                    <FaFileContract className="text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-4">
                    Welcome to <span className="font-semibold text-blue-600">FM Ltd.</span> By accessing our platform, you agree to be bound by these Terms and Conditions. Please read them carefully.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                    <p className="text-blue-800 font-medium">
                      <FaExclamationTriangle className="inline mr-2" />
                      These terms constitute a legal agreement between you and FM Ltd.
                    </p>
                  </div>
                </div>
              </section>

              {/* Definitions */}
              <section id="definitions" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Definitions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 text-gray-900">Platform</h3>
                    <p className="text-gray-700">The FM Ltd. website, mobile applications, and related services.</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 text-gray-900">User</h3>
                    <p className="text-gray-700">Any person or entity accessing or using the Platform.</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 text-gray-900">Content</h3>
                    <p className="text-gray-700">Text, images, videos, and other materials posted on the Platform.</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 text-gray-900">Services</h3>
                    <p className="text-gray-700">Freelance job matching, project management, and payment processing.</p>
                  </div>
                </div>
              </section>

              {/* User Accounts */}
              <section id="accounts" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">User Accounts</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">You must be at least 18 years old to create an account.</p>
                  </div>
                  <div className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">You are responsible for maintaining the confidentiality of your account credentials.</p>
                  </div>
                  <div className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">You agree to provide accurate and complete information during registration.</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                    <p className="text-yellow-800">
                      <FaExclamationTriangle className="inline mr-2" />
                      We reserve the right to suspend or terminate accounts that violate our terms.
                    </p>
                  </div>
                </div>
              </section>

              {/* Services */}
              <section id="services" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-6">
                  <h3 className="font-bold text-xl mb-4 text-gray-900">What We Provide</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Freelancer-client matching based on skills and requirements</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Secure payment processing and escrow services</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Dispute resolution and customer support</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Project management tools and communication platform</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Payments */}
              <section id="payments" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payments & Fees</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Service</th>
                        <th className="border border-gray-300 p-3 text-left">Fee</th>
                        <th className="border border-gray-300 p-3 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">Platform Fee</td>
                        <td className="border border-gray-300 p-3">10%</td>
                        <td className="border border-gray-300 p-3">Applied to completed project value</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 p-3">Payment Processing</td>
                        <td className="border border-gray-300 p-3">2.9% + $0.30</td>
                        <td className="border border-gray-300 p-3">Per transaction</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Withdrawal</td>
                        <td className="border border-gray-300 p-3">Free</td>
                        <td className="border border-gray-300 p-3">No fee for standard withdrawals</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Privacy */}
              <section id="privacy" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy & Data</h2>
                <div className="flex items-center mb-4">
                  <FaLock className="text-blue-600 mr-3" />
                  <p className="text-gray-700">Your privacy is important to us. Please read our <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.</p>
                </div>
              </section>

              {/* Content Guidelines */}
              <section id="content" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Guidelines</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-bold text-red-700 mb-2">Prohibited Content</h4>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li>• Illegal or harmful material</li>
                      <li>• Copyright infringement</li>
                      <li>• Hate speech or discrimination</li>
                      <li>• Spam or misleading information</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-bold text-green-700 mb-2">Allowed Content</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Original work and portfolios</li>
                      <li>• Professional communication</li>
                      <li>• Constructive feedback</li>
                      <li>• Job-related materials</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Acceptance Checkbox */}
              <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="acceptTerms" className="ml-3 font-medium text-gray-900">
                    I have read and agree to the Terms and Conditions
                  </label>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => accepted && console.log('Terms accepted')}
                    disabled={!accepted}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      accepted
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue to Platform
                  </button>
                  <Link
                    to="/"
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} FM Ltd. All rights reserved.</p>
                <p className="mt-1">These terms are subject to change. Please review periodically.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;