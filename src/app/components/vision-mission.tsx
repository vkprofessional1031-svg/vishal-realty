import { motion } from 'motion/react';
import { Award, Handshake, ShieldCheck, Key } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Expert Guidance',
    description: '10+ years of local Chennai real estate expertise.'
  },
  {
    icon: ShieldCheck,
    title: 'Verified Properties',
    description: 'Every property legally and physically vetted.'
  },
  {
    icon: Handshake,
    title: 'Transparent Deals',
    description: 'No hidden charges, clear and honest dealings.'
  },
  {
    icon: Key,
    title: 'End-to-End Support',
    description: 'With you from first visit to final registration.'
  }
];

export function VisionMission() {
  return (
    <section id="vision-mission" className="py-20 lg:py-24 bg-white">
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
            WHO WE ARE
          </p>
          <h2
            className="text-3xl lg:text-4xl"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            Our Vision, Mission & Values
          </h2>
        </div>

        {/* Vision & Mission Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Vision Card: Navy Background, White Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-xl p-8 lg:p-10 flex flex-col justify-between"
            style={{ 
              backgroundColor: '#1A2B5F',
              boxShadow: '0 8px 30px rgba(26, 43, 95, 0.15)'
            }}
          >
            <div>
              <span 
                className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-6 inline-block"
                style={{ 
                  backgroundColor: 'rgba(0, 174, 239, 0.2)', 
                  color: '#00AEEF',
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Our Vision
              </span>
              <p 
                className="text-lg lg:text-xl leading-relaxed font-medium italic text-white"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                "To be Chennai's most trusted real estate brand — expanding our presence across Tamil Nadu as a full-service property group, and remaining the go-to choice for every first-time home buyer, investor, and property owner seeking honest guidance and lasting partnerships."
              </p>
            </div>
          </motion.div>

          {/* Mission Card: Cyan Background, White Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-xl p-8 lg:p-10 flex flex-col justify-between"
            style={{ 
              backgroundColor: '#00AEEF',
              boxShadow: '0 8px 30px rgba(0, 174, 239, 0.2)'
            }}
          >
            <div>
              <span 
                className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-6 inline-block"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                  color: '#FFFFFF',
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                Our Mission
              </span>
              <p 
                className="text-lg lg:text-xl leading-relaxed font-medium italic text-white"
                style={{ 
                  fontFamily: 'Plus Jakarta Sans, sans-serif'
                }}
              >
                "At Vishal Realty Consultancy, our mission is to deliver honest, transparent, and expert real estate services that empower every client — whether a first-time home buyer, seasoned investor, or property owner — to make confident and informed decisions."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values Section label */}
        <div className="text-center mb-8">
          <h3 
            className="text-xl font-bold tracking-wide uppercase"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              color: '#1A2B5F'
            }}
          >
            Our Core Values
          </h3>
        </div>

        {/* 4 Core Values Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md border"
              style={{ 
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                borderColor: 'rgba(0, 0, 0, 0.03)'
              }}
            >
              {/* Cyan Icon on white with soft background ring */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                style={{ backgroundColor: 'rgba(0, 174, 239, 0.08)' }}
              >
                <value.icon size={22} style={{ color: '#00AEEF' }} strokeWidth={2} />
              </div>
              <h4
                className="text-sm font-bold mb-2"
                style={{ 
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  color: '#1A2B5F'
                }}
              >
                {value.title}
              </h4>
              <p
                className="text-xs leading-relaxed"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  color: '#666666'
                }}
              >
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
