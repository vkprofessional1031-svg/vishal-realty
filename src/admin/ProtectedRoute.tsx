import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getSession } from '../supabase/auth';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        navigate('/admin');
      } else {
        setAuthenticated(true);
      }
      setChecking(false);
    });
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-[#1A2B5F] mb-4" />
        <span className="text-sm font-semibold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Verifying session secure...
        </span>
      </div>
    );
  }

  return authenticated ? <>{children}</> : null;
}
