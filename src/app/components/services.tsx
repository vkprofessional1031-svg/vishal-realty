import { motion } from 'motion/react';
import { 
  Key, 
  Home, 
  Briefcase, 
  Hammer, 
  Zap, 
  Wrench, 
  Droplet, 
  Building, 
  Sun 
} from 'lucide-react';

const services = [
  {
    icon: Key,
    title: 'Rental Services',
    description: 'Comprehensive rental solutions for residential and commercial properties'
  },
  {
    icon: Home,
    title: 'Real Estate Buying or Selling',
    description: 'Expert guidance for property transactions across Chennai'
  },
  {
    icon: Briefcase,
    title: 'Property Management Services',
    description: 'End-to-end management for your real estate investments'
  },
  {
    icon: Hammer,
    title: 'Carpentry & Interior Design',
    description: 'Custom woodwork and interior design solutions'
  },
  {
    icon: Zap,
    title: 'Electricals & Inverters',
    description: 'Professional electrical installations and inverter systems'
  },
  {
    icon: Wrench,
    title: 'Renovation & Civil Works',
    description: 'Complete renovation and civil construction services'
  },
  {
    icon: Droplet,
    title: 'Plumbing & Painting Works',
    description: 'Quality plumbing and painting for all property types'
  },
  {
    icon: Building,
    title: 'Construction & JV (Joint Venture)',
    description: 'Large-scale construction projects and joint venture opportunities'
  },
  {
    icon: Sun,
    title: 'Solar PV Systems',
    description: 'Sustainable solar energy solutions for residential and commercial spaces'
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-24 bg-white">
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
            WHAT WE OFFER
          </p>
          <h2
            className="text-3xl lg:text-4xl"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            Our Best Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-lg p-6 transition-all duration-300 hover:border-t-4"
              style={{ 
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                borderTop: '4px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderTopColor = '#00AEEF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = 'transparent';
              }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(245, 166, 35, 0.1)' }}
              >
                <service.icon size={24} style={{ color: '#F5A623' }} strokeWidth={2} />
              </div>
              
              <h3
                className="text-xl mb-2"
                style={{ 
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 700,
                  color: '#1A2B5F'
                }}
              >
                {service.title}
              </h3>
              
              <p
                className="text-sm leading-relaxed"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  color: '#2D2D2D'
                }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
