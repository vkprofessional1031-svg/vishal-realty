import { motion } from 'motion/react';

export function StatsBar() {
  const stats = [
    { number: '500+', label: 'Properties Listed' },
    { number: '10+', label: 'Years of Experience' },
    { number: '200+', label: 'Happy Clients' },
    { number: '9', label: 'Services Offered' }
  ];

  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: '#1A2B5F' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {index !== 0 && (
                <div 
                  className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-20"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                />
              )}
              <p
                className="text-4xl lg:text-5xl mb-2"
                style={{ 
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 800,
                  color: '#FFFFFF'
                }}
              >
                {stat.number}
              </p>
              <p
                className="text-sm tracking-[0.1em] uppercase"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  color: '#00AEEF',
                  fontWeight: 600
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
