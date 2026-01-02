import React from 'react';

const AboutSection = () => {
      return (
    <section id="about" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg">
              FM Ltd. connects freelancers with clients worldwide since 2025. 
              We're dedicated to making freelance work accessible and rewarding.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-lg">
              Started by a group of freelancers who understood the challenges 
              of finding quality work, we built a platform that puts people first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;