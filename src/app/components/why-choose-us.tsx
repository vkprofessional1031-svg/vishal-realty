import { motion } from 'motion/react';
import { Trophy, ShieldCheck, Handshake, Home, MapPin, Key } from 'lucide-react';

const reasons = [
  {
    icon: Trophy,
    title: '10+ Years of Expertise',
    description: "Deep knowledge of Chennai's real estate market across all localities — residential, commercial, and investment."
  },
  {
    icon: ShieldCheck,
    title: 'Verified Properties Only',
    description: 'Every property is legally and physically verified before we recommend it to any client. No surprises, no risks.'
  },
  {
    icon: Handshake,
    title: 'Transparent Dealings',
    description: 'No hidden charges, no commission surprises — complete clarity at every step of the transaction.'
  },
  {
    icon: Home,
    title: 'First-Home Buyer Specialists',
    description: 'We understand the emotions and concerns of buying your first home and guide you with patience and care.'
  },
  {
    icon: MapPin,
    title: 'Local Area Mastery',
    description: 'Adyar, OMR, ECR, Besant Nagar, Thiruvanmiyur — we know every street, every project, every price trend.'
  },
  {
    icon: Key,
    title: 'End-to-End Support',
    description: 'From your first property visit to the final registration — we are with you every step of the way.'
  }
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <p
            className="text-sm mb-3 tracking-[0.1em] uppercase"
            style={{ 
              color: '#00AEEF',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600
            }}
          >
            WHY VISHAL REALTY
          </p>
          <h2
            className="text-3xl lg:text-4xl mb-4"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            Why Clients Choose Vishal Realty
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ 
              fontFamily: 'DM Sans, sans-serif',
              color: '#666666'
            }}
          >
            With over 10 years in Chennai real estate, we bring expertise, honesty, and care to every property journey.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
              style={{ 
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                borderTop: '4px solid transparent',
                borderLeft: '1px solid rgba(0,0,0,0.03)',
                borderRight: '1px solid rgba(0,0,0,0.03)',
                borderBottom: '1px solid rgba(0,0,0,0.03)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderTopColor = '#00AEEF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = 'transparent';
              }}
            >
              <div>
                {/* Gold icon on light gold background */}
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(245, 166, 35, 0.1)' }}
                >
                  <reason.icon size={28} style={{ color: '#F5A623' }} strokeWidth={2} />
                </div>
                
                <h3
                  className="text-lg lg:text-xl mb-3"
                  style={{ 
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 700,
                    color: '#1A2B5F'
                  }}
                >
                  {reason.title}
                </h3>
                
                <p
                  className="text-sm leading-relaxed"
                  style={{ 
                    fontFamily: 'DM Sans, sans-serif',
                    color: '#4A4A4A'
                  }}
                >
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
