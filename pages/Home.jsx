import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import Gallery from '../component/gallery';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef();
  const galleryRef = useRef();
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

  useGSAP(()=>{
    gsap.from(galleryRef.current, {
        scrollTrigger: {
          trigger: galleryRef.current, 
          start: "top 80%",        
          end: "bottom 20%", 
          toggleActions: "restart none restart none",
          markers: false,       
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",  
    })
  }, []);
  
useEffect(() => {
  const circles = gsap.utils.toArray(".circle");

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    circles.forEach((circle) => {
      const circleRect = circle.getBoundingClientRect();
      const cx = circleRect.left + circleRect.width / 2 - rect.left;
      const cy = circleRect.top + circleRect.height / 2 - rect.top;

      const dx = mouseX - cx;
      const dy = mouseY - cy;

      // Small “magnet” effect
      gsap.to(circle, {
        x: dx * 0.1,
        y: dy * 0.1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  const el = containerRef.current;
  el.addEventListener("mousemove", handleMouseMove);
  el.addEventListener("mouseleave", () => {
    circles.forEach((circle) =>
      gsap.to(circle, { x: 0, y: 0, duration: 0.3, ease: "power2.out" })
    );
  });

  return () => el.removeEventListener("mousemove", handleMouseMove);
}, []);



  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      <div
        ref={containerRef}
        className="relative mx-auto bg-[#bef6]/90 h-[400px] sm:h-[450px] md:h-[500px] p-2 w-full"
      >
        
        <h1 className="absolute text-5xl font-bold sm:text-5xl md:text-8xl md:font-extrabold left-6 sm:left-10 top-12 sm:top-16">
          Unemployed?
        </h1>

        
        <div className="absolute top-[40%] left-0 flex gap-6 sm:gap-10 px-4">
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className="circle w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white"
            ></div>
          ))}
        </div>

        <h1 className="absolute text-4xl sm:text-5xl md:text-6xl md:font-bold top-[70%] left-[25%] md:left-[70%] sm:left-[30%]">
          Let's fix that
        </h1>

        <button className="absolute btn top-[85%] left-[50%] md:left-[85%] sm:left-[55%] bg-white text-black px-4 py-2 rounded-md">
          See Jobs!
        </button>
      </div>

      <div ref={galleryRef} className="mt-6 ">
        <Gallery />
      </div>
    </div>
  );
};

export default Home;
