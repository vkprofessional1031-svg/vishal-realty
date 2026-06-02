import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../supabase/auth';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import logo from '../assets/logo.png';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error("Login failure:", err);
      // Map error codes
      if (err.message && err.message.toLowerCase().includes('fetch')) {
        setError("Connection error. Check your internet.");
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1A2B5F] p-6 font-sans relative">
      {/* Main Content Centered */}
      <div className="w-full max-w-[390px] bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100/90 p-8 flex flex-col items-center">
          
          {/* Logo Card Top */}
          <div className="mb-6 flex justify-center w-full">
            <img src={logo} alt="Vishal Realty" className="h-16 w-auto object-contain" />
          </div>

          {/* Title Header */}
          <div className="text-center mb-8">
            <h2 
              className="text-2xl font-bold tracking-tight mb-1.5"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1A2B5F' }}
            >
              Admin Panel
            </h2>
            <p 
              className="text-[11px] font-semibold tracking-[0.15em] text-gray-500 uppercase"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Vishal Realty Consultancy
            </p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="w-full flex items-start gap-2 bg-red-50 text-red-700 px-3.5 py-2.5 rounded-lg border border-red-200 mb-4 text-xs">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-red-500" />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
                {error}
              </span>
            </div>
          )}

          {/* Login Credentials Form */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
            
            {/* Email input field */}
            <div className="space-y-1">
              <label 
                htmlFor="email"
                className="block text-[10px] font-extrabold uppercase px-0.5 tracking-wider"
                style={{ fontFamily: 'DM Sans, sans-serif', color: '#1A2B5F', opacity: 0.8 }}
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vishalrealty.com"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all text-[#2D2D2D]"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }} // prevent iOS zoom
                />
              </div>
            </div>

            {/* Password input field */}
            <div className="space-y-1">
              <label 
                htmlFor="password"
                className="block text-[10px] font-extrabold uppercase px-0.5 tracking-wider"
                style={{ fontFamily: 'DM Sans, sans-serif', color: '#1A2B5F', opacity: 0.8 }}
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Lock size={16} />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all text-[#2D2D2D]"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px' }} // prevent iOS zoom
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#00AEEF]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Login CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-1.5 text-white font-bold h-12 rounded-lg uppercase tracking-wider transition-opacity hover:opacity-90 disabled:opacity-75 cursor-pointer shadow-md mt-6"
              style={{
                backgroundColor: '#1A2B5F',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
              }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

        </div>
    </div>
  );
}
