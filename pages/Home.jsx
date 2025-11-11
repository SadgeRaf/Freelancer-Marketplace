import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import React, { useRef } from 'react';
import Gallery from '../component/gallery';
import bannerimg from '../src/assets/7880.jpg'
import { useLoaderData } from 'react-router';
import Job from '../component/Job';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay, FreeMode } from "swiper/modules";

gsap.registerPlugin(ScrollTrigger);



const Home = () => {
  const data = useLoaderData();
  const containerRef = useRef();
  const jobContainer = useRef();
  // const galleryRef = useRef();
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
        boxShadow: "0 0 20px rgba(255,255,255,0.8)",
      });
    });
  }, []);


  useGSAP(() => {
    gsap.to(".btn", {
      scale: 1.2,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  useGSAP(() => {
    // Scroll parallax
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
  }, [])
  // useGSAP(()=>{
  //   gsap.from(galleryRef.current, {
  //       scrollTrigger: {
  //         trigger: galleryRef.current, 
  //         start: "top 80%",        
  //         end: "bottom 20%", 
  //         toggleActions: "restart none restart none",
  //         markers: false,       
  //     },
  //     y: 50,
  //     opacity: 0,
  //     duration: 1.2,
  //     ease: "power3.out",  
  //   })
  // }, []);

  // useEffect(() => {
  //   const circles = gsap.utils.toArray(".circle");

  //   const handleMouseMove = (e) => {
  //     const rect = containerRef.current.getBoundingClientRect();
  //     const mouseX = e.clientX - rect.left;
  //     const mouseY = e.clientY - rect.top;

  //     circles.forEach((circle) => {
  //       const circleRect = circle.getBoundingClientRect();
  //       const cx = circleRect.left + circleRect.width / 2 - rect.left;
  //       const cy = circleRect.top + circleRect.height / 2 - rect.top;

  //       const dx = mouseX - cx;
  //       const dy = mouseY - cy;

  //       // Small “magnet” effect
  //       gsap.to(circle, {
  //         x: dx * 0.1,
  //         y: dy * 0.1,
  //         duration: 0.3,
  //         ease: "power2.out",
  //       });
  //     });
  //   };

  //   const el = containerRef.current;
  //   el.addEventListener("mousemove", handleMouseMove);
  //   el.addEventListener("mouseleave", () => {
  //     circles.forEach((circle) =>
  //       gsap.to(circle, { x: 0, y: 0, duration: 0.3, ease: "power2.out" })
  //     );
  //   });

  //   return () => el.removeEventListener("mousemove", handleMouseMove);
  // }, []);



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
            {[...Array(15)].map((_, i) => (
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

          <button className="absolute btn top-[88%] md:top-[85%] left-[50%] md:left-[85%] sm:left-[75%] bg-white text-black px-4 py-2 rounded-md">
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
      {/* <div ref={galleryRef} className="mt-6 ">
        <Gallery />
      </div> */}
      <div>
        <h1>Why CHoose US?</h1>
      </div>

      <div>
        <h1>Top CAtegories</h1>
      </div>

    </div>
  );
};

export default Home;
