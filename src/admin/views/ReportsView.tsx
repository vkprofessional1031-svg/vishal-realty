import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabase/client';
import { 
  FileText, Check, ChevronRight, ChevronLeft, Download, Send, Copy, RefreshCw, Home,
  Image as ImageIcon, User, Calendar, Phone, Mail, Link2, CheckSquare, Square, X
} from 'lucide-react';
import { getPublicProperties, getReports, saveReport } from '../../supabase/properties';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../assets/logo.png';

interface ReportHistoryItem {
  id: string;
  property_title: string;
  client_name: string;
  created_at: string;
  property_id: string;
  price?: string;
  locality?: string;
}

export function ReportsView() {
  const [step, setStep] = useState(1);
  const [liveProperties, setLiveProperties] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  
  // Step 2 & 3 state
  const [clientName, setClientName] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [reportPrice, setReportPrice] = useState('');
  const [reportArea, setReportArea] = useState('');
  const [reportBhk, setReportBhk] = useState('');
  const [reportFloor, setReportFloor] = useState('');
  const [reportAddress, setReportAddress] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportRemarks, setReportRemarks] = useState('');
  
  const [reportPhotos, setReportPhotos] = useState<string[]>([]);
  const [reportFloorPlan, setReportFloorPlan] = useState<string>('');
  
  // Checklist for highlights
  const [highlightsChecklist, setHighlightsChecklist] = useState<{ text: string; checked: boolean }[]>([]);
  
  // Template Selector
  const [selectedTemplate, setSelectedTemplate] = useState<'simple' | 'detailed' | 'premium'>('detailed');

  // History state
  const [reportHistory, setReportHistory] = useState<ReportHistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingProps, setLoadingProps] = useState(true);
  const [generating, setGenerating] = useState(false);

  const reportPreviewRef = useRef<HTMLDivElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);
  const floorPlanInputRef = useRef<HTMLInputElement>(null);

  // Fetch properties and history
  const fetchData = async () => {
    try {
      setLoadingProps(true);
      const props = await getPublicProperties();
      setLiveProperties(props || []);
    } catch (err) {
      console.error("Error fetching live properties:", err);
      toast.error("Failed to load property list.");
    } finally {
      setLoadingProps(false);
    }

    try {
      setLoadingHistory(true);
      const historyList = await getReports();
      setReportHistory(historyList || []);
    } catch (err) {
      console.error("Error fetching report history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Autofill Details on Property Select
  const handlePropertySelect = (propId: string) => {
    if (propId === 'fresh') {
      setSelectedProperty({ id: 'fresh', title: 'Fresh Property' });
      setReportTitle('');
      setReportPrice('');
      setReportArea('');
      setReportBhk('');
      setReportFloor('');
      setReportAddress('');
      setReportDescription('');
      setReportPhotos([]);
      setReportFloorPlan('');
      setHighlightsChecklist([]);
      return;
    }

    const prop = liveProperties.find(p => p.id === propId);
    if (!prop) return;

    setSelectedProperty(prop);
    setReportTitle(prop.title || '');
    setReportPrice(prop.price || '');
    setReportArea(prop.area ? String(prop.area) : '');
    setReportBhk(prop.bhk ? String(prop.bhk) : '');
    setReportFloor(prop.floor || '');
    setReportAddress(prop.address || '');
    setReportDescription(prop.description || '');
    
    // Set photos
    if (prop.images && Array.isArray(prop.images)) {
      setReportPhotos(prop.images);
    } else if (prop.image) {
      setReportPhotos([prop.image]);
    } else {
      setReportPhotos([]);
    }

    // Set Floor Plan
    setReportFloorPlan(prop.floor_plan || '');

    // Map highlights to checklist
    if (prop.highlights && Array.isArray(prop.highlights)) {
      setHighlightsChecklist(prop.highlights.map(h => ({ text: h, checked: true })));
    } else {
      setHighlightsChecklist([]);
    }
  };

  // Add custom photo for report
  const handlePhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const fileUrls = files.map(file => URL.createObjectURL(file));
    setReportPhotos(prev => [...prev, ...fileUrls].slice(0, 8));
  };

  // Add custom floor plan for report
  const handleFloorPlanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setReportFloorPlan(URL.createObjectURL(file));
  };

  const handleToggleHighlight = (idx: number) => {
    setHighlightsChecklist(prev => prev.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item));
  };

  const handleAddCustomHighlight = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (highlightsChecklist.length >= 8) {
      toast.error("Max 8 highlights on PDF report");
      return;
    }
    if (highlightsChecklist.some(h => h.text.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Highlight already exists");
      return;
    }
    setHighlightsChecklist([...highlightsChecklist, { text: trimmed, checked: true }]);
  };

  const getSelectedHighlights = () => {
    return highlightsChecklist.filter(h => h.checked).map(h => h.text);
  };

  // PDF Compilation & Download
  const generatePDF = async () => {
    if (!reportPreviewRef.current) return;
    setGenerating(true);
    const toastId = toast.loading("Compiling high-fidelity A4 PDF report...");

    try {
      const element = reportPreviewRef.current;
      
      // Wait for image elements to load in the DOM
      const imgElements = element.getElementsByTagName('img');
      const promises = Array.from(imgElements).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // resolve anyway to avoid blocking
        });
      });
      await Promise.all(promises);

      // Render the DOM element to canvas using html2canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Retains high text density on retina displays
        useCORS: true, // Crucial for loading Supabase Storage secure public URLs
        logging: false,
        backgroundColor: '#FFFFFF',
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Standard A4 dimensions: 210mm x 297mm
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Scale canvas to A4 dimensions
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add to PDF document (handles multi-page overflows cleanly)
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }

      const formattedName = clientName ? `_${clientName.replace(/\s+/g, '_')}` : '';
      pdf.save(`Property_Report${formattedName}.pdf`);

      // Write Log to Supabase Reports table
      await saveReport({
        property_title: reportTitle || 'Custom Report',
        client_name: clientName || 'General Client',
        property_id: selectedProperty?.id === 'fresh' ? null : (selectedProperty?.id || null),
        template: selectedTemplate,
        created_at: new Date().toISOString()
      });

      toast.success("PDF Report downloaded successfully!", { id: toastId });
      fetchData(); // Refresh history
    } catch (error) {
      console.error("PDF generator failure:", error);
      toast.error("Failed to generate PDF. Make sure all images have loaded correctly.", { id: toastId });
    } finally {
      setGenerating(false);
    }
  };

  // Sharing links
  const handleWhatsAppShare = () => {
    const text = `Please find the property report for *${reportTitle || 'Premium Property'}* prepared by Kishore Kumar Vigneswaran, Vishal Realty.\n\n*Price:* ${reportPrice}\n*Area:* ${reportArea} Sq.ft\n\nContact us at +91 63839 77798 for more details or to schedule a viewing.`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyShareLink = () => {
    const text = `Please find the property report for ${reportTitle || 'Premium Property'} prepared by Vishal Realty. Contact +91 63839 77798.`;
    navigator.clipboard.writeText(text);
    toast.success("Handoff text copied to clipboard!");
  };

  // Quick re-trigger from history log
  const handleQuickRegenerate = (item: ReportHistoryItem) => {
    setClientName(item.client_name || '');
    setReportTitle(item.property_title || '');
    setReportPrice(item.price || '');
    
    // Pre-select live property if exists
    if (item.property_id) {
      handlePropertySelect(item.property_id);
    } else {
      handlePropertySelect('fresh');
      setReportTitle(item.property_title || '');
      setReportPrice(item.price || '');
    }
    
    setStep(3); // Jump straight to details
    toast.success(`Loaded settings for ${item.client_name}!`);
  };

  return (
    <div className="space-y-6">
      {/* View Title */}
      <div>
        <h2 
          className="text-2xl font-bold text-[#1A2B5F]"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Report Generator
        </h2>
        <p className="text-xs text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Create and compile custom property PDF files for clients directly from your phone.
        </p>
      </div>

      {/* Step Wizard Indicator Strip */}
      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between text-[11px] font-bold text-gray-400" style={{ fontFamily: 'Plus Jakarta Sans' }}>
        <div className={`flex items-center gap-1 ${step >= 1 ? 'text-[#00AEEF]' : ''}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
          <span>Property</span>
        </div>
        <ChevronRight size={12} className="text-gray-300" />
        <div className={`flex items-center gap-1 ${step >= 2 ? 'text-[#00AEEF]' : ''}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
          <span>Photos</span>
        </div>
        <ChevronRight size={12} className="text-gray-300" />
        <div className={`flex items-center gap-1 ${step >= 3 ? 'text-[#00AEEF]' : ''}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
          <span>Details</span>
        </div>
        <ChevronRight size={12} className="text-gray-300" />
        <div className={`flex items-center gap-1 ${step >= 4 ? 'text-[#00AEEF]' : ''}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">4</span>
          <span>Generate</span>
        </div>
      </div>

      {/* Wizard Step Boxes */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 min-h-[300px]">
        
        {/* STEP 1: Select Property */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-extrabold text-[#00AEEF] uppercase tracking-wider block mb-1">
                Step 1 of 4
              </span>
              <h3 className="text-base font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Select Property Data Source
              </h3>
              <p className="text-xs text-gray-500" style={{ fontFamily: 'DM Sans' }}>
                Pick one of your active listings to pre-fill the report, or start with a fresh blank template.
              </p>
            </div>

            {loadingProps ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#1A2B5F]" />
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-[#1A2B5F]">
                  Select Listing:
                </label>
                <select
                  onChange={(e) => handlePropertySelect(e.target.value)}
                  value={selectedProperty ? selectedProperty.id : ''}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:border-[#00AEEF] text-[#2D2D2D]"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }}
                >
                  <option value="" disabled>-- Choose a Property --</option>
                  <option value="fresh">★ Start Fresh (Blank template)</option>
                  {liveProperties.map(p => (
                    <option key={p.id} value={p.id}>{p.title} ({p.price})</option>
                  ))}
                </select>

                {selectedProperty && (
                  <div className="p-3 bg-sky-50/50 border border-sky-100 rounded-xl flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 bg-white rounded-lg border border-sky-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {selectedProperty.images?.[0] || selectedProperty.image ? (
                        <img src={selectedProperty.images?.[0] || selectedProperty.image} className="w-full h-full object-cover" />
                      ) : (
                        <Home size={18} className="text-sky-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-bold text-[#1A2B5F] truncate">
                        {selectedProperty.title || "Custom Draft"}
                      </span>
                      <span className="text-[10px] text-gray-500 font-semibold uppercase">
                        {selectedProperty.locality || "Chennai"} • {selectedProperty.price || "Price on Request"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Next buttons */}
            <div className="pt-4 flex justify-end">
              <button
                disabled={!selectedProperty}
                onClick={() => setStep(2)}
                className="flex items-center gap-1 px-5 py-3 rounded-lg text-white font-bold uppercase tracking-wider transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer text-xs"
                style={{ backgroundColor: '#00AEEF', fontFamily: 'DM Sans' }}
              >
                Next Step
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Add Photos */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-extrabold text-[#00AEEF] uppercase tracking-wider block mb-1">
                Step 2 of 4
              </span>
              <h3 className="text-base font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Property Photos & Sketches
              </h3>
              <p className="text-xs text-gray-500" style={{ fontFamily: 'DM Sans' }}>
                Add property photos and floor plans. These will be automatically rendered in the PDF document layouts.
              </p>
            </div>

            {/* Multiple Photos section */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Property Photos (Max 8)
              </label>
              
              <div 
                onClick={() => photosInputRef.current?.click()}
                className="border border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50 cursor-pointer hover:border-[#00AEEF] flex items-center justify-center gap-2"
              >
                <ImageIcon size={20} className="text-gray-400" />
                <span className="text-xs font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  Tap to add more photos
                </span>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  ref={photosInputRef} 
                  onChange={handlePhotosUpload} 
                  className="hidden" 
                />
              </div>

              {/* Photo Previews grid */}
              {reportPhotos.length > 0 ? (
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {reportPhotos.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-100">
                      <img src={url} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setReportPhotos(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="block text-[11px] text-gray-400 italic">No photos added yet. Select photos to display in the PDF report.</span>
              )}
            </div>

            {/* Floor plan section */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Floor Plan / Sketch
              </label>

              {reportFloorPlan ? (
                <div className="relative aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 max-w-[200px]">
                  <img src={reportFloorPlan} className="w-full h-full object-contain" />
                  <button 
                    onClick={() => setReportFloorPlan('')}
                    className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => floorPlanInputRef.current?.click()}
                  className="border border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50 cursor-pointer hover:border-[#00AEEF] flex items-center justify-center gap-2"
                >
                  <FileText size={20} className="text-gray-400" />
                  <span className="text-xs font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    Tap to add floor plan or sketch
                  </span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={floorPlanInputRef} 
                    onChange={handleFloorPlanUpload} 
                    className="hidden" 
                  />
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 px-4 py-3 rounded-lg border border-gray-300 font-bold uppercase tracking-wider cursor-pointer text-xs text-gray-500 bg-white"
                style={{ fontFamily: 'DM Sans' }}
              >
                <ChevronLeft size={14} />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-1 px-5 py-3 rounded-lg text-white font-bold uppercase tracking-wider cursor-pointer text-xs"
                style={{ backgroundColor: '#00AEEF', fontFamily: 'DM Sans' }}
              >
                Next Step
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Report Details */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-extrabold text-[#00AEEF] uppercase tracking-wider block mb-1">
                Step 3 of 4
              </span>
              <h3 className="text-base font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Remarks, Details & Styling
              </h3>
              <p className="text-xs text-gray-500" style={{ fontFamily: 'DM Sans' }}>
                Fill in special remarks for your client and configure highlight checkmarks.
              </p>
            </div>

            {/* Client & Remarks */}
            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1A2B5F]">
                  Prepared For (Client Name)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF]"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>

              {/* Property Details Override inputs */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#1A2B5F]">
                    Override Title
                  </label>
                  <input
                    type="text"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base text-[#2D2D2D]"
                    style={{ fontSize: '16px' }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#1A2B5F]">
                    Override Price
                  </label>
                  <input
                    type="text"
                    value={reportPrice}
                    onChange={(e) => setReportPrice(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base text-[#2D2D2D]"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>

              {/* Remarks Area */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1A2B5F]">
                  Agent Remarks (Special Client Notes)
                </label>
                <textarea
                  rows={3}
                  value={reportRemarks}
                  onChange={(e) => setReportRemarks(e.target.value)}
                  placeholder="e.g. Ramesh, this villa is situated in Palavakkam's most premium enclave, offering 100% security and custom beach access."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF]"
                  style={{ fontSize: '16px' }}
                />
              </div>
            </div>

            {/* Highlights Checklist */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                Select highlights to show in PDF:
              </label>

              {highlightsChecklist.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {highlightsChecklist.map((hl, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleToggleHighlight(idx)}
                      className={`flex items-center gap-2 p-2.5 border rounded-lg text-xs font-bold text-left transition-colors cursor-pointer ${
                        hl.checked 
                          ? 'border-[#00AEEF] bg-sky-50/20 text-[#1A2B5F]' 
                          : 'border-gray-200 bg-white text-gray-400'
                      }`}
                      style={{ fontFamily: 'DM Sans' }}
                    >
                      {hl.checked ? (
                        <CheckSquare size={16} className="text-[#00AEEF]" />
                      ) : (
                        <Square size={16} className="text-gray-300" />
                      )}
                      <span className="truncate">{hl.text}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <span className="block text-[11px] text-gray-400 italic">No highlights defined. Type below to add custom highlights:</span>
              )}

              {/* Add Custom Highlight Input */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  id="customHighlightInput"
                  placeholder="Add custom highlight..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const target = e.currentTarget;
                      handleAddCustomHighlight(target.value);
                      target.value = '';
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('customHighlightInput') as HTMLInputElement;
                    if (input) {
                      handleAddCustomHighlight(input.value);
                      input.value = '';
                    }
                  }}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Template Selector */}
            <div className="space-y-2.5 pt-2">
              <label className="block text-xs font-bold text-[#1A2B5F]">
                PDF Report Template Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['simple', 'detailed', 'premium'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTemplate(t)}
                    className={`py-3 px-2.5 border rounded-lg text-xs font-extrabold uppercase tracking-wider text-center cursor-pointer transition-all ${
                      selectedTemplate === t 
                        ? 'border-[#1A2B5F] bg-[#1A2B5F] text-white shadow-md' 
                        : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1 px-4 py-3 rounded-lg border border-gray-300 font-bold uppercase tracking-wider cursor-pointer text-xs text-gray-500 bg-white"
                style={{ fontFamily: 'DM Sans' }}
              >
                <ChevronLeft size={14} />
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-1 px-5 py-3 rounded-lg text-white font-bold uppercase tracking-wider cursor-pointer text-xs"
                style={{ backgroundColor: '#00AEEF', fontFamily: 'DM Sans' }}
              >
                Generate Report
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Generate & Share */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center py-4 bg-green-50/50 border border-green-100 rounded-2xl flex flex-col items-center">
              <CheckCircleComponent className="w-10 h-10 text-green-500 mb-2 animate-bounce" />
              <h3 className="text-base font-extrabold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Your PDF Report is Ready!
              </h3>
              <p className="text-xs text-gray-500 max-w-[280px] mx-auto mt-0.5" style={{ fontFamily: 'DM Sans' }}>
                Preview your brand-styled document below, compile to PDF, and share instantly with your client.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={generatePDF}
                disabled={generating}
                className="flex items-center justify-center gap-1.5 text-white font-bold py-3.5 px-4 rounded-lg uppercase tracking-wide cursor-pointer transition-opacity hover:opacity-95 shadow-md text-xs"
                style={{ backgroundColor: '#1A2B5F', fontFamily: 'DM Sans' }}
              >
                {generating ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
                Download PDF
              </button>
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-1.5 text-white font-bold py-3.5 px-4 rounded-lg uppercase tracking-wide cursor-pointer transition-opacity hover:opacity-95 shadow-md text-xs"
                style={{ backgroundColor: '#25D366', fontFamily: 'DM Sans' }}
              >
                <Send size={14} />
                WhatsApp Share
              </button>
            </div>

            <button
              onClick={handleCopyShareLink}
              className="w-full flex items-center justify-center gap-1.5 py-3 border border-gray-300 rounded-lg text-xs font-bold text-gray-600 uppercase bg-gray-50 hover:bg-gray-100"
              style={{ fontFamily: 'DM Sans' }}
            >
              <Copy size={13} />
              Copy Share Handoff Info
            </button>

            {/* Brand A4 Live Preview Frame */}
            <div className="space-y-2.5">
              <label className="block text-xs font-extrabold text-[#1A2B5F] uppercase tracking-wider">
                Document Preview (A4 Aspect Ratio)
              </label>
              
              <div className="border border-gray-200 shadow-lg rounded-xl overflow-hidden overflow-y-auto max-h-[480px] bg-gray-100 p-3 flex justify-center">
                {/* PDF Compilation Wrapper Container */}
                <div 
                  ref={reportPreviewRef}
                  className="bg-white w-[595px] min-h-[842px] p-6 shadow-sm flex flex-col justify-between text-[#2D2D2D] relative overflow-hidden"
                  style={{ 
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '11px',
                    lineHeight: '1.4'
                  }}
                >
                  
                  {/* Outer border trim for Premium styles */}
                  {selectedTemplate === 'premium' && (
                    <div className="absolute inset-0 pointer-events-none border-[6px]" style={{ borderColor: '#F5A623' }} />
                  )}

                  {/* Header Segment */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b-2 pb-4" style={{ borderColor: '#1A2B5F' }}>
                      <div className="flex items-center gap-2.5">
                        <img src={logo} alt="Vishal Realty" className="h-10 w-auto" />
                        <div>
                          <h1 className="text-[15px] font-extrabold tracking-wider" style={{ color: '#1A2B5F' }}>
                            VISHAL REALTY
                          </h1>
                          <p className="text-[9px] text-[#00AEEF] font-bold uppercase tracking-widest">
                            Property Report
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[9px] text-gray-500 uppercase">Consultancy & Valuations</p>
                        <p className="text-[8px] text-gray-400">Date: {new Date().toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>

                    {/* Prepared For Banner */}
                    <div 
                      className="px-4 py-3 flex justify-between items-center rounded" 
                      style={{ 
                        backgroundColor: selectedTemplate === 'simple' ? '#F3F4F6' : '#1A2B5F',
                        color: selectedTemplate === 'simple' ? '#1A2B5F' : '#FFFFFF' 
                      }}
                    >
                      <span className="font-extrabold uppercase tracking-wide">
                        Prepared for: {clientName || 'Valued Client'}
                      </span>
                      <span className="text-[9px] opacity-90">
                        Confidential Portfolio
                      </span>
                    </div>

                    {/* Main cover Photo */}
                    <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-100 flex items-center justify-center">
                      {reportPhotos.length > 0 ? (
                        <img src={reportPhotos[0]} className="w-full h-full object-cover" crossOrigin="anonymous" />
                      ) : (
                        <div className="text-center p-8">
                          <ImageIcon size={36} className="mx-auto text-gray-300 mb-1" />
                          <span className="text-gray-400 text-xs font-semibold">No property images attached</span>
                        </div>
                      )}
                    </div>

                    {/* Property Specs Block */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <h2 className="text-[13px] font-extrabold mb-1" style={{ color: '#1A2B5F' }}>
                          {reportTitle || 'Premium Property Showcase'}
                        </h2>
                        <p className="text-gray-500 font-semibold text-[9px] mb-2">
                          📍 {reportAddress || 'Chennai Enclave, Tamil Nadu'}
                        </p>
                        
                        <div className="flex gap-2">
                          <span className="px-2 py-1 rounded bg-[#00AEEF]/10 text-[#00AEEF] text-[9px] font-extrabold uppercase">
                            {selectedProperty?.type || 'Apartment'}
                          </span>
                          <span className="px-2 py-1 rounded bg-green-50 text-green-700 text-[9px] font-extrabold uppercase">
                            {reportPrice || 'Price on Request'}
                          </span>
                        </div>
                      </div>

                      {/* Dimensions Spec Strip */}
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 grid grid-cols-2 gap-2 text-[9px]">
                        <div>
                          <span className="block text-gray-400 font-bold uppercase text-[7.5px]">Total Area</span>
                          <strong className="text-[#1A2B5F] text-[10px]">{reportArea || 'N/A'} Sq.ft</strong>
                        </div>
                        <div>
                          <span className="block text-gray-400 font-bold uppercase text-[7.5px]">Configuration</span>
                          <strong className="text-[#1A2B5F] text-[10px]">{reportBhk ? `${reportBhk} BHK` : 'N/A'}</strong>
                        </div>
                        <div>
                          <span className="block text-gray-400 font-bold uppercase text-[7.5px]">Floor</span>
                          <strong className="text-[#1A2B5F] text-[10px]">{reportFloor || 'N/A'}</strong>
                        </div>
                        <div>
                          <span className="block text-gray-400 font-bold uppercase text-[7.5px]">Furnishing</span>
                          <strong className="text-[#1A2B5F] text-[10px]">{selectedProperty?.furnished || 'Legally Verified'}</strong>
                        </div>
                      </div>
                    </div>

                    {/* HIGHLIGHTS SECTION */}
                    {getSelectedHighlights().length > 0 && (
                      <div className="space-y-2 pt-2">
                        <h3 className="font-extrabold uppercase text-[9px] tracking-wider border-b pb-1" style={{ color: '#1A2B5F', borderColor: '#00AEEF' }}>
                          Core Property Highlights
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                          {getSelectedHighlights().map((hl, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <span className="text-[10px]" style={{ color: '#F5A623' }}>✔</span>
                              <span className="text-[9px] font-bold text-gray-700">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Photo collection */}
                    {reportPhotos.length > 1 && (
                      <div className="space-y-2 pt-2">
                        <h3 className="font-extrabold uppercase text-[9px] tracking-wider border-b pb-1" style={{ color: '#1A2B5F', borderColor: '#00AEEF' }}>
                          Interior Showcase Gallery
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                          {reportPhotos.slice(1, 5).map((url, idx) => (
                            <div key={idx} className="aspect-[4/3] rounded overflow-hidden bg-gray-50 border border-gray-100">
                              <img src={url} className="w-full h-full object-cover" crossOrigin="anonymous" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Floor Plan block */}
                    {reportFloorPlan && (
                      <div className="space-y-2 pt-2">
                        <h3 className="font-extrabold uppercase text-[9px] tracking-wider border-b pb-1" style={{ color: '#1A2B5F', borderColor: '#00AEEF' }}>
                          Architectural Floor Plan or Layout Sketch
                        </h3>
                        <div className="aspect-[21/9] w-full rounded border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                          <img src={reportFloorPlan} className="w-full h-full object-contain" crossOrigin="anonymous" />
                        </div>
                      </div>
                    )}

                    {/* Description Paragraph */}
                    {reportDescription && (
                      <div className="space-y-1.5 pt-2">
                        <h3 className="font-extrabold uppercase text-[9px] tracking-wider border-b pb-1" style={{ color: '#1A2B5F', borderColor: '#00AEEF' }}>
                          Property Description
                        </h3>
                        <p className="text-[8.5px] text-gray-600 leading-relaxed text-justify">
                          {reportDescription}
                        </p>
                      </div>
                    )}

                    {/* Special Remarks Section */}
                    {reportRemarks && (
                      <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-lg space-y-1 mt-2">
                        <h4 className="font-bold text-[8.5px] text-amber-800 uppercase tracking-wider">
                          Special Remarks for Client:
                        </h4>
                        <p className="text-[8px] text-gray-700 italic leading-normal">
                          "{reportRemarks}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* PDF Footer contact block */}
                  <div className="border-t pt-4 mt-8 flex items-end justify-between" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                    <div>
                      <strong className="text-[10px]" style={{ color: '#1A2B5F' }}>Kishore Kumar Vigneswaran</strong>
                      <span className="block text-[8px] text-gray-400">Founder, Vishal Realty Consultancy</span>
                      <span className="block text-[8px] text-[#00AEEF] font-bold">100% Legally Verified Properties</span>
                    </div>

                    <div className="text-right text-[8px] text-gray-500 space-y-0.5" style={{ fontFamily: 'monospace' }}>
                      <div className="flex items-center justify-end gap-1"><Phone size={8} /> +91 63839 77798</div>
                      <div className="flex items-center justify-end gap-1"><Mail size={8} /> vishalrealty@outlook.com</div>
                      <div className="flex items-center justify-end gap-1"><Link2 size={8} /> vishal-realty-ivory.vercel.app</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-4 flex justify-start">
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-1 px-4 py-3 rounded-lg border border-gray-300 font-bold uppercase tracking-wider cursor-pointer text-xs text-gray-500 bg-white"
                style={{ fontFamily: 'DM Sans' }}
              >
                <ChevronLeft size={14} />
                Back to Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Report History section */}
      <div className="space-y-3">
        <h4 className="text-xs font-extrabold text-[#1A2B5F] uppercase tracking-wider block">
          Recent Report Logs (Last 10)
        </h4>

        {loadingHistory ? (
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
          </div>
        ) : reportHistory.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
            <span className="text-xs text-gray-400 font-bold block">No reports generated yet.</span>
            <span className="text-[10px] text-gray-400">Create a report above and download to register details in your history dashboard.</span>
          </div>
        ) : (
          <div className="space-y-2">
            {reportHistory.map((item) => (
              <div 
                key={item.id}
                className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between gap-3 text-xs"
              >
                <div className="min-w-0 flex-1">
                  <span className="font-bold block text-gray-700 truncate">
                    {item.property_title} — <strong className="text-[#1A2B5F]">{item.client_name}</strong>
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold mt-1">
                    <Calendar size={10} />
                    <span>
                      {item.created_at 
                        ? new Date(item.created_at).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })
                        : 'Just now'
                      }
                    </span>
                    <span>•</span>
                    <span className="capitalize">{item.locality || 'Chennai'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-gray-50 pt-2.5">
                  <button
                    onClick={() => handleQuickRegenerate(item)}
                    className="flex items-center justify-center gap-1 text-[10px] font-bold text-[#00AEEF] py-2 px-3 bg-sky-50/20 hover:bg-sky-50 rounded-lg cursor-pointer border border-sky-100/50"
                  >
                    <RefreshCw size={10} />
                    Regenerate
                  </button>
                  <button
                    onClick={() => {
                      const text = `Please find the property report for *${item.property_title}* prepared by Vishal Realty. Price: ${item.price || 'Price on Request'}. Contact +91 63839 77798.`;
                      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="flex items-center justify-center gap-1 text-[10px] font-bold text-green-700 py-2 px-3 bg-green-50/20 hover:bg-green-50 rounded-lg cursor-pointer border border-green-100/50"
                  >
                    <Send size={10} />
                    WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// Inline fallback CheckCircle since Lucide might export it differently
function CheckCircleComponent({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
