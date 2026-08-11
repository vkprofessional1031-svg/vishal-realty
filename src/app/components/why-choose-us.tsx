import { motion } from 'motion/react';
import { Briefcase, ShieldCheck, Star, FileCheck, Users, Home, Handshake } from 'lucide-react';

const reasons = [
  {
    icon: Briefcase,
    title: '25+ Years of Leadership Experience',
    description: 'Built across Blue Star, Videocon, Siemens Gamesa, Sutherland, and more — a foundation of corporate discipline brought into every client relationship.'
  },
  {
    icon: ShieldCheck,
    title: 'Trust & Transparency First',
    description: 'Every recommendation is guided by honesty, not just a sale — the same integrity that shaped a 25-year corporate career.'
  },
  {
    icon: Star,
    title: '31+ Five-Star Client Reviews',
    description: 'A growing reputation built on dependable service and real results for home buyers, investors, and developers alike.'
  },
  {
    icon: FileCheck,
    title: 'Complete Documentation Support',
    description: 'From title verification and approvals to registration — every legal detail handled with care and clarity.'
  },
  {
    icon: Users,
    title: 'End-to-End Guidance',
    description: 'From first consultation to final handover — site visits, negotiation, and legal coordination, all under one roof.'
  },
  {
    icon: Home,
    title: 'For Every Kind of Client',
    description: 'Trusted by first-time home buyers, seasoned investors, property owners, and developers across Chennai.'
  },
  {
    icon: Handshake,
    title: 'A Partner, Not Just an Agent',
    description: 'Real estate decisions are personal — Kishore brings the same client-first commitment to every transaction.'
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
            Built on 25+ years of professional discipline and a genuine commitment to honest, dependable guidance.
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
              className={`bg-white rounded-lg p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${index === 6 ? 'lg:col-start-2' : ''}`}
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
