import React from 'react';

const ContactSection = () => {
     return (
    <section id="contact" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-lg mb-4">
              Have questions? We're here to help! Reach out to our support team.
            </p>
            <div className="space-y-4">
              <p>📧 support@fmltd.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Freelance Street, Digital City</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
              <input type="email" placeholder="Your Email" className="input input-bordered w-full" />
              <textarea placeholder="Your Message" className="textarea textarea-bordered w-full h-32"></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;