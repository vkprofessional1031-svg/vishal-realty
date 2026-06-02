import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, MessageCircle, RefreshCw } from 'lucide-react';
import { PropertyCard } from './property-card';
import { getPublicProperties } from '../../supabase/properties';

interface Property {
  id: string | number;
  title: string;
  type: string;
  status: string;       // For Sale / For Rent / For Lease
  visibility?: string;   // 'live' | 'draft' | 'hidden'
  locality: string;
  address: string;
  price: string;
  area: number;
  bhk: number | null;
  floor: string | null;
  furnished: string;
  parking: string;
  facing: string;
  images?: string[];     // array of Supabase storage URLs
  image?: string;        // legacy fallback image URL
  floor_plan?: string | null;
  featured: boolean;
  description: string;
  highlights: string[];
  created_at?: string;
}

// Fallback premium upcoming properties for elegant "Coming Soon" placeholders
const comingSoonList: Property[] = [
  {
    id: 1,
    title: "Premium Luxury Apartments",
    type: "Apartment",
    status: "For Sale",
    locality: "Adyar",
    address: "Kamaraj Avenue, Adyar, Chennai",
    price: "Price on Request",
    area: 1800,
    bhk: 3,
    floor: "3rd",
    furnished: "Legally Verified",
    parking: "2 Covered",
    facing: "East",
    image: "",
    featured: true,
    description: "Exclusive residential collections in Adyar. Our team is legally verifying documentation and clearing land titles.",
    highlights: ["Premium Location", "Legally Verified", "Early Access Available"]
  },
  {
    id: 2,
    title: "Beachfront Independent Villas",
    type: "Villa",
    status: "For Sale",
    locality: "ECR",
    address: "ECR Road, Thiruvanmiyur / ECR, Chennai",
    price: "Price on Request",
    area: 3200,
    bhk: 4,
    floor: "G+1",
    furnished: "Legally Verified",
    parking: "3 Private",
    facing: "North",
    image: "",
    featured: true,
    description: "Ultra-luxury beachfront villas along ECR. CMDA approval and detailed legal clearance checks are currently in progress.",
    highlights: ["Beachfront View", "Private Pool Option", "DTCP Approved plots"]
  },
  {
    id: 3,
    title: "Grade-A Commercial Office Spaces",
    type: "Commercial",
    status: "For Lease",
    locality: "OMR",
    address: "OMR IT Expressway, OMR, Chennai",
    price: "Price on Request",
    area: 5000,
    bhk: null,
    floor: "5th",
    furnished: "Legally Verified",
    parking: "Ample Covered",
    facing: "West",
    image: "",
    featured: false,
    description: "Modern commercial office layout on the prime IT corridor of Chennai. Ideal for IT expansion and corporate leases.",
    highlights: ["IT Corridor", "High Rental Yield", "Ample Car Parking"]
  },
  {
    id: 4,
    title: "DTCP Approved Residential Plots",
    type: "Plot",
    status: "For Sale",
    locality: "Thiruvanmiyur",
    address: "Thiruvanmiyur Main Road, Thiruvanmiyur, Chennai",
    price: "Price on Request",
    area: 2400,
    bhk: null,
    floor: null,
    furnished: "Legally Verified",
    parking: "N/A",
    facing: "South",
    image: "",
    featured: false,
    description: "Prime residential plots in Thiruvanmiyur. All plots are CMDA/DTCP approved and have completed 100% legal title verification.",
    highlights: ["DTCP Approved", "Clear Title", "Immediate Construction"]
  },
  {
    id: 5,
    title: "Premium Beach-View Apartments",
    type: "Apartment",
    status: "For Rent",
    locality: "Besant Nagar",
    address: "Besant Nagar Beach Road, Besant Nagar, Chennai",
    price: "Price on Request",
    area: 2000,
    bhk: 3,
    floor: "4th",
    furnished: "Legally Verified",
    parking: "2 Covered",
    facing: "East",
    image: "",
    featured: true,
    description: "Premium apartments overlooking the Besant Nagar beach. Currently undergoing final verification and landscaping.",
    highlights: ["Ocean View", "Premium Locality", "Early Booking Open"]
  },
  {
    id: 6,
    title: "High-Visibility Commercial Showrooms",
    type: "Commercial",
    status: "For Sale",
    locality: "Adyar",
    address: "Adyar Main Road, Adyar, Chennai",
    price: "Price on Request",
    area: 3500,
    bhk: null,
    floor: "Ground",
    furnished: "Legally Verified",
    parking: "Ample Frontage",
    facing: "North",
    image: "",
    featured: false,
    description: "High-visibility retail showroom and office spaces in the heart of Adyar. Legally cleared with broad road frontage.",
    highlights: ["Main Road Frontage", "High Footfalls", "Excellent Frontage"]
  }
];

const statuses = ['All', 'For Sale', 'For Rent', 'For Lease'];
const types = ['All', 'Apartment', 'Villa', 'Plot', 'Commercial'];
const localities = ['All', 'Adyar', 'OMR', 'ECR', 'Besant Nagar', 'Thiruvanmiyur'];

// Card Skeleton Loader Component
function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm animate-pulse h-[460px] flex flex-col justify-between p-5">
      <div className="bg-gray-200 aspect-[4/3] w-full rounded-md mb-4" />
      <div className="space-y-3 flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded w-1/3" />
      </div>
      <div className="h-10 bg-gray-200 rounded-lg w-full mt-4" />
    </div>
  );
}

export function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocality, setSelectedLocality] = useState('All');

  // Fetch properties from Supabase
  useEffect(() => {
    const fetchProps = async () => {
      try {
        const data = await getPublicProperties();
        if (data && data.length > 0) {
          setProperties(data as Property[]);
        } else {
          setProperties(comingSoonList);
        }
      } catch (error) {
        console.error("Supabase fetch error, falling back to static coming soon list:", error);
        setProperties(comingSoonList);
      } finally {
        setLoading(false);
      }
    };
    fetchProps();
  }, []);

  // Multi-tier filtration logic
  const filteredProperties = properties.filter((prop) => {
    const statusMatch = selectedStatus === 'All' || prop.status === selectedStatus;
    const typeMatch = selectedType === 'All' || prop.type === selectedType;
    const localityMatch = selectedLocality === 'All' || prop.locality === selectedLocality;
    return statusMatch && typeMatch && localityMatch;
  });

  const resetFilters = () => {
    setSelectedStatus('All');
    setSelectedType('All');
    setSelectedLocality('All');
  };

  const handleWhatsAppChat = () => {
    const whatsappUrl = 'https://wa.me/916383977798?text=Hi%20Vishal%20Realty%2C%20I%20am%20looking%20for%20properties%20in%20Chennai%20that%20are%20not%20listed%20on%20your%20website.%20Please%20help%20me%20find%20a%20property.';
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="properties" className="py-20 lg:py-24" style={{ backgroundColor: '#F4F6F9' }}>
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
            AVAILABLE PROPERTIES
          </p>
          <h2
            className="text-3xl lg:text-4xl mb-4"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            Current Listings
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ 
              fontFamily: 'DM Sans, sans-serif',
              color: '#666666'
            }}
          >
            Browse our verified properties across Chennai. Contact us directly for latest availability and pricing.
          </p>
        </div>

        {/* Simplified Filter Bar */}
        <div className="mb-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Status Dropdown */}
            <div className="flex flex-col gap-2">
              <label 
                className="text-xs font-extrabold uppercase px-1" 
                style={{ fontFamily: 'DM Sans, sans-serif', color: '#1A2B5F', opacity: 0.6 }}
              >
                Listing Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#F4F6F9] border border-transparent rounded-lg px-4 py-3.5 text-sm font-bold text-[#1A2B5F] focus:outline-none focus:bg-white focus:border-[#00AEEF] transition-all cursor-pointer shadow-sm"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <option value="All">All Statuses</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="For Lease">For Lease</option>
              </select>
            </div>

            {/* Type Dropdown */}
            <div className="flex flex-col gap-2">
              <label 
                className="text-xs font-extrabold uppercase px-1" 
                style={{ fontFamily: 'DM Sans, sans-serif', color: '#1A2B5F', opacity: 0.6 }}
              >
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#F4F6F9] border border-transparent rounded-lg px-4 py-3.5 text-sm font-bold text-[#1A2B5F] focus:outline-none focus:bg-white focus:border-[#00AEEF] transition-all cursor-pointer shadow-sm"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <option value="All">All Property Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Locality Dropdown */}
            <div className="flex flex-col gap-2">
              <label 
                className="text-xs font-extrabold uppercase px-1" 
                style={{ fontFamily: 'DM Sans, sans-serif', color: '#1A2B5F', opacity: 0.6 }}
              >
                Locality
              </label>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full bg-[#F4F6F9] border border-transparent rounded-lg px-4 py-3.5 text-sm font-bold text-[#1A2B5F] focus:outline-none focus:bg-white focus:border-[#00AEEF] transition-all cursor-pointer shadow-sm"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <option value="All">All Localities</option>
                <option value="Adyar">Adyar</option>
                <option value="OMR">OMR</option>
                <option value="ECR">ECR</option>
                <option value="Besant Nagar">Besant Nagar</option>
                <option value="Thiruvanmiyur">Thiruvanmiyur</option>
              </select>
            </div>

          </div>

          {/* Reset Filters Option */}
          {(selectedStatus !== 'All' || selectedType !== 'All' || selectedLocality !== 'All') && (
            <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs font-bold text-[#00AEEF] hover:opacity-80 cursor-pointer transition-opacity"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <RefreshCw size={12} />
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <AnimatePresence mode="popLayout">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-12 text-center max-w-[600px] mx-auto mb-16 border shadow-sm"
            style={{ borderColor: 'rgba(0,0,0,0.04)' }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-6">
              <Home size={32} />
            </div>
            <h3 
              className="text-xl font-bold mb-2"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1A2B5F' }}
            >
              No properties found for this filter.
            </h3>
            <p 
              className="text-sm text-gray-500 mb-6"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              We have many offline and exclusive listings in our portfolio. Contact us directly and we will find your perfect match.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Reset Filters
              </button>
              <button
                onClick={handleWhatsAppChat}
                className="flex items-center justify-center gap-2 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wide transition-all hover:opacity-90 shadow-sm cursor-pointer"
                style={{ 
                  backgroundColor: '#25D366', 
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px'
                }}
              >
                <MessageCircle size={16} fill="white" />
                Contact Us Now
              </button>
            </div>
          </motion.div>
        )}

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-xl p-8 lg:p-10 flex flex-col md:flex-row justify-between items-center gap-6 border bg-white"
          style={{ 
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            borderColor: 'rgba(0,0,0,0.04)'
          }}
        >
          <div className="text-center md:text-left">
            <h3 
              className="text-lg lg:text-xl font-bold mb-2"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1A2B5F' }}
            >
              Looking for something specific?
            </h3>
            <p 
              className="text-sm text-gray-500 leading-relaxed max-w-xl"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              More listings are coming soon — contact us for off-market, premium, or direct properties not yet listed online.
            </p>
          </div>
          <button
            onClick={handleWhatsAppChat}
            className="flex items-center justify-center gap-2 text-white font-bold py-4 px-8 rounded-lg uppercase tracking-wider transition-all duration-300 hover:opacity-90 shadow-md cursor-pointer flex-shrink-0"
            style={{ 
              backgroundColor: '#25D366', 
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              boxShadow: '0 4px 15px rgba(37,211,102,0.2)'
            }}
          >
            <MessageCircle size={18} fill="white" />
            Chat with Us Now
          </button>
        </motion.div>

      </div>
    </section>
  );
}
