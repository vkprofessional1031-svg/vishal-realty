import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signOut } from '../supabase/auth';
import { LogOut, Home, FileText, Settings, Plus } from 'lucide-react';
import { PropertiesView } from './views/PropertiesView';
import { PropertyForm } from './views/PropertyForm';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import logoSymbol from '../assets/logo-symbol.png';
import { Toaster } from 'sonner';

export type DashboardTab = 'properties' | 'reports' | 'settings';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('properties');
  const [isCreating, setIsCreating] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout securely?")) {
      try {
        await signOut();
        navigate('/admin');
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  const renderActiveView = () => {
    if (isCreating) {
      return (
        <PropertyForm 
          onClose={() => setIsCreating(false)} 
        />
      );
    }

    if (editingPropertyId) {
      return (
        <PropertyForm 
          propertyId={editingPropertyId} 
          onClose={() => setEditingPropertyId(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'properties':
        return (
          <PropertiesView 
            onAddClick={() => setIsCreating(true)}
            onEditClick={(id) => setEditingPropertyId(id)}
          />
        );
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <PropertiesView onAddClick={() => setIsCreating(true)} onEditClick={(id) => setEditingPropertyId(id)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-[80px]" style={{ touchAction: 'manipulation' }}>
      <Toaster position="top-center" richColors />
      
      {/* Mobile Top Header (Navy) */}
      <header 
        className="fixed top-0 left-0 right-0 z-40 px-4 h-16 flex items-center justify-between shadow-md"
        style={{ backgroundColor: '#1A2B5F' }}
      >
        <div className="flex items-center gap-3">
          <img src={logoSymbol} alt="VR Symbol" className="h-9 w-auto brightness-0 invert" />
          <span 
            className="text-white text-base font-bold tracking-wider uppercase mt-0.5"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Admin Panel
          </span>
        </div>
        <button 
          onClick={handleLogout}
          className="w-11 h-11 flex items-center justify-center text-white/80 hover:text-white rounded-full hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer"
          title="Logout"
        >
          <LogOut size={22} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mt-16 px-4 py-6 w-full max-w-[1440px] mx-auto overflow-x-hidden">
        {renderActiveView()}
      </main>

      {/* Bottom Sticky Tab Navigation Bar */}
      {!isCreating && !editingPropertyId && (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-40 flex items-center justify-around px-2">
          {/* Properties Tab */}
          <button
            onClick={() => setActiveTab('properties')}
            className="flex flex-col items-center justify-center w-20 py-1 transition-colors cursor-pointer"
          >
            <Home 
              size={20} 
              color={activeTab === 'properties' ? '#00AEEF' : '#9CA3AF'} 
              className="transition-colors"
            />
            <span 
              className="text-[10px] font-bold mt-1 tracking-wide"
              style={{ 
                color: activeTab === 'properties' ? '#00AEEF' : '#9CA3AF',
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              Properties
            </span>
          </button>

          {/* Reports Tab */}
          <button
            onClick={() => setActiveTab('reports')}
            className="flex flex-col items-center justify-center w-20 py-1 transition-colors cursor-pointer"
          >
            <FileText 
              size={20} 
              color={activeTab === 'reports' ? '#00AEEF' : '#9CA3AF'} 
              className="transition-colors"
            />
            <span 
              className="text-[10px] font-bold mt-1 tracking-wide"
              style={{ 
                color: activeTab === 'reports' ? '#00AEEF' : '#9CA3AF',
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              Reports
            </span>
          </button>

          {/* Settings Tab */}
          <button
            onClick={() => setActiveTab('settings')}
            className="flex flex-col items-center justify-center w-20 py-1 transition-colors cursor-pointer"
          >
            <Settings 
              size={20} 
              color={activeTab === 'settings' ? '#00AEEF' : '#9CA3AF'} 
              className="transition-colors"
            />
            <span 
              className="text-[10px] font-bold mt-1 tracking-wide"
              style={{ 
                color: activeTab === 'settings' ? '#00AEEF' : '#9CA3AF',
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              Settings
            </span>
          </button>
        </nav>
      )}
    </div>
  );
}
