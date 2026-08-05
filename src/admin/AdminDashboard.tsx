import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  LogOut, 
  ExternalLink, 
  ShieldCheck, 
  Loader2 
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import { signOut, getSession } from '../supabase/auth';
import { UpdatesView } from './views/UpdatesView';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check auth session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession();
      } catch (err) {
        console.warn('Auth check warning:', err);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Logout error:', err);
    }
    navigate('/admin');
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1A2B5F]" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Vishal Realty" className="h-8 w-auto object-contain" />
            <div className="hidden sm:block border-l border-gray-200 pl-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A2B5F]">
                <ShieldCheck size={14} className="text-[#00AEEF]" />
                Admin Dashboard
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-[#1A2B5F] bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">View Website</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <UpdatesView />
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-400 border-t border-gray-200/60 bg-white">
        Vishal Realty Consultancy Admin Portal • Secure Session
      </footer>
    </div>
  );
}

