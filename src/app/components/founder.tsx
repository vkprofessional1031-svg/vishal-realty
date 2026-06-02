import { motion } from 'motion/react';
import { Award, Handshake, ShieldCheck, Key } from 'lucide-react';
import founderImg from '../../assets/founder.jpg';

const pillars = [
  {
    icon: Award,
    title: 'Expert Guidance',
    description: '10+ years of local Chennai real estate expertise.'
  },
  {
    icon: Handshake,
    title: 'Transparent Deals',
    description: 'No hidden charges, clear and honest dealings.'
  },
  {
    icon: ShieldCheck,
    title: 'Verified Properties',
    description: 'Vigorously vetted legally and physically.'
  },
  {
    icon: Key,
    title: 'End-to-End Support',
    description: 'With you from first visit to registration.'
  }
];

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Photo + Quote */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Founder Photo */}
            <div 
              className="w-full max-w-[360px] aspect-[4/5] rounded-xl mb-8 relative overflow-hidden shadow-lg border-2"
              style={{ 
                borderColor: '#1A2B5F',
                boxShadow: '0 8px 30px rgba(26, 43, 95, 0.12)'
              }}
            >
              <img 
                src={founderImg} 
                alt="Kishore Vigneswaran - Founder & Director" 
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
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
              className="text-2xl font-extrabold mb-1"
              style={{ 
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                color: '#1A2B5F'
              }}
            >
              Kishore Vigneswaran
            </h3>
            <p
              className="text-sm font-semibold tracking-wider uppercase mb-6"
              style={{ 
                color: '#00AEEF',
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              Founder & Real Estate Consultant, Vishal Realty
            </p>

            <p
              className="text-base leading-relaxed mb-8"
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                color: '#4A4A4A'
              }}
            >
              With over 10 years of experience in Chennai's real estate market, Kishore Vigneswaran founded Vishal Realty Consultancy with one clear purpose — to guide first-time home buyers through one of the most important decisions of their lives, with honesty, clarity, and care. Having witnessed how overwhelming and confusing the property buying journey can be, Kishore built Vishal Realty on four core pillars: Expert Guidance, Transparent Deals, Verified Properties, and End-to-End Support. Today, Vishal Realty serves not just first-time buyers but also investors, landlords, and developers — always with the same commitment that started it all: putting your best interests first.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-5 flex gap-4 transition-all duration-300 hover:shadow-md"
                  style={{ 
                    borderRadius: '8px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.02)'
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(245, 166, 35, 0.1)' }}
                  >
                    <pillar.icon size={20} style={{ color: '#F5A623' }} strokeWidth={2} />
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold mb-1"
                      style={{ 
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        color: '#1A2B5F'
                      }}
                    >
                      {pillar.title}
                    </h4>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ 
                        fontFamily: 'DM Sans, sans-serif',
                        color: '#666666'
                      }}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
