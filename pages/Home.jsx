import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import React, { useRef, useEffect } from 'react';
import bannerimg from '../src/assets/7880.jpg'
import { useLoaderData, useNavigate } from 'react-router';
import Job from '../component/Job';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay, FreeMode } from "swiper/modules";
import webImg from '../src/assets/course_1663052056.jpg';
import writingImg from '../src/assets/course_1674372625.jpg';
import marketingImg from '../src/assets/images (2).jpg';
import graphicsImg from '../src/assets/photo-1626785774573-4b799315345d.jpg';
import AboutSection from '../component/AboutSection';
import ContactSection from '../component/ContactSection';
import { FaCheck, FaStar, FaUsers, FaBriefcase, FaRocket, FaShieldAlt, FaChartLine, FaRegClock, FaBuilding, FaUserTie, FaSearch, FaFileAlt } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const data = useLoaderData();
  const containerRef = useRef();
  const jobContainer = useRef();
  const topCategoriesRef = useRef();
  const statsRef = useRef();
  const processRef = useRef();
  const testimonialsRef = useRef();
  const featuresRef = useRef();
  const navigate = useNavigate();

  // Initialize animations
  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  useGSAP(() => {
    const circles = gsap.utils.toArray(".circle");
    circles.forEach((circle, i) => {
      gsap.to(circle, {
        scale: 1.2,
        opacity: 0.5,
        duration: 1,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.2,
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
      });
    });

    gsap.to(".hero-btn", {
      scale: 1.05,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  useGSAP(() => {
    gsap.to(".banner-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    const container = containerRef.current;
    const bg = container.querySelector(".banner-bg");

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(bg, {
        x: x * 30,
        y: y * 20,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const resetPosition = () => {
      gsap.to(bg, { x: 0, y: 0, duration: 1, ease: "power3.out" });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", resetPosition);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", resetPosition);
    };
  }, []);

  useGSAP(() => {
    gsap.from(jobContainer.current, {
      scrollTrigger: {
        trigger: jobContainer.current,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(".us", {
      scale: 0.8,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.us',
        start: 'top 85%'
      }
    });

    const cards = document.querySelector(".cards");
    if (cards) {
      const totalScroll = cards.scrollWidth - cards.parentElement.offsetWidth;
      
      gsap.to(cards, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: ".us",
          start: "top 80%",
          end: () => `+=${totalScroll}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }
  });

  useGSAP(() => {
    const categories = gsap.utils.toArray(".top-categories .category");
    
    categories.forEach((category, index) => {
      gsap.from(category, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: ".top-categories",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      });
    });
  });

  // Stats counter animation
  useGSAP(() => {
    const stats = gsap.utils.toArray(".stat-item");
    
    stats.forEach((stat) => {
      gsap.from(stat, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });
    });
  });

  // Process steps animation
  useGSAP(() => {
    const steps = gsap.utils.toArray(".process-step");
    
    steps.forEach((step, index) => {
      gsap.from(step, {
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        }
      });
    });
  });

  // Testimonials animation
  useGSAP(() => {
    const testimonials = gsap.utils.toArray(".testimonial-card");
    
    testimonials.forEach((testimonial, index) => {
      gsap.from(testimonial, {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });
    });
  });

  // Features animation
  useGSAP(() => {
    const features = gsap.utils.toArray(".feature-card");
    
    features.forEach((feature, index) => {
      gsap.from(feature, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });
    });
  });

  const handleNavigate = () => {
    navigate('/alljobs')
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      {/* Hero Banner Section - 90% of viewport */}
      <div className="flex flex-col items-center w-full overflow-hidden">
        <div
          ref={containerRef}
          className="relative mx-auto dark:bg-gray-800/90 h-[90vh] min-h-[600px] p-2 w-full"
        >
          <div
            className="absolute inset-0 bg-cover banner-bg bg-center brightness-50 dark:brightness-70"
            style={{ backgroundImage: `url(${bannerimg})` }}
          ></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <h1 className="absolute text-5xl font-bold sm:text-6xl md:text-8xl md:font-extrabold left-6 sm:left-10 top-20 sm:top-24 text-white drop-shadow-lg">
            Unemployed?
          </h1>

          <div className="absolute top-[40%] left-0 flex gap-6 sm:gap-10 px-4">
            {[...Array(17)].map((_, i) => (
              <div
                key={i}
                className="circle w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full bg-blue-500 dark:bg-blue-400"
              ></div>
            ))}
          </div>

          <div className='flex justify-between items-end h-full pb-12 px-6 sm:px-10'>
            <div className="text-white max-w-lg">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">
                Trusted by Thousands,
                Made by Professionals
              </h1>
              <p className="text-gray-200 dark:text-gray-300 mb-6">
                Find your dream job with our AI-powered matching system. Thousands of opportunities waiting for you.
              </p>
            </div>
            
            <div className="text-right">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Let's fix that
              </h1>
              <button 
                onClick={handleNavigate} 
                className="hero-btn bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300"
              >
                Find Your Dream Job →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="bg-gray-50 dark:bg-gray-800 py-16 mt-10">
        <div className="w-11/12 mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">Our Impact in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-item text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <FaUsers className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Active Job Seekers</div>
            </div>
            <div className="stat-item text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <FaBriefcase className="text-4xl text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
              <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Job Opportunities</div>
            </div>
            <div className="stat-item text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <FaChartLine className="text-4xl text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">85%</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Success Rate</div>
            </div>
            <div className="stat-item text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <FaRocket className="text-4xl text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">24h</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Avg. Hiring Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Jobs Section */}
      <div
        ref={jobContainer}
        className='w-11/12 mx-auto mt-16'
      >
        <h1 className='text-4xl md:text-5xl font-extrabold mb-8 dark:text-white'>Latest Jobs</h1>

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={5000}
          effect="slide"
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="dark:bg-transparent"
        >
          {data.map((job) => (
            <SwiperSlide key={job._id} className='flex justify-center mt-2'>
              <Job job={job} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="w-11/12 mx-auto mt-20">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">Why We Stand Out</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <FaShieldAlt className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Verified Employers</h3>
            <p className="text-gray-600 dark:text-gray-300">All companies are thoroughly vetted to ensure legitimate job opportunities</p>
          </div>
          <div className="feature-card bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
              <FaRegClock className="text-3xl text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Quick Applications</h3>
            <p className="text-gray-600 dark:text-gray-300">One-click apply system with smart resume matching technology</p>
          </div>
          <div className="feature-card bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
              <FaChartLine className="text-3xl text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Career Growth Tools</h3>
            <p className="text-gray-600 dark:text-gray-300">Personalized career path suggestions and skill gap analysis</p>
          </div>
        </div>
      </div>

      {/* Why Choose US Section */}
      <div className="us w-11/12 mx-auto overflow-hidden h-[120px] sm:h-[140px] mt-20">
        <h1 className="mb-4 text-3xl sm:text-4xl font-bold dark:text-white">Why Choose US?</h1>
        <div className="overflow-hidden h-full">
          <div className="cards flex gap-10 whitespace-nowrap">
            {[
              { text: "Fast Hiring", bg: "bg-gradient-to-r from-blue-500 to-blue-600" },
              { text: "Trusted Professionals", bg: "bg-gradient-to-r from-emerald-500 to-emerald-600" },
              { text: "24/7 Support", bg: "bg-gradient-to-r from-purple-500 to-purple-600" },
              { text: "AI Job Matching", bg: "bg-gradient-to-r from-blue-500 to-blue-600" },
              { text: "Easy to Use", bg: "bg-gradient-to-r from-emerald-500 to-emerald-600" },
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <span className={`inline-block px-6 py-3 ${item.bg} text-white rounded-xl font-bold text-lg`}>
                  {item.text}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div ref={processRef} className="bg-gray-50 dark:bg-gray-800 py-20 mt-10">
        <div className="w-11/12 mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">Get Hired in 4 Easy Steps</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 transform -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: FaUserTie, number: "01", title: "Create Profile", desc: "Build your professional profile with skills & experience" },
                { icon: FaSearch, number: "02", title: "Find Jobs", desc: "Browse thousands of verified job opportunities" },
                { icon: FaFileAlt, number: "03", title: "Apply Smartly", desc: "Use our AI-powered match system for best fits" },
                { icon: FaBriefcase, number: "04", title: "Get Hired", desc: "Interview and land your dream job faster" }
              ].map((step, index) => (
                <div key={index} className="process-step relative z-10">
                  <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <step.icon className="text-white text-3xl" />
                    </div>
                    <div className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 text-center">{step.number}</div>
                    <h3 className="text-2xl font-bold text-center mb-4 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Categories Section */}
      <div ref={topCategoriesRef} className="top-categories w-11/12 mx-auto mt-20">
        <h1 className="text-4xl font-extrabold mb-8 dark:text-white">Top Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

          <div className="category group bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white p-6 rounded-xl text-center font-bold flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative mb-5">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all duration-300">
                <img
                  src={webImg}
                  alt="Web Development"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-700 dark:bg-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">#1</span>
              </div>
            </div>
            <span className="text-lg">Web Development</span>
            <p className="text-sm font-normal mt-2 opacity-90">500+ Jobs</p>
          </div>

          <div className="category group bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white p-6 rounded-xl text-center font-bold flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative mb-5">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all duration-300">
                <img
                  src={marketingImg}
                  alt="Digital Marketing"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-700 dark:bg-emerald-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">#2</span>
              </div>
            </div>
            <span className="text-lg">Digital Marketing</span>
            <p className="text-sm font-normal mt-2 opacity-90">450+ Jobs</p>
          </div>

          <div className="category group bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white p-6 rounded-xl text-center font-bold flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative mb-5">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all duration-300">
                <img
                  src={graphicsImg}
                  alt="Graphics Designing"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-purple-700 dark:bg-purple-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">#3</span>
              </div>
            </div>
            <span className="text-lg">Graphics Designing</span>
            <p className="text-sm font-normal mt-2 opacity-90">400+ Jobs</p>
          </div>

          <div className="category group bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700 text-white p-6 rounded-xl text-center font-bold flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative mb-5">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all duration-300">
                <img
                  src={writingImg}
                  alt="Content Writing"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-cyan-700 dark:bg-cyan-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">#4</span>
              </div>
            </div>
            <span className="text-lg">Content Writing</span>
            <p className="text-sm font-normal mt-2 opacity-80">380+ Jobs</p>
          </div>

        </div>

        <div className="text-center mt-10 mb-10">
          <button
            onClick={() => navigate('/alljobs')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Categories →
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="w-11/12 mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Frontend Developer", quote: "Found my dream job in 2 weeks! The platform made job hunting actually enjoyable.", rating: 5 },
              { name: "Michael Chen", role: "Digital Marketer", quote: "The AI matching system is spot on. I got 3 interview calls within a week!", rating: 5 },
              { name: "Emily Rodriguez", role: "UI/UX Designer", quote: "As a fresh graduate, this platform helped me land my first professional role.", rating: 5 }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-600">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"></div>
                  <div className="ml-6">
                    <h4 className="text-xl font-bold dark:text-white">{testimonial.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-500 py-20 mt-10">
        <div className="w-11/12 mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Jumpstart Your Career?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands who found their perfect job match. Create your profile today and let opportunities find you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/alljobs')}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Browse All Jobs
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Create Free Account
            </button>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <FaCheck className="text-white text-2xl mx-auto mb-2" />
              <p className="text-white/90">No Hidden Fees</p>
            </div>
            <div className="text-center">
              <FaCheck className="text-white text-2xl mx-auto mb-2" />
              <p className="text-white/90">AI Job Matching</p>
            </div>
            <div className="text-center">
              <FaCheck className="text-white text-2xl mx-auto mb-2" />
              <p className="text-white/90">24/7 Support</p>
            </div>
            <div className="text-center">
              <FaCheck className="text-white text-2xl mx-auto mb-2" />
              <p className="text-white/90">Free Resume Review</p>
            </div>
          </div>
        </div>
      </div>

      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Home;