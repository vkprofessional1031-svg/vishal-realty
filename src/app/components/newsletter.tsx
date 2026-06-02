import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="newsletter" className="py-16 lg:py-20" style={{ backgroundColor: '#1A2B5F' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-6" style={{ backgroundColor: 'rgba(0, 174, 239, 0.1)' }}>
            <Mail size={24} style={{ color: '#00AEEF' }} />
          </div>

          {/* Heading */}
          <h2 
            className="text-2xl lg:text-3xl font-extrabold mb-3 text-white"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Stay Updated on Chennai Real Estate
          </h2>

          {/* Subtext */}
          <p 
            className="text-base mb-8"
            style={{ 
              fontFamily: 'DM Sans, sans-serif', 
              color: '#00AEEF',
              fontWeight: 500
            }}
          >
            Get property tips, market updates and new listings directly in your inbox.
          </p>

          {/* Form */}
          {!subscribed ? (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubscribe} 
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto justify-center items-center"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:flex-1 px-5 py-3.5 rounded-lg text-sm bg-white text-[#1A2B5F] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] placeholder-gray-400"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:opacity-90 cursor-pointer flex-shrink-0"
                style={{ 
                  backgroundColor: '#00AEEF', 
                  fontFamily: 'DM Sans, sans-serif',
                  boxShadow: '0 4px 12px rgba(0, 174, 239, 0.2)'
                }}
              >
                Subscribe
              </button>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-lg border border-white/20 text-white"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <CheckCircle size={20} className="text-[#00AEEF]" />
              <span className="text-sm font-semibold">Thank you for subscribing to our newsletter!</span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
