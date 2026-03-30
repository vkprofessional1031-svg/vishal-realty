import { motion } from 'motion/react';
import { Award, Shield, DollarSign, MapPin } from 'lucide-react';

const usps = [
  {
    icon: Award,
    title: 'Trusted Experts',
    description: 'Decades of experience in Chennai real estate market'
  },
  {
    icon: Shield,
    title: 'End-to-End Services',
    description: 'From buying to construction, we handle everything'
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden charges, clear and honest pricing'
  },
  {
    icon: MapPin,
    title: 'Local Chennai Knowledge',
    description: 'Deep understanding of Chennai neighborhoods'
  }
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
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
              className="text-3xl lg:text-4xl mb-6"
              style={{ 
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 800,
                color: '#1A2B5F'
              }}
            >
              Your Trusted Real Estate Partner in Chennai
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                color: '#2D2D2D'
              }}
            >
              With over a decade of experience, Vishal Realty has been helping individuals and 
              businesses find their perfect property in Chennai. Our comprehensive services cover 
              every aspect of real estate, from rental solutions to construction and property management.
            </p>

            <div className="space-y-6">
              {usps.slice(0, 2).map((usp, index) => (
                <div key={index} className="flex gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(245, 166, 35, 0.1)' }}
                  >
                    <usp.icon size={24} style={{ color: '#F5A623' }} strokeWidth={2} />
                  </div>
                  <div>
                    <h3
                      className="text-lg mb-1"
                      style={{ 
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontWeight: 700,
                        color: '#1A2B5F'
                      }}
                    >
                      {usp.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ 
                        fontFamily: 'DM Sans, sans-serif',
                        color: '#2D2D2D'
                      }}
                    >
                      {usp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: 2x2 Icon Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {usps.map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                style={{ 
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(245, 166, 35, 0.1)' }}
                >
                  <usp.icon size={28} style={{ color: '#F5A623' }} strokeWidth={2} />
                </div>
                <h3
                  className="text-lg mb-2"
                  style={{ 
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 700,
                    color: '#1A2B5F'
                  }}
                >
                  {usp.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ 
                    fontFamily: 'DM Sans, sans-serif',
                    color: '#2D2D2D'
                  }}
                >
                  {usp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
