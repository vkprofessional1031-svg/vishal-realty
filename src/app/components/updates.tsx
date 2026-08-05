import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, MessageCircle, ArrowRight, Camera, X } from 'lucide-react';
import { getPublicUpdates, UpdateItem } from '../../supabase/updates';

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

export function Updates() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateItem | null>(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const data = await getPublicUpdates();
        setUpdates(data.slice(0, 9)); // Show latest 9 on homepage
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

  // If not loading and no updates exist yet, don't show an empty gap, or show graceful coming soon card
  if (!loading && updates.length === 0) {
    return null;
  }

  return (
    <section id="updates" className="py-20 bg-[#F4F6F9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00AEEF]/10 text-[#00AEEF] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} />
            <span>LATEST UPDATES</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight"
            style={{ color: '#1A2B5F', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            What's New at Vishal Realty
          </h2>

          <p 
            className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Fresh listings and updates.
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
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
        ) : (
          /* Updates Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {updates.map((item, idx) => (
                <motion.div
                  key={item.id}
                  onClick={() => setSelectedUpdate(item)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
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

        {/* Bottom CTA to Contact/WhatsApp */}
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/916383977798?text=Hello%20Vishal%20Realty%2C%20I%20would%20like%20to%20know%20about%20your%20latest%20property%20listings%20and%20updates."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-[#1A2B5F] hover:border-[#00AEEF] hover:text-[#00AEEF] text-sm font-bold shadow-sm transition-all"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <span>Have a property to list or sell? Talk to our Consultant</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

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
                <div className="relative w-full bg-black/95 flex items-center justify-center min-h-[260px] max-h-[60vh] sm:max-h-[65vh] overflow-hidden">
                  <img
                    src={selectedUpdate.image_url}
                    alt={selectedUpdate.caption}
                    className="w-full h-auto max-h-[60vh] sm:max-h-[65vh] object-contain select-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>

                {/* Caption, Date, and Actions */}
                <div className="p-6 sm:p-7 flex flex-col justify-between gap-4 bg-white">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-3">
                      <Clock size={14} />
                      <span>{formatRelativeTime(selectedUpdate.created_at)}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[#00AEEF] font-semibold">Live Update</span>
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
    </section>
  );
}

