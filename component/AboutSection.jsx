import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaRocket, FaHandshake, FaUsers, FaGlobeAmericas } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const missionRef = useRef(null);
  const storyRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);

  const values = [
    {
      icon: <FaHandshake className="text-4xl" />,
      title: "Trust & Transparency",
      description: "Clear communication and honest dealings with all stakeholders"
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Community First",
      description: "Building a supportive network for freelancers worldwide"
    },
    {
      icon: <FaRocket className="text-4xl" />,
      title: "Innovation Driven",
      description: "Continuously improving our platform with latest technologies"
    },
    {
      icon: <FaGlobeAmericas className="text-4xl" />,
      title: "Global Reach",
      description: "Connecting talent with opportunities across continents"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Freelancers" },
    { number: "5,000+", label: "Happy Clients" },
    { number: "50+", label: "Countries" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  useGSAP(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Title animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Mission & Story columns animation
    const missionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: missionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    missionTimeline
      .fromTo(missionRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(storyRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

    // Stats counter animation
    stats.forEach((stat, index) => {
      const statElement = statsRef.current?.children[index];
      if (statElement) {
        const numberElement = statElement.querySelector('.stat-number');
        const labelElement = statElement.querySelector('.stat-label');
        
        gsap.fromTo(numberElement,
          { opacity: 0, y: 20, textContent: 0 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            textContent: stat.number,
            snap: { textContent: 1 },
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.fromTo(labelElement,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    if (valuesRef.current) {
      gsap.fromTo(valuesRef.current.children,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            About FM Ltd.
          </span>
          <h1 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Building the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Freelance Work</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing how freelancers and clients connect, collaborate, and succeed together.
          </p>
        </div>

        {/* Mission & Story */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div 
            ref={missionRef}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6">
              <FaRocket className="text-2xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              FM Ltd. connects freelancers with clients worldwide since 2025. We're dedicated to making freelance work accessible, rewarding, and transformative for everyone involved.
            </p>
            <div className="space-y-4">
              <p className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Empower freelancers to work on their terms
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Help businesses find top talent efficiently
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Create a fair and transparent marketplace
              </p>
            </div>
          </div>

          <div 
            ref={storyRef}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6">
              <FaUsers className="text-2xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Started by a group of freelancers who understood the challenges of finding quality work, we built a platform that puts people first. Our journey began with a simple question: <span className="font-semibold text-gray-900 dark:text-white">"Why is freelance work so complicated?"</span>
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Today, we're proud to serve thousands of freelancers and clients globally, continuously innovating to make freelance work better for everyone. From humble beginnings to a thriving community, our commitment remains unchanged: <span className="font-semibold text-gray-900 dark:text-white">empower talent, enable businesses.</span>
            </p>
          </div>
        </div>

        {/* Stats */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="stat-number text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="stat-label text-lg font-semibold text-gray-700 dark:text-gray-300 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core <span className="text-blue-600">Values</span>
          </h2>
          <div 
            ref={valuesRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <div 
                key={index}
                className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-200 dark:border-gray-700"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-600 dark:text-blue-300 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Freelance Journey?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful freelancers and businesses who trust FM Ltd. for their projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Join as Freelancer
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
              Hire Talent
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;