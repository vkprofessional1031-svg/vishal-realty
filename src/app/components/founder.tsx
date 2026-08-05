import { motion } from 'motion/react';
import founderImg from '../../assets/founder.jpg';

export function Founder() {
  return (
    <section id="founder" className="py-20 lg:py-24" style={{ backgroundColor: '#F4F6F9' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p
            className="text-sm mb-3 tracking-[0.1em] uppercase"
            style={{ 
              color: '#00AEEF',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600
            }}
          >
            MEET OUR FOUNDER
          </p>
          <h2
            className="text-3xl lg:text-4xl"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            Meet Our Founder
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Photo + Quote */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Founder Photo */}
            <div 
              className="w-full max-w-[360px] aspect-[4/5] rounded-xl mb-8 relative overflow-hidden shadow-lg border border-[#1A2B5F]/10 bg-white"
              style={{ 
                boxShadow: '0 10px 30px -5px rgba(26, 43, 95, 0.1), 0 4px 12px -2px rgba(26, 43, 95, 0.05)'
              }}
            >
              <img 
                src={founderImg} 
                alt="Kishore Kumar Vigneswaran - Founder & Director" 
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                style={{ objectPosition: 'center top' }}
              />
            </div>

            {/* Quote */}
            <div className="max-w-[400px] text-center lg:text-left">
              <p 
                className="text-xl lg:text-2xl italic leading-relaxed font-medium mb-4"
                style={{ 
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  color: '#1A2B5F'
                }}
              >
                "Every family deserves a home they can truly call their own — and the right guidance to get there."
              </p>
            </div>
          </div>

          {/* Right Side: Bio + 4 Pillars Grid */}
          <div className="lg:col-span-7">
            <h3
              className="text-3xl lg:text-4xl font-extrabold mb-2"
              style={{ 
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                color: '#1A2B5F',
                letterSpacing: '-0.02em'
              }}
            >
              Kishore Kumar Vigneswaran
            </h3>
            <p
              className="text-sm lg:text-base font-extrabold tracking-[0.15em] uppercase mb-8"
              style={{ 
                color: '#00AEEF',
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              Founder & Real Estate Consultant, Vishal Realty
            </p>

            <div className="space-y-6">
              <p
                className="text-lg lg:text-xl font-normal"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  lineHeight: '1.8',
                  color: '#374151'
                }}
              >
                With over 10 years of deep experience in Chennai's premium real estate market, Kishore Kumar Vigneswaran founded Vishal Realty Consultancy with one clear purpose — to guide families and home buyers through one of the most important decisions of their lives with absolute honesty, clarity, and care.
              </p>
              <p
                className="text-lg lg:text-xl font-normal"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  lineHeight: '1.8',
                  color: '#374151'
                }}
              >
                Having witnessed firsthand how complex and overwhelming the property buying journey can be, Kishore built Vishal Realty on a bedrock of trust and transparency. Today, the consultancy serves home buyers, developers, and investors alike — always driven by the same founding commitment: putting your best interests first and delivering expert, end-to-end support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
