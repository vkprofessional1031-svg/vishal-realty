import { motion } from 'motion/react';
import { 
  Home, 
  Briefcase, 
  MapPin, 
  Handshake, 
  Key, 
  ShieldCheck 
} from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Residential & Commercial Sales',
    description: 'Expert representation for buying and selling residential and commercial properties across Chennai.',
    subServices: [
      'Buying Agent Services',
      "Seller's Agent Services",
      'First-Time Home Buyer Services'
    ],
    propertyTypes: ['Residential', 'Commercial']
  },
  {
    icon: Briefcase,
    title: 'Property Investment Advisory',
    description: 'Expert guidance to maximize your returns through informed real estate investments.',
    subServices: [
      'Property Investment Consulting',
      'Comparative Market Analysis',
      'Appraisals'
    ],
    propertyTypes: ['Residential', 'Commercial', 'Land', 'Industrial']
  },
  {
    icon: MapPin,
    title: 'Land Acquisition & Development',
    description: 'End-to-end support for acquiring and developing land parcels across Chennai\'s growth corridors.',
    subServices: [
      'Land Buying and Sales',
      'Site Evaluation',
      'Development Consulting'
    ],
    propertyTypes: ['Land', 'Residential', 'Commercial']
  },
  {
    icon: Handshake,
    title: 'Joint Venture Consulting',
    description: 'Strategic guidance for landowners and developers entering profitable joint venture partnerships.',
    subServices: [
      'JV Structuring',
      'Developer Matching',
      'New Construction Consulting'
    ],
    propertyTypes: ['Land', 'Residential', 'Commercial']
  },
  {
    icon: Key,
    title: 'Rentals & Leasing Solutions',
    description: 'Comprehensive rental assistance and commercial/office space leasing.',
    subServices: [
      'Property Rental Assistance',
      'Property Leasing',
      'Office Space Leasing'
    ],
    propertyTypes: ['Residential', 'Commercial']
  },
  {
    icon: ShieldCheck,
    title: 'Property Management Services',
    description: 'End-to-end management and relocation support to protect your assets.',
    subServices: [
      'Property Management',
      'Relocation Assistance'
    ],
    propertyTypes: ['Residential', 'Commercial']
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
            Our Professional Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-lg p-6 lg:p-8 flex flex-col justify-start transition-all duration-300 hover:border-t-4 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[380px] min-w-[290px]"
              style={{ 
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                borderTop: '4px solid transparent',
                border: '1px solid rgba(0,0,0,0.03)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderTopColor = '#00AEEF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = 'transparent';
              }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(245, 166, 35, 0.1)' }}
              >
                <service.icon size={24} style={{ color: '#F5A623' }} strokeWidth={2} />
              </div>
              
              <h3
                className="text-xl mb-3"
                style={{ 
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 700,
                  color: '#1A2B5F'
                }}
              >
                {service.title}
              </h3>
              
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  color: '#4A4A4A'
                }}
              >
                {service.description}
              </p>

              {/* Sub-services List */}
              <div className="flex-grow">
                <p
                  className="text-xs font-semibold tracking-wider uppercase mb-2"
                  style={{ color: '#1A2B5F', opacity: 0.6 }}
                >
                  Sub-Services
                </p>
                <ul className="space-y-1.5">
                  {service.subServices.map((sub, sIdx) => (
                    <li 
                      key={sIdx} 
                      className="text-xs flex items-start gap-2"
                      style={{ fontFamily: 'DM Sans, sans-serif', color: '#555555' }}
                    >
                      <span className="text-[#00AEEF] mt-0.5">•</span>
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
