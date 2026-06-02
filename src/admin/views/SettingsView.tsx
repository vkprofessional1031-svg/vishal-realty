import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../supabase/client';
import { signOut } from '../../supabase/auth';
import { 
  User, Lock, Eye, EyeOff, Globe, LogOut, Loader2, KeyRound, Phone, Mail, ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

export function SettingsView() {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [userEmail, setUserEmail] = useState('admin@vishalrealty.com');

  const navigate = useNavigate();

  // Load active authenticated user email
  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email) {
        setUserEmail(user.email);
      }
    };
    loadUser();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating password credentials secure feeds...");

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      toast.success("Password updated successfully!", { id: toastId });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error("Password update error:", err);
      toast.error(err.message || "Failed to update password.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout securely?")) {
      try {
        await signOut();
        toast.success("Logged out securely.");
        navigate('/admin');
      } catch (error) {
        console.error("Logout failure:", error);
        toast.error("Logout failed.");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-[500px] mx-auto pb-12">
      {/* View Header */}
      <div>
        <h2 
          className="text-2xl font-bold text-[#1A2B5F]"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Settings
        </h2>
        <p className="text-xs text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Manage your secure admin credentials and view platform details.
        </p>
      </div>

      {/* Profile Info Box */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2 flex items-center gap-1.5">
          <User size={14} className="text-gray-400" />
          Admin Profile
        </h3>

        <div className="space-y-3.5">
          {/* Display Name */}
          <div className="flex justify-between items-center py-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider" style={{ fontFamily: 'DM Sans' }}>
              Full Name
            </span>
            <span className="text-sm font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Kishore Kumar Vigneswaran
            </span>
          </div>

          {/* Email Address */}
          <div className="flex justify-between items-center py-1 border-t border-gray-50 pt-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider" style={{ fontFamily: 'DM Sans' }}>
              Email Address
            </span>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
              <Mail size={13} className="text-gray-400" />
              <span>{userEmail}</span>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex justify-between items-center py-1 border-t border-gray-50 pt-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider" style={{ fontFamily: 'DM Sans' }}>
              Mobile Phone
            </span>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
              <Phone size={13} className="text-gray-400" />
              <span>+91 63839 77798</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Update Password Form */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2 flex items-center gap-1.5">
          <Lock size={14} className="text-gray-400" />
          Update Credentials
        </h3>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          {/* New Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1A2B5F]">
              New Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Lock size={16} />
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] text-[#2D2D2D]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1A2B5F]">
              Confirm New Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Lock size={16} />
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#00AEEF] text-[#2D2D2D]"
                style={{ fontSize: '16px' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-1.5 text-white font-bold py-3 px-4 rounded-lg uppercase tracking-wide cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-75 text-xs shadow-md"
            style={{ backgroundColor: '#1A2B5F', fontFamily: 'DM Sans' }}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
            Change Password Securely
          </button>
        </form>
      </div>

      {/* App Info Box */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2 flex items-center gap-1.5">
          <Globe size={14} className="text-gray-400" />
          Application Diagnostics
        </h3>

        <div className="space-y-3 text-xs font-bold text-gray-500" style={{ fontFamily: 'DM Sans' }}>
          <div className="flex justify-between items-center">
            <span className="uppercase text-gray-400 tracking-wider">Version</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-50 pt-2.5">
            <span className="uppercase text-gray-400 tracking-wider">Vite Build Target</span>
            <span>Client Production</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-50 pt-2.5">
            <span className="uppercase text-gray-400 tracking-wider">Public Web</span>
            <a 
              href="https://vishal-realty-ivory.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#00AEEF] hover:underline flex items-center gap-1"
            >
              vishal-realty-ivory.vercel.app
            </a>
          </div>
        </div>
      </div>

      {/* Sign Out Button (full width red) */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-4 px-4 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 active:scale-98 rounded-xl transition-all cursor-pointer border border-red-200"
        style={{ fontFamily: 'DM Sans, sans-serif' }}
      >
        <LogOut size={16} />
        Log Out Securely
      </button>
    </div>
  );
}
