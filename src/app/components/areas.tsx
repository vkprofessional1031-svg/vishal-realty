import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

const areas = [
  {
    locality: 'Adyar',
    description: 'Premium residential and commercial hub in South Chennai.',
    propertyTypes: ['Residential', 'Commercial', 'Land']
  },
  {
    locality: 'OMR',
    description: 'IT corridor with high rental demand and growing infrastructure.',
    propertyTypes: ['Residential', 'Commercial', 'Industrial']
  },
  {
    locality: 'ECR',
    description: 'Beachfront properties, luxury villas, and high-yield investment plots.',
    propertyTypes: ['Residential', 'Land', 'Villas']
  },
  {
    locality: 'Besant Nagar',
    description: 'Upscale residential coastal locality with extremely high property values.',
    propertyTypes: ['Residential', 'Commercial']
  },
  {
    locality: 'Thiruvanmiyur',
    description: 'A growing mix of residential and commercial spaces with steady value appreciation.',
    propertyTypes: ['Residential', 'Commercial']
  }
];

export function Areas() {
  return (
    <section id="areas" className="py-20 lg:py-24" style={{ backgroundColor: '#F4F6F9' }}>
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
            OUR LOCAL EXPERTISE
          </p>
          <h2
            className="text-3xl lg:text-4xl"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            Areas We Serve
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center">
          {areas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg border border-transparent hover:border-[#00AEEF]/20"
              style={{ 
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                borderLeft: '1px solid rgba(0,0,0,0.02)',
                borderRight: '1px solid rgba(0,0,0,0.02)',
                borderBottom: '1px solid rgba(0,0,0,0.02)'
              }}
            >
              <div>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(0, 174, 239, 0.08)' }}
                >
                  <MapPin size={20} style={{ color: '#00AEEF' }} strokeWidth={2} />
                </div>
                
                <h3
                  className="text-xl mb-2"
                  style={{ 
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 700,
                    color: '#1A2B5F'
                  }}
                >
                  {area.locality}
                </h3>
                
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ 
                    fontFamily: 'DM Sans, sans-serif',
                    color: '#555555'
                  }}
                >
                  {area.description}
                </p>
              </div>

              {/* Badges */}
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {area.propertyTypes.map((type, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{ 
                        backgroundColor: 'rgba(0, 174, 239, 0.08)', 
                        color: '#00AEEF',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
