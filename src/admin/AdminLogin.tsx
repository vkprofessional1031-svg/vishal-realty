import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { signIn } from '../supabase/auth';

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email.trim(), password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.message && err.message.toLowerCase().includes('invalid login credentials')) {
        setError('Invalid email or password.');
      } else if (err.message && (err.message.includes('fetch') || err.message.includes('URL') || err.message.includes('placeholder'))) {
        setError('Supabase connection not configured yet. Please update the .env file with your project keys.');
      } else {
        setError(err.message || 'Invalid email or password.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col justify-between">
      {/* Top Brand Banner */}
      <div 
        className="w-full pt-12 pb-24 px-6 flex flex-col items-center justify-center text-center shadow-inner"
        style={{ backgroundColor: '#1A2B5F' }}
      >
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white mb-6 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-all"
        >
          <ArrowLeft size={14} /> Back to Website
        </a>
      </div>

      {/* Centered Login Card */}
      <div className="flex-1 flex items-center justify-center px-4 -mt-16 pb-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 relative">
          {/* Logo & Heading */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gray-50 border border-gray-100 shadow-sm mb-4">
              <img 
                src={logoImg} 
                alt="Vishal Realty Consultancy" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <h1 
              className="text-2xl sm:text-3xl font-extrabold mb-1"
              style={{ color: '#1A2B5F', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Admin Panel
            </h1>
            <p 
              className="text-sm font-medium text-gray-500"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Vishal Realty Consultancy
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 animate-fadeIn">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label 
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vishalrealtychennai.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#F4F6F9] border border-gray-200 rounded-xl text-sm text-[#1A2B5F] font-medium placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 transition-all"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-[#F4F6F9] border border-gray-200 rounded-xl text-sm text-[#1A2B5F] font-medium placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 transition-all"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              style={{
                backgroundColor: '#1A2B5F',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Login Securely</span>
                </>
              )}
            </button>
          </form>

          {/* Secure footer badge */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <span>🔒 Encrypted Admin Session</span>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} Vishal Realty Consultancy. All rights reserved.
      </footer>
    </div>
  );
}
