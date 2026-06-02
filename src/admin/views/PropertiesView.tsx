import { useEffect, useState } from 'react';
import { getAllProperties, deleteProperty, updateProperty } from '../../supabase/properties';
import { Plus, Edit2, Eye, EyeOff, Trash2, RefreshCw, Home } from 'lucide-react';
import { toast } from 'sonner';

interface PropertiesViewProps {
  onAddClick: () => void;
  onEditClick: (id: string) => void;
}

export function PropertiesView({ onAddClick, onEditClick }: PropertiesViewProps) {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProperties = async () => {
    try {
      const data = await getAllProperties();
      setProperties(data || []);
    } catch (error) {
      console.error("Error loading properties:", error);
      toast.error("Failed to load properties. Check network.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProperties();
  };

  const handleToggleVisibility = async (id: string, currentVisibility: string) => {
    try {
      const nextVisibility = currentVisibility === 'hidden' ? 'live' : 'hidden';
      await updateProperty(id, { visibility: nextVisibility });
      toast.success(`Property marked as ${nextVisibility}!`);
      // Update local state directly
      setProperties(prev => prev.map(p => p.id === id ? { ...p, visibility: nextVisibility } : p));
    } catch (error) {
      console.error("Error toggling property visibility:", error);
      toast.error("Failed to toggle visibility.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you absolutely sure you want to delete "${title}"? This action cannot be undone.`)) {
      try {
        await deleteProperty(id);
        toast.success("Property deleted successfully!");
        setProperties(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting property:", error);
        toast.error("Failed to delete property.");
      }
    }
  };

  // Stats calculation using visibility field
  const totalCount = properties.length;
  const liveCount = properties.filter(p => p.visibility === 'live').length;
  const draftCount = properties.filter(p => p.visibility === 'draft').length;
  const hiddenCount = properties.filter(p => p.visibility === 'hidden').length;

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 
            className="text-2xl font-bold"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1A2B5F' }}
          >
            Properties
          </h2>
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 text-gray-400 hover:text-[#00AEEF] disabled:opacity-50 transition-colors"
          >
            <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>

        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-1.5 text-white font-bold py-2.5 px-4 rounded-lg uppercase tracking-wide cursor-pointer transition-opacity hover:opacity-90 shadow"
          style={{
            backgroundColor: '#00AEEF',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Property
        </button>
      </div>

      {/* Stats strip - horizontally scrollable on mobile */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 px-0.5">
        <div className="flex-shrink-0 bg-white px-4 py-2.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 text-xs font-bold text-[#1A2B5F]">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span>{liveCount} Live</span>
        </div>
        <div className="flex-shrink-0 bg-white px-4 py-2.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 text-xs font-bold text-[#1A2B5F]">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span>{draftCount} Draft</span>
        </div>
        <div className="flex-shrink-0 bg-white px-4 py-2.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 text-xs font-bold text-[#1A2B5F]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span>{hiddenCount} Hidden</span>
        </div>
        <div className="flex-shrink-0 bg-white px-4 py-2.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 text-xs font-bold text-[#1A2B5F]">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />
          <span>{totalCount} Total</span>
        </div>
      </div>

      {/* Property Cards List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse flex gap-4 h-24">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
          <Home size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-[#1A2B5F] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            No listings found
          </h3>
          <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Get started by adding your first premium real estate property.
          </p>
          <button
            onClick={onAddClick}
            className="inline-flex items-center gap-1.5 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wide cursor-pointer transition-opacity hover:opacity-90 shadow"
            style={{
              backgroundColor: '#00AEEF',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
            }}
          >
            <Plus size={18} strokeWidth={2.5} />
            Create First Listing
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map((property) => {
            const coverImage = property.images?.[0] || property.image;
            return (
              <div 
                key={property.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between gap-4 transition-all hover:shadow-md"
              >
                <div className="flex gap-4">
                  {/* Thumbnail Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100">
                    {coverImage ? (
                      <img src={coverImage} alt={property.title} className="w-full h-full object-cover" />
                    ) : (
                      <Home size={28} className="text-gray-300" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600 mb-1.5">
                      {property.type}
                    </span>
                    <h4 
                      className="font-bold text-sm text-[#1A2B5F] truncate mb-1"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    >
                      {property.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      <span className="text-[#00AEEF] font-bold">{property.price}</span>
                      <span>•</span>
                      <span>{property.area} Sq.ft</span>
                      <span>•</span>
                      <span className="capitalize">{property.locality}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-2.5">
                      {property.visibility === 'live' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Live
                        </span>
                      )}
                      {property.visibility === 'draft' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                          Draft
                        </span>
                      )}
                      {property.visibility === 'hidden' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Hidden
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Toolbar */}
                <div className="grid grid-cols-3 gap-2 border-t border-gray-50 pt-3">
                  <button
                    onClick={() => onEditClick(property.id)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-[#1A2B5F] rounded-lg transition-colors cursor-pointer"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleVisibility(property.id, property.visibility)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-[#1A2B5F] rounded-lg transition-colors cursor-pointer"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {property.visibility === 'hidden' ? <Eye size={14} /> : <EyeOff size={14} />}
                    {property.visibility === 'hidden' ? 'Show' : 'Hide'}
                  </button>
                  <button
                    onClick={() => handleDelete(property.id, property.title)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-red-600 bg-red-50/50 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
