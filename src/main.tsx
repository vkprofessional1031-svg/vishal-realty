import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router';
import App from "./app/App.tsx";
import { AdminLogin } from "./admin/AdminLogin.tsx";
import { signOut } from "./supabase/auth.ts";
import "./styles/index.css";

function DashboardPlaceholder() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (e) {
      console.error(e);
    }
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-[#1A2B5F] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Logged in successfully!
        </h1>
        <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Admin session active. Full dashboard views will be built in the next step.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-6 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm transition-colors cursor-pointer"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Logout
          </button>
          <a
            href="/"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Return to Website
          </a>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<DashboardPlaceholder />} />
    </Routes>
  </BrowserRouter>
);