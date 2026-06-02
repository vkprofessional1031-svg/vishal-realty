import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Square, BedDouble, Building, MessageCircle, Home } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  type: string;
  status: string;
  locality: string;
  address: string;
  price: string;
  area: number;
  bhk: number | null;
  floor: string | null;
  furnished: string;
  parking: string;
  facing: string;
  image: string;
  featured: boolean;
  description: string;
  highlights: string[];
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [imgError, setImgError] = useState(false);

  // Status Badge styling helper
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'For Sale':
        return { backgroundColor: '#00AEEF', color: '#FFFFFF' };
      case 'For Rent':
        return { backgroundColor: '#16A34A', color: '#FFFFFF' };
      case 'For Lease':
        return { backgroundColor: '#F5A623', color: '#FFFFFF' };
      default:
        return { backgroundColor: '#6B7280', color: '#FFFFFF' };
    }
  };

  // WhatsApp click handler
  const handleWhatsAppEnquiry = () => {
    const encodedTitle = encodeURIComponent(property.title);
    const encodedLocality = encodeURIComponent(property.locality);
    const whatsappUrl = `https://wa.me/916383977798?text=Hi%20Kishore%2C%20I%20am%20interested%20in%20early%20access%20for%20the%20upcoming%20${encodedTitle}%20in%20${encodedLocality}.%20Please%20notify%20me%20when%20details%20are%20active.`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.03)'
      }}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
        {/* Render Image or clean fallback */}
        {!imgError && property.image ? (
          <img
            src={property.image}
            alt={property.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div 
            className="w-full h-full flex flex-col items-center justify-center text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1A2B5F 0%, #00AEEF 100%)' }}
          >
            <div className="absolute inset-0 bg-black/10" />
            <Home size={40} className="mb-2.5 opacity-90 relative z-10 animate-pulse" />
            <span 
              className="text-xs font-bold tracking-[0.15em] uppercase relative z-10 text-center px-4" 
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Properties Coming Soon
            </span>
          </div>
        )}

        {/* Status Badge floating top-left */}
        <span
          className="absolute top-3 left-3 text-xs font-extrabold uppercase px-3 py-1 rounded shadow-md z-10"
          style={{
            ...getStatusStyle(property.status),
            fontFamily: 'DM Sans, sans-serif',
            letterSpacing: '0.05em'
          }}
        >
          {property.status}
        </span>

        {/* Featured Tag floating top-right */}
        {property.featured && (
          <span
            className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white text-[#1A2B5F] shadow z-10 border border-[#1A2B5F]/10"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            ★ Featured
          </span>
        )}
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Property Type Badge */}
          <span
            className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600 mb-3"
            style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.05em' }}
          >
            {property.type}
          </span>

          {/* Title */}
          <h3
            className="text-lg font-bold leading-snug mb-2 hover:text-[#00AEEF] transition-colors cursor-pointer"
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              color: '#1A2B5F'
            }}
          >
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 mb-4">
            <MapPin size={16} style={{ color: '#00AEEF' }} className="flex-shrink-0" />
            <span
              className="text-sm font-semibold truncate"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                color: '#555555'
              }}
              title={property.address}
            >
              {property.address}
            </span>
          </div>

          {/* Price */}
          <div
            className="text-2xl font-extrabold mb-4"
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              color: '#1A2B5F'
            }}
          >
            {property.price}
          </div>

          {/* Specifications Row */}
          <div
            className="flex flex-wrap items-center gap-y-1.5 text-xs font-semibold mb-4 border-t border-b py-3 text-gray-500"
            style={{ fontFamily: 'DM Sans, sans-serif', borderColor: 'rgba(0,0,0,0.06)' }}
          >
            {/* Area */}
            <div className="flex items-center gap-1.5">
              <Square size={13} style={{ color: '#00AEEF' }} />
              <span>{property.area} Sq.ft</span>
            </div>

            {/* Separator Dot if BHK available */}
            {property.bhk && (
              <>
                <span className="mx-2 text-gray-300">•</span>
                <div className="flex items-center gap-1.5">
                  <BedDouble size={13} style={{ color: '#00AEEF' }} />
                  <span>{property.bhk} BHK</span>
                </div>
              </>
            )}

            {/* Separator Dot if Floor available */}
            {property.floor && (
              <>
                <span className="mx-2 text-gray-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Building size={13} style={{ color: '#00AEEF' }} />
                  <span>{property.floor} Floor</span>
                </div>
              </>
            )}
          </div>

          {/* Furnishing & Facing */}
          <div
            className="text-xs text-gray-500 mb-5 flex justify-between font-medium"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <span>Status: <strong className="text-gray-700">{property.furnished}</strong></span>
            <span>Facing: <strong className="text-gray-700">{property.facing}</strong></span>
          </div>

          {/* Highlights (rendered up to 3) */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {property.highlights.slice(0, 3).map((hl, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 bg-gray-50"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {hl}
              </span>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA Button */}
        <button
          onClick={handleWhatsAppEnquiry}
          className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded-lg uppercase tracking-wide transition-all duration-300 hover:opacity-90 shadow-sm hover:shadow-md cursor-pointer"
          style={{
            backgroundColor: '#25D366',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(37,211,102,0.15)'
          }}
        >
          <MessageCircle size={18} fill="white" />
          Get Early Access
        </button>
      </div>
    </motion.div>
  );
}
