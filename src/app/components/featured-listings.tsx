import { MapPin, ArrowRight } from 'lucide-react';

const properties = [
  {
    image: 'https://images.unsplash.com/photo-1763218161026-dd8bcfa832de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGFwYXJ0bWVudCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NDgyNzgyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'Residential',
    name: 'Modern Apartment Complex',
    location: 'Anna Nagar, Chennai',
    price: '₹75,00,000'
  },
  {
    image: 'https://images.unsplash.com/photo-1757439402101-55d1da381e70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHByb3BlcnR5JTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzc0ODI3ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'Villa',
    name: 'Luxury Villa with Pool',
    location: 'ECR, Chennai',
    price: '₹2,50,00,000'
  },
  {
    image: 'https://images.unsplash.com/photo-1580741276595-92d7e435d1f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBnbGFzc3xlbnwxfHx8fDE3NzQ4MTQ2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'Commercial',
    name: 'Premium Office Space',
    location: 'OMR, Chennai',
    price: '₹1,20,00,000'
  }
];

export function FeaturedListings() {
  return (
    <section id="properties" className="py-20 lg:py-24" style={{ backgroundColor: '#F4F6F9' }}>
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
            HANDPICKED FOR YOU
          </p>
          <h2
            className="text-3xl lg:text-4xl"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            Featured Properties
          </h2>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ 
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}
            >
              {/* Property Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div
                  className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: '#00AEEF',
                    color: '#FFFFFF',
                    fontFamily: 'DM Sans, sans-serif'
                  }}
                >
                  {property.type}
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3
                  className="text-xl mb-2"
                  style={{ 
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 700,
                    color: '#1A2B5F'
                  }}
                >
                  {property.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} style={{ color: '#00AEEF' }} />
                  <span
                    className="text-sm"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      color: '#2D2D2D'
                    }}
                  >
                    {property.location}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p
                    className="text-2xl"
                    style={{ 
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 700,
                      color: '#1A2B5F'
                    }}
                  >
                    {property.price}
                  </p>
                  <button
                    className="flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                    style={{ 
                      color: '#00AEEF',
                      fontFamily: 'DM Sans, sans-serif'
                    }}
                  >
                    View Details
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
