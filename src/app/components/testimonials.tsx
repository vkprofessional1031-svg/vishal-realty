import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'hemananda kumar',
    subtitle: '8 reviews',
    text: '"Excellent service by Vishal Reality! They handled our real estate needs professionally, with great clarity and excellent communication. They provided options within our budget and ensured all legal documents were in order 😊"',
    time: '3 weeks ago',
    rating: 5,
    avatar: 'H',
    color: '#7CB342' // Greenish color from the screenshot
  },
  {
    name: 'Sampath Kumaran',
    subtitle: 'Local Guide · 31 reviews',
    text: 'Good knowledge with customer centric approach for service. Genuinely interested in the best interests off all the stakeholders involved. Best wishes',
    time: '3 weeks ago',
    rating: 5,
    avatar: 'S',
    color: '#00AEEF' // Brand color fallback
  },
  {
    name: 'Prasanna Sekar',
    subtitle: '1 review',
    text: 'The owner is genuine and has a deep knowledge in this realty sector. As per my expectations, he has shared good number of projects.',
    time: '3 weeks ago',
    rating: 5,
    avatar: 'P',
    color: '#1A2B5F' // Brand dark blue fallback
  }
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-sm mb-3 tracking-[0.1em] uppercase"
            style={{ 
              color: '#00AEEF',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600
            }}
          >
            CUSTOMER REVIEWS
          </p>
          <h2
            className="text-3xl lg:text-4xl"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            What Our Clients Say
          </h2>
        </div>

        {/* Map Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border border-gray-100 flex flex-col justify-between"
              style={{
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
              }}
            >
              <div>
                {/* Profile row */}
                <div className="flex items-center gap-4 mb-5">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-medium"
                    style={{ backgroundColor: review.color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <h3 
                      className="font-bold text-base leading-snug"
                      style={{ color: '#1A2B5F', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    >
                      {review.name}
                    </h3>
                    <p 
                      className="text-xs text-gray-500 mt-0.5"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {review.subtitle}
                    </p>
                  </div>
                </div>

                {/* Stars & Time */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {review.time}
                  </span>
                </div>

                {/* Review Text */}
                <p 
                  className="text-sm leading-relaxed text-gray-700"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {review.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
