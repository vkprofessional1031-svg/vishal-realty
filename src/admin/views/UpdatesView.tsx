import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  UploadCloud, 
  Image as ImageIcon, 
  Trash2, 
  Send, 
  Loader2, 
  X, 
  Clock, 
  Sparkles,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  getAllUpdates, 
  addUpdate, 
  deleteUpdate, 
  uploadUpdateImage, 
  UpdateItem 
} from '../../supabase/updates';

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
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export function UpdatesView() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [feedError, setFeedError] = useState<string | null>(null);

  // Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [propertyType, setPropertyType] = useState('residential');
  const [posting, setPosting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch all updates on mount
  const fetchUpdates = async () => {
    setLoadingFeed(true);
    setFeedError(null);
    try {
      const data = await getAllUpdates();
      setUpdates(data);
    } catch (err: any) {
      console.error('Error fetching updates:', err);
      setFeedError(err.message || 'Could not load updates. Check Supabase connection.');
    } finally {
      setLoadingFeed(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  // Process file selection (used by file input & drag-and-drop)
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPG, PNG, WebP).');
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // Handle file input select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClearFile = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle Post Submit
  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !caption.trim()) {
      toast.error('Please provide both an image and a caption.');
      return;
    }

    setPosting(true);
    try {
      // 1. Upload photo to Supabase storage
      const imageUrl = await uploadUpdateImage(selectedFile);

      // 2. Add record to updates table
      const [newRecord] = await addUpdate({
        image_url: imageUrl,
        caption: caption.trim(),
        property_type: propertyType
      });

      // 3. Optimistic UI update
      if (newRecord) {
        setUpdates(prev => [newRecord, ...prev]);
      } else {
        await fetchUpdates();
      }

      toast.success('Update published live to the website!');
      handleClearFile();
      setCaption('');
      setPropertyType('residential');
    } catch (err: any) {
      console.error('Error posting update:', err);
      toast.error(err.message || 'Failed to post update. Check Supabase connection & storage bucket.');
    } finally {
      setPosting(false);
    }
  };

  // Handle Delete Update
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this update from the public feed?')) {
      return;
    }

    setDeletingId(id);
    // Optimistic removal
    const previousUpdates = [...updates];
    setUpdates(prev => prev.filter(u => u.id !== id));

    try {
      await deleteUpdate(id);
      toast.success('Update deleted successfully.');
    } catch (err: any) {
      console.error('Error deleting update:', err);
      toast.error('Failed to delete update. Reverting...');
      setUpdates(previousUpdates);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Top Banner / Intro */}
      <div className="bg-gradient-to-r from-[#1A2B5F] to-[#243B80] rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00AEEF]">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-sans">Latest Updates Feed</h2>
            <p className="text-xs text-white/80 font-sans">
              Post quick photos and captions directly to the live website homepage.
            </p>
          </div>
        </div>
      </div>

      {/* Post Form Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-200">
        <h3 
          className="text-base font-bold text-[#1A2B5F] mb-4 flex items-center gap-2"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          <Camera size={18} className="text-[#00AEEF]" />
          Create New Update
        </h3>

        <form onSubmit={handlePost} className="space-y-4">
          {/* File Upload Area */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="update-image-input"
          />

          {!previewUrl ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group ${
                isDragging
                  ? 'border-[#00AEEF] bg-[#00AEEF]/10 scale-[1.01] shadow-inner'
                  : 'border-gray-300 hover:border-[#00AEEF] hover:bg-[#00AEEF]/5'
              }`}
            >
              <div 
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isDragging
                    ? 'bg-[#00AEEF] text-white scale-110 shadow-md'
                    : 'bg-gray-100 group-hover:bg-[#00AEEF]/10 text-gray-400 group-hover:text-[#00AEEF]'
                }`}
              >
                <UploadCloud size={28} />
              </div>
              <div>
                <p 
                  className={`text-sm font-bold transition-colors ${
                    isDragging ? 'text-[#00AEEF]' : 'text-gray-700 group-hover:text-[#1A2B5F]'
                  }`} 
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {isDragging ? 'Drop photo here to upload' : 'Tap to add a photo, or drag and drop here'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  JPG, PNG, or WebP (square or 4:5 portrait recommended)
                </p>
              </div>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black/5 aspect-[4/3] sm:aspect-[16/9] flex items-center justify-center group">
              <img
                src={previewUrl}
                alt="Upload preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-white text-[#1A2B5F] rounded-lg text-xs font-bold shadow-lg hover:bg-gray-100 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ImageIcon size={14} /> Change Photo
                </button>
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="p-2 bg-red-600 text-white rounded-lg text-xs font-bold shadow-lg hover:bg-red-700 transition-all cursor-pointer"
                  title="Remove Photo"
                >
                  <X size={16} />
                </button>
              </div>
              <button
                type="button"
                onClick={handleClearFile}
                className="sm:hidden absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Caption Field */}
          <div>
            <label 
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Caption
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's happening? e.g. 'Just listed — 3 BHK in Adyar, ready to move!' or 'Title verification completed for beachfront land in ECR.'"
              className="w-full p-3.5 bg-[#F4F6F9] border border-gray-200 rounded-xl text-sm text-[#1A2B5F] placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 transition-all resize-none"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>

          {/* Property Type Field */}
          <div>
            <label 
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-3.5 bg-[#F4F6F9] border border-gray-200 rounded-xl text-sm text-[#1A2B5F] focus:outline-none focus:bg-white focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 transition-all cursor-pointer"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={posting || !selectedFile || !caption.trim()}
            className="w-full py-3.5 px-6 rounded-xl text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#00AEEF',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {posting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Publishing to Website...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Post Update</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Feed List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 
            className="text-base font-bold text-[#1A2B5F] flex items-center gap-2"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            <span>Live Feed Updates</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-700 font-bold">
              {updates.length}
            </span>
          </h3>
          <button
            onClick={fetchUpdates}
            className="text-xs font-semibold text-[#00AEEF] hover:opacity-80 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw size={12} className={loadingFeed ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {feedError && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
            <span>{feedError}</span>
          </div>
        )}

        {loadingFeed ? (
          <div className="space-y-3">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm animate-pulse flex gap-4 items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : updates.length > 0 ? (
          <div className="space-y-3">
            {updates.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                  <img
                    src={item.image_url}
                    alt="Update thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback placeholder if image fails to load
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>

                {/* Content & Metadata */}
                <div className="flex-1 min-w-0">
                  <p 
                    className="text-sm font-medium text-[#1A2B5F] line-clamp-3 mb-2"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {item.caption}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-[#00AEEF]/10 text-[#00AEEF] text-[10px] font-bold uppercase tracking-wider">
                      {item.property_type || 'residential'}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                      <Clock size={12} />
                      <span>{formatRelativeTime(item.created_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                  title="Delete Update"
                >
                  {deletingId === item.id ? (
                    <Loader2 size={16} className="animate-spin text-red-600" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
              <Camera size={28} />
            </div>
            <h4 
              className="text-base font-bold text-[#1A2B5F] mb-1"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              No updates yet
            </h4>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Post your first update using the form above to share news on the homepage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
