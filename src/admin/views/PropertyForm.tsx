import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabase/client';
import { addProperty, updateProperty, uploadImage } from '../../supabase/properties';
import { 
  X, Upload, Plus, ChevronLeft, Loader2, Image as ImageIcon, FileText, CheckCircle, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface PropertyFormProps {
  propertyId?: string | null;
  onClose: () => void;
}

interface ImageUploadItem {
  id: string;
  file?: File;
  url?: string;
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
}

export function PropertyForm({ propertyId, onClose }: PropertyFormProps) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Apartment');
  const [listingStatus, setListingStatus] = useState('For Sale');
  const [visibility, setVisibility] = useState('live');
  const [locality, setLocality] = useState('Adyar');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [bhk, setBhk] = useState('');
  const [floor, setFloor] = useState('');
  const [furnished, setFurnished] = useState('Semi-Furnished');
  const [parking, setParking] = useState('');
  const [facing, setFacing] = useState('East');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);

  // Tag Input for Highlights
  const [highlightInput, setHighlightInput] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);

  // Photos State
  const [photos, setPhotos] = useState<ImageUploadItem[]>([]);
  // Floor Plan / Sketch State
  const [floorPlan, setFloorPlan] = useState<ImageUploadItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const floorPlanInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing property details for editing
  useEffect(() => {
    if (!propertyId) return;

    const fetchPropertyDetails = async () => {
      setFetching(true);
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', propertyId)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setTitle(data.title || '');
          setType(data.type || 'Apartment');
          setListingStatus(data.status || 'For Sale'); // Supabase stores transaction type in 'status'
          setVisibility(data.visibility || 'live');
          setLocality(data.locality || 'Adyar');
          setAddress(data.address || '');
          setPrice(data.price || '');
          setArea(data.area ? String(data.area) : '');
          setBhk(data.bhk ? String(data.bhk) : '');
          setFloor(data.floor || '');
          setFurnished(data.furnished || 'Semi-Furnished');
          setParking(data.parking || '');
          setFacing(data.facing || 'East');
          setDescription(data.description || '');
          setFeatured(data.featured || false);
          setHighlights(data.highlights || []);

          // Map existing images
          if (data.images && Array.isArray(data.images)) {
            const list: ImageUploadItem[] = data.images.map((imgUrl: string, idx: number) => ({
              id: `img-${idx}-${Date.now()}`,
              url: imgUrl,
              progress: 100,
              status: 'success'
            }));
            setPhotos(list);
          } else if (data.image) {
            // legacy fallback
            setPhotos([{
              id: 'legacy-img',
              url: data.image,
              progress: 100,
              status: 'success'
            }]);
          }

          if (data.floor_plan) {
            setFloorPlan({
              id: 'floorPlan-existing',
              url: data.floor_plan,
              progress: 100,
              status: 'success'
            });
          }
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        toast.error("Failed to load property details.");
        onClose();
      } finally {
        setFetching(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId, onClose]);

  // Highlights handlers
  const handleAddHighlight = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tag = highlightInput.trim();
      if (!tag) return;
      if (highlights.length >= 6) {
        toast.error("You can add a maximum of 6 highlights.");
        return;
      }
      if (highlights.includes(tag)) {
        toast.error("Highlight already exists.");
        return;
      }
      setHighlights([...highlights, tag]);
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (idx: number) => {
    setHighlights(highlights.filter((_, i) => i !== idx));
  };

  // Multiple photos picker
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    if (photos.length + files.length > 8) {
      toast.error("You can upload a maximum of 8 photos.");
      return;
    }

    const newItems: ImageUploadItem[] = files.map((file, idx) => ({
      id: `new-${idx}-${Date.now()}-${file.name}`,
      file,
      url: URL.createObjectURL(file),
      progress: 0,
      status: 'idle'
    }));

    setPhotos([...photos, ...newItems]);
    // reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  // Single Floor Plan picker
  const handleFloorPlanSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setFloorPlan({
      id: `floorPlan-${Date.now()}`,
      file,
      url: URL.createObjectURL(file),
      progress: 0,
      status: 'idle'
    });
    // reset file input
    if (floorPlanInputRef.current) floorPlanInputRef.current.value = '';
  };

  const handleRemoveFloorPlan = () => {
    setFloorPlan(null);
  };

  // Submit Handler
  const handleSubmit = async (publishVisibility: 'live' | 'draft') => {
    if (!title || !type || !listingStatus || !locality || !address || !price || !area || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading(propertyId ? "Updating property..." : "Creating property...");

    try {
      // 1. Upload Photos with Progress updates
      const uploadedImageUrls: string[] = [];
      const updatedPhotos = [...photos];

      for (let i = 0; i < updatedPhotos.length; i++) {
        const item = updatedPhotos[i];
        if (item.file) {
          try {
            setPhotos(prev => prev.map(p => p.id === item.id ? { ...p, status: 'uploading', progress: 30 } : p));
            
            // Upload path format: properties/{timestamp}-{filename}
            const cleanFileName = item.file.name.replace(/\s+/g, '_');
            const path = `properties/${Date.now()}-${cleanFileName}`;
            
            setPhotos(prev => prev.map(p => p.id === item.id ? { ...p, progress: 60 } : p));
            
            const downloadUrl = await uploadImage(item.file, path);
            
            setPhotos(prev => prev.map(p => p.id === item.id ? { ...p, progress: 100, status: 'success', url: downloadUrl } : p));
            uploadedImageUrls.push(downloadUrl);
          } catch (uploadError) {
            console.error("Error uploading photo:", uploadError);
            setPhotos(prev => prev.map(p => p.id === item.id ? { ...p, status: 'error' } : p));
            throw new Error(`Failed to upload ${item.file.name}`);
          }
        } else if (item.url) {
          uploadedImageUrls.push(item.url);
        }
      }

      // 2. Upload Floor plan if any
      let uploadedFloorPlanUrl = '';
      if (floorPlan) {
        if (floorPlan.file) {
          try {
            setFloorPlan(prev => prev ? { ...prev, status: 'uploading', progress: 45 } : null);
            const cleanFileName = floorPlan.file.name.replace(/\s+/g, '_');
            const path = `floorplans/${Date.now()}-${cleanFileName}`;
            const downloadUrl = await uploadImage(floorPlan.file, path);
            setFloorPlan(prev => prev ? { ...prev, progress: 100, status: 'success', url: downloadUrl } : null);
            uploadedFloorPlanUrl = downloadUrl;
          } catch (uploadError) {
            console.error("Error uploading floor plan:", uploadError);
            setFloorPlan(prev => prev ? { ...prev, status: 'error' } : null);
            throw new Error("Failed to upload Floor Plan image");
          }
        } else if (floorPlan.url) {
          uploadedFloorPlanUrl = floorPlan.url;
        }
      }

      // 3. Save Document to Supabase
      const dataPayload = {
        title,
        type,
        status: listingStatus, // Supabase stores 'For Sale' in 'status'
        visibility: publishVisibility, // live | draft
        locality,
        address,
        price,
        area: Number(area),
        bhk: (type === 'Apartment' || type === 'Villa') && bhk ? Number(bhk) : null,
        floor: floor || null,
        furnished,
        parking: parking || '',
        facing,
        description,
        featured,
        highlights,
        images: uploadedImageUrls,
        floor_plan: uploadedFloorPlanUrl || null
      };

      if (propertyId) {
        await updateProperty(propertyId, dataPayload);
        toast.success("Listing updated successfully!", { id: toastId });
      } else {
        await addProperty(dataPayload);
        toast.success("New listing published successfully!", { id: toastId });
      }

      onClose();
    } catch (err: any) {
      console.error("Form submit error:", err);
      toast.error(err.message || "An error occurred while saving the property listing.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-8">
        <Loader2 className="w-10 h-10 animate-spin text-[#1A2B5F] mb-4" />
        <span className="text-sm font-semibold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
          Retrieving property information...
        </span>
      </div>
    );
  }

  // Check if BHK is applicable
  const isBhkApplicable = type === 'Apartment' || type === 'Villa';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden pb-12">
      {/* Form Navigation Header */}
      <div className="bg-white border-b border-gray-100 sticky top-[64px] z-30 px-4 py-4 flex items-center gap-3">
        <button 
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 bg-gray-50 rounded-full hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <div>
          <h3 
            className="text-lg font-extrabold text-[#1A2B5F]"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            {propertyId ? "Edit Listing" : "New Property Listing"}
          </h3>
          <p className="text-xs text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {propertyId ? "Modify property details and save updates" : "Provide information to showcase your new asset"}
          </p>
        </div>
      </div>

      {/* Main stacked form */}
      <div className="p-4 space-y-6">
        
        {/* Section 1: Basic Information */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">
            Basic Information
          </h4>

          {/* Property Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1A2B5F]">
              Property Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Spacious 3 BHK Apartment in Adyar"
              className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all text-[#2D2D2D]"
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
            />
          </div>

          {/* Property Type and Listing Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:border-[#00AEEF] text-[#2D2D2D]"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
              >
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Listing Status <span className="text-red-500">*</span>
              </label>
              <select
                value={listingStatus}
                onChange={(e) => setListingStatus(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:border-[#00AEEF] text-[#2D2D2D]"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
              >
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="For Lease">For Lease</option>
              </select>
            </div>
          </div>

          {/* Locality & Pricing */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Locality <span className="text-red-500">*</span>
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:border-[#00AEEF] text-[#2D2D2D]"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
              >
                <option value="Adyar">Adyar</option>
                <option value="OMR">OMR</option>
                <option value="ECR">ECR</option>
                <option value="Besant Nagar">Besant Nagar</option>
                <option value="Thiruvanmiyur">Thiruvanmiyur</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Price <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. ₹2.85 Crore"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all text-[#2D2D2D]"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Full Address */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1A2B5F]">
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea 
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full landmark address of the property..."
              className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all text-[#2D2D2D]"
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
            />
          </div>
        </div>

        {/* Section 2: Technical Specifications */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">
            Property Specifications
          </h4>

          {/* Area & BHK Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Area (sq.ft) <span className="text-red-500">*</span>
              </label>
              <input 
                type="number"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. 1850"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all text-[#2D2D2D]"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
              />
            </div>

            {isBhkApplicable ? (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#1A2B5F]">
                  BHK
                </label>
                <input 
                  type="number"
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all text-[#2D2D2D]"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
                />
              </div>
            ) : (
              <div className="space-y-1.5 bg-gray-50 border border-dashed border-gray-200 rounded-lg p-2.5 flex items-center justify-center">
                <span className="text-[11px] text-gray-400 text-center font-bold uppercase tracking-wider">
                  BHK N/A for {type}
                </span>
              </div>
            )}
          </div>

          {/* Floor & Furnished */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Floor Number
              </label>
              <input 
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="e.g. 2nd of 4"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all text-[#2D2D2D]"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Furnishing
              </label>
              <select
                value={furnished}
                onChange={(e) => setFurnished(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:border-[#00AEEF] text-[#2D2D2D]"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
              >
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Bare Shell">Bare Shell</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </div>
          </div>

          {/* Parking & Facing */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Parking Spaces
              </label>
              <input 
                type="text"
                value={parking}
                onChange={(e) => setParking(e.target.value)}
                placeholder="e.g. 2 Covered"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all text-[#2D2D2D]"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Facing
              </label>
              <select
                value={facing}
                onChange={(e) => setFacing(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:border-[#00AEEF] text-[#2D2D2D]"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
              >
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="North-East">North-East</option>
                <option value="North-West">North-West</option>
                <option value="South-East">South-East</option>
                <option value="South-West">South-West</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1A2B5F]">
              Property Description <span className="text-red-500">*</span>
            </label>
            <textarea 
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive marketing description for clients..."
              className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all text-[#2D2D2D]"
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
            />
          </div>

          {/* Highlights Tag System */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1A2B5F]">
              Highlights & Core Features (Max 6)
            </label>
            <input 
              type="text"
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              onKeyDown={handleAddHighlight}
              placeholder="Type a highlight and press Enter..."
              className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all text-[#2D2D2D]"
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
            />
            
            {/* Render selected Highlights */}
            {highlights.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {highlights.map((hl, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1 bg-gray-50 text-[#1A2B5F] px-2.5 py-1 rounded-full text-xs font-bold border border-gray-200"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {hl}
                    <button 
                      type="button"
                      onClick={() => handleRemoveHighlight(idx)}
                      className="w-4 h-4 rounded-full bg-gray-200/60 flex items-center justify-center text-gray-500 hover:bg-gray-300/80 active:scale-90 transition-all cursor-pointer"
                    >
                      <X size={10} strokeWidth={3} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Featured Listing Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-100 rounded-xl mt-4">
            <div>
              <span className="block text-xs font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Show on Featured Grid
              </span>
              <span className="text-[10px] text-gray-400 font-semibold" style={{ fontFamily: 'DM Sans' }}>
                Promotes listing on the landing page showcase grid
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-sky-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00AEEF]"></div>
            </label>
          </div>
        </div>

        {/* Section 3: Photo Upload and Previews */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">
            Property Photo Gallery
          </h4>

          {/* Multiple Photo upload picker */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 hover:border-[#00AEEF] rounded-xl p-6 text-center cursor-pointer transition-colors bg-gray-50 flex flex-col items-center justify-center gap-2"
          >
            <ImageIcon size={32} className="text-gray-400" />
            <div>
              <span className="block text-sm font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Tap to upload photos
              </span>
              <span className="text-[10px] text-gray-400 font-semibold" style={{ fontFamily: 'DM Sans' }}>
                Accepts JPG, PNG, WEBP. Maximum 8 photos. First is cover.
              </span>
            </div>
            <input 
              type="file" 
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoSelect}
              className="hidden"
            />
          </div>

          {/* Render Photo Previews */}
          {photos.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {photos.map((item, idx) => (
                <div 
                  key={item.id}
                  className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group"
                >
                  <img src={item.url} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                  
                  {/* Overlay for uploads progress */}
                  {item.status === 'uploading' && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-1">
                      <Loader2 size={16} className="animate-spin text-white mb-1" />
                      <span className="text-[8px] text-white font-bold">{item.progress}%</span>
                    </div>
                  )}

                  {/* Success indicator */}
                  {item.status === 'success' && item.progress === 100 && (
                    <div className="absolute top-1 left-1 bg-green-500 text-white rounded-full p-0.5 shadow-md">
                      <CheckCircle size={10} strokeWidth={3} />
                    </div>
                  )}

                  {/* Error Indicator */}
                  {item.status === 'error' && (
                    <div className="absolute inset-0 bg-red-500/70 flex flex-col items-center justify-center p-1">
                      <AlertCircle size={14} className="text-white mb-0.5" />
                      <span className="text-[8px] text-white font-extrabold uppercase">Fail</span>
                    </div>
                  )}

                  {/* Index Indicator (First image is Cover) */}
                  <span className="absolute bottom-1 right-1 px-1 bg-black/60 rounded text-[9px] text-white font-bold uppercase">
                    {idx === 0 ? "Cover" : `#${idx + 1}`}
                  </span>

                  {/* Dismiss Button */}
                  <button 
                    type="button"
                    onClick={() => handleRemovePhoto(item.id)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center active:scale-90 cursor-pointer"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 4: Floor Plan Upload */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">
            Floor Plan or Sketch
          </h4>

          {floorPlan ? (
            <div className="relative border border-gray-200 rounded-xl overflow-hidden aspect-[16/10] bg-gray-50 max-w-[280px]">
              <img src={floorPlan.url} alt="Floor plan" className="w-full h-full object-contain" />
              
              {/* Progress Overlay */}
              {floorPlan.status === 'uploading' && (
                <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center">
                  <Loader2 size={24} className="animate-spin text-white mb-1.5" />
                  <span className="text-xs text-white font-bold">{floorPlan.progress}%</span>
                </div>
              )}

              {/* Close Button */}
              <button 
                type="button"
                onClick={handleRemoveFloorPlan}
                className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center active:scale-90 cursor-pointer shadow-md"
              >
                <X size={14} strokeWidth={2.5} />
              </button>

              <span className="absolute bottom-2.5 left-2.5 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                Floor Plan / Sketch
              </span>
            </div>
          ) : (
            <div 
              onClick={() => floorPlanInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 hover:border-[#00AEEF] rounded-xl p-5 text-center cursor-pointer transition-colors bg-gray-50 flex flex-col items-center justify-center gap-1.5"
            >
              <FileText size={28} className="text-gray-400" />
              <div>
                <span className="block text-xs font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  Tap to upload floor plan or sketch
                </span>
                <span className="text-[9px] text-gray-400 font-semibold" style={{ fontFamily: 'DM Sans' }}>
                  Single image showing dimensions (Optional)
                </span>
              </div>
              <input 
                type="file"
                accept="image/*"
                ref={floorPlanInputRef}
                onChange={handleFloorPlanSelect}
                className="hidden"
              />
            </div>
          )}
        </div>

      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white px-4 py-3.5 border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSubmit('draft')}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg font-bold border border-gray-300 uppercase tracking-wider text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-75 transition-colors cursor-pointer"
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px' }}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : null}
          Save as Draft
        </button>
        <button
          type="button"
          onClick={() => handleSubmit('live')}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 px-4 rounded-lg uppercase tracking-wider disabled:opacity-75 transition-opacity hover:opacity-90 shadow-md cursor-pointer"
          style={{ 
            backgroundColor: '#00AEEF',
            fontFamily: 'DM Sans, sans-serif', 
            fontSize: '12px' 
          }}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : null}
          Publish Live
        </button>
      </div>
    </div>
  );
}
