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

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const data = useLoaderData();
  const containerRef = useRef();
  const jobContainer = useRef();
  const topCategoriesRef = useRef();
  const navigate = useNavigate();

  // Initialize animations
  useEffect(() => {
    // Ensure ScrollTrigger is refreshed after DOM is ready
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  useGSAP(() => {
    // Circle animations
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
        boxShadow: "0 0 20px rgba(255,255,255,0.8)",
      });
    });

    // Button animation
    gsap.to(".btn", {
      scale: 1.2,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  useGSAP(() => {
    // Parallax background effect
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

    // Mouse move effect
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
    // Jobs container animation
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
    // "Why Choose US?" animation
    gsap.fromTo(".us", {
      scale: 0.8,
      opacity: 0,
      color: '#ffffff'
    }, {
      scale: 1,
      opacity: 1,
      color: '#00ff75',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.us',
        start: 'top 85%'
      }
    });

    // Scrolling cards animation
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

  // FIXED: Top categories animation - separate hook
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
          markers: false, // Set to true for debugging
        }
      });
    });
  });

  const handleNavigate = () => {
    navigate('/alljobs')
  }

  return (
    <div>
      <div className="flex flex-col items-center w-full overflow-hidden">
        <div
          ref={containerRef}
          className="relative mx-auto bg-[#bef6]/90 h-[400px] sm:h-[450px] md:h-[500px] p-2 w-full"
        >
          <div
            className="absolute inset-0 bg-cover banner-bg bg-center brightness-50"
            style={{ backgroundImage: `url(${bannerimg})` }}
          ></div>
          
          <h1 className="absolute text-5xl font-bold sm:text-6xl md:text-8xl md:font-extrabold left-6 sm:left-10 top-12 sm:top-16">
            Unemployed?
          </h1>

          <div className="absolute top-[40%] left-0 flex gap-6 sm:gap-10 px-4">
            {[...Array(17)].map((_, i) => (
              <div
                key={i}
                className="circle w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full bg-white"
              ></div>
            ))}
          </div>

          <div className='flex justify-between'>
            <h1 className="absolute text-xl sm:text-xl md:text-2xl md:font-bold top-[80%] left-[10%] md:left-[5%] sm:left-[10%]">
              Trusted by Thousands,
              Made by Professionals
            </h1>
            <h1 className="absolute text-4xl sm:text-5xl md:text-6xl md:font-bold top-[70%] left-[25%] md:left-[70%] sm:left-[60%]">
              Let's fix that
            </h1>
          </div>

          <button onClick={handleNavigate} className="absolute btn top-[88%] md:top-[85%] left-[50%] md:left-[85%] sm:left-[75%] bg-white text-black px-4 py-2 rounded-md">
            See Jobs!
          </button>
        </div>
      </div>

      <div
        ref={jobContainer}
        className='w-11/12 mx-auto mt-4'>
        <h1 className='text-5xl font-extrabold'>Latest Jobs</h1>

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
        >
          {data.map((job) => (
            <SwiperSlide key={job._id} className='flex justify-center mt-2'>
              <Job job={job} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="us w-11/12 mx-auto overflow-hidden h-[120px] sm:h-[140px]">
        <h1 className="mb-4 text-3xl sm:text-4xl font-bold">Why Choose US?</h1>
        <div className="overflow-hidden h-full">
          <div className="cards flex gap-10 whitespace-nowrap">
            <span className="inline-block px-4 py-2 bg-green-400 text-black rounded-lg">Fast Hiring</span>
            <span className="inline-block px-4 py-2 bg-blue-400 text-white rounded-lg">Trusted Professionals</span>
            <span className="inline-block px-4 py-2 bg-purple-500 text-white rounded-lg">24/7 Support</span>
            <span className="inline-block px-4 py-2 bg-green-400 text-black rounded-lg">Affordable Prices</span>
            <span className="inline-block px-4 py-2 bg-blue-400 text-white rounded-lg">Easy to Use</span>

            <span className="inline-block px-4 py-2 bg-green-400 text-black rounded-lg">Fast Hiring</span>
            <span className="inline-block px-4 py-2 bg-blue-400 text-white rounded-lg">Trusted Professionals</span>
            <span className="inline-block px-4 py-2 bg-purple-500 text-white rounded-lg">24/7 Support</span>
            <span className="inline-block px-4 py-2 bg-green-400 text-black rounded-lg">Affordable Prices</span>
            <span className="inline-block px-4 py-2 bg-blue-400 text-white rounded-lg">Easy to Use</span>
          </div>
        </div>
      </div>

      {/* FIXED: Top Categories Section with simpler animation */}
      <div ref={topCategoriesRef} className="top-categories w-11/12 mx-auto mt-20">
        <h1 className="text-4xl font-extrabold mb-8">Top Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

          <div className="category group bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl text-center font-bold flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative mb-5">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all duration-300">
                <img
                  src={webImg}
                  alt="Web Development"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">#1</span>
              </div>
            </div>
            <span className="text-lg">Web Development</span>
            <p className="text-sm font-normal mt-2 opacity-90">500+ Jobs</p>
          </div>

          <div className="category group bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl text-center font-bold flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative mb-5">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all duration-300">
                <img
                  src={marketingImg}
                  alt="Digital Marketing"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">#2</span>
              </div>
            </div>
            <span className="text-lg">Digital Marketing</span>
            <p className="text-sm font-normal mt-2 opacity-90">450+ Jobs</p>
          </div>

          <div className="category group bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-xl text-center font-bold flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative mb-5">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all duration-300">
                <img
                  src={graphicsImg}
                  alt="Graphics Designing"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">#3</span>
              </div>
            </div>
            <span className="text-lg">Graphics Designing</span>
            <p className="text-sm font-normal mt-2 opacity-90">400+ Jobs</p>
          </div>

          <div className="category group bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-xl text-center font-bold flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative mb-5">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all duration-300">
                <img
                  src={writingImg}
                  alt="Content Writing"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
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
            className="px-6 py-3  bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-black font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 "
          >
            View All Categories →
          </button>
        </div>
      </div>

      <AboutSection></AboutSection>
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;