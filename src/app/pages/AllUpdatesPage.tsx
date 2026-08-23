import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, MessageCircle, Camera, X, ArrowLeft, ArrowDown } from 'lucide-react';
import { Link } from 'react-router';
import { getPublicUpdates, UpdateItem } from '../../supabase/updates';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export function AllUpdatesPage() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateItem | null>(null);
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredUpdates = filter === 'all' 
    ? updates 
    : updates.filter(u => (u.property_type || 'residential') === filter);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const data = await getPublicUpdates();
        setUpdates(data);
      } catch (err) {
        console.warn('Updates feed load notice (Supabase not configured or empty):', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  // Handle Escape key and prevent background scroll while modal is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedUpdate(null);
      }
    };

    if (selectedUpdate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedUpdate]);

  const handleEnquireWhatsApp = (caption: string) => {
    const text = `Hello Vishal Realty, I saw this recent update on your website and would like more details: "${caption}"`;
    window.open(`https://wa.me/916383977798?text=${encodeURIComponent(text)}`, '_blank');
  };

  const displayedUpdates = filteredUpdates.slice(0, visibleCount);
  const hasMore = visibleCount < filteredUpdates.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back to Home */}
          <div className="mb-8">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#00AEEF] transition-colors"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00AEEF]/10 text-[#00AEEF] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={14} />
              <span>LATEST UPDATES</span>
            </div>

            <h1 
              className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight"
              style={{ color: '#1A2B5F', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              All Updates
            </h1>

            <p 
              className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium mb-8"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Browse all our latest listings and updates.
            </p>

            <div className="max-w-xs mx-auto">
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setVisibleCount(12); // Reset count on filter change
                }}
                className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#1A2B5F] focus:outline-none focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 transition-all cursor-pointer shadow-sm appearance-none"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%231A2B5F%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem top 50%',
                  backgroundSize: '0.65rem auto'
                }}
              >
                <option value="all">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>
          </div>

          {/* Loading Skeletons */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse flex flex-col">
                  <div className="bg-gray-200 aspect-[4/3] w-full" />
                  <div className="p-6 space-y-3 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-1/3 pt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredUpdates.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 shadow-sm max-w-2xl mx-auto">
              <h4 
                className="text-lg font-bold text-[#1A2B5F] mb-2"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                No {filter !== 'all' ? filter : ''} updates yet
              </h4>
              <p className="text-sm text-gray-500 mb-6">
                Check back soon!
              </p>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="px-6 py-2.5 bg-[#00AEEF] text-white font-bold rounded-lg text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Show All Types
                </button>
              )}
            </div>
          ) : (
            /* Updates Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <AnimatePresence>
                {displayedUpdates.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    onClick={() => setSelectedUpdate(item)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (idx % 12) * 0.08 }}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                  >
                    {/* Photo Container */}
                    <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <img
                        src={item.image_url}
                        alt={item.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                        <Camera size={12} className="text-[#00AEEF]" />
                        <span>Live Post</span>
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#00AEEF] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {item.property_type || 'residential'}
                      </div>
                    </div>

                    {/* Body & Caption */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <p 
                          className="text-gray-800 text-sm sm:text-base leading-relaxed mb-4 font-normal whitespace-pre-line line-clamp-3"
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                          {item.caption}
                        </p>
                      </div>

                      {/* Footer / Timestamp & Action */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                          <Clock size={13} />
                          <span>{formatRelativeTime(item.created_at)}</span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEnquireWhatsApp(item.caption);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00AEEF] hover:text-[#1A2B5F] transition-colors cursor-pointer"
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                          <MessageCircle size={14} />
                          <span>Enquire</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Load More Button */}
          {!loading && hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount(v => v + 12)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-gray-200 hover:border-[#00AEEF] text-[#1A2B5F] hover:text-[#00AEEF] rounded-xl font-bold shadow-sm transition-all"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Load More Updates
                <ArrowDown size={18} />
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedUpdate && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
            onClick={() => setSelectedUpdate(null)}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto border border-white/20"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedUpdate(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-sm"
                title="Close"
              >
                <X size={20} />
              </button>

              {/* Scrollable Content Container */}
              <div className="overflow-y-auto flex-1 flex flex-col">
                {/* Full image display with natural ratio */}
                <div style={{ display: 'flex', justifyContent: 'center', padding: '16px', backgroundColor: 'rgba(0,0,0,0.95)' }}>
                  <img
                    src={selectedUpdate.image_url}
                    alt={selectedUpdate.caption}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '80vh',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>

                {/* Caption, Date, and Actions */}
                <div className="p-6 sm:p-7 flex flex-col justify-between gap-4 bg-white">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-3 flex-wrap">
                      <Clock size={14} />
                      <span>{formatRelativeTime(selectedUpdate.created_at)}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[#00AEEF] font-semibold">Live Update</span>
                      <span className="text-gray-300">•</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00AEEF]/10 text-[#00AEEF] text-[10px] font-bold uppercase tracking-wider">
                        {selectedUpdate.property_type || 'residential'}
                      </span>
                    </div>

                    <p 
                      className="text-base sm:text-lg text-gray-800 leading-relaxed font-normal whitespace-pre-line"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {selectedUpdate.caption}
                    </p>
                  </div>

                  {/* WhatsApp Enquiry Button */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleEnquireWhatsApp(selectedUpdate.caption)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer bg-[#25D366] hover:bg-[#20bd5a]"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      <MessageCircle size={18} />
                      <span>Enquire on WhatsApp</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setSelectedUpdate(null)}
                      className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-sm font-semibold transition-colors cursor-pointer text-center"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
