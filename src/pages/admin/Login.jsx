// src/pages/admin/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile'; // <-- Import Cloudflare Turnstile

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State penanda apakah verifikasi Cloudflare berhasil
  const [isVerified, setIsVerified] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Cegah login kalau Cloudflare belum centang hijau
    if (!isVerified) {
      setError("Silakan verifikasi keamanan Cloudflare terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Jika berhasil, arahkan ke dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      setError("Gagal login: Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Gelap untuk Halaman Login */}
      <div className="absolute inset-0 bg-navy-900"></div>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-600/20 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Tombol Kembali */}
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Kembali ke Website
        </Link>

        {/* Card Login */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-cyan-500/20 rounded-full mb-4 border border-cyan-500/30">
              <ShieldCheck size={32} className="text-cyan-400" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-wide">ADMIN LOGIN</h1>
            <p className="text-slate-400 text-sm mt-2">Masuk untuk mengelola data kelas</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 p-3.5 bg-navy-900/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-500" 
                  placeholder="admin@mipa1.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 p-3.5 bg-navy-900/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-500" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {/* WIDGET CLOUDFLARE TURNSTILE */}
            <div className="pt-2 flex justify-center">
              <Turnstile 
                /* Ini adalah Site Key Testing (Dummy) agar kodingan lu tidak error.
                  Untuk web asli, daftar di dash.cloudflare.com -> Turnstile -> Add Site
                  Lalu ganti string di bawah dengan Site Key milik lu sendiri.
                */
                siteKey="1x00000000000000000000AA" 
                onSuccess={(token) => {
                  console.log("Cloudflare Verified!", token);
                  setIsVerified(true);
                  setError(null);
                }}
                onError={() => {
                  setIsVerified(false);
                  setError("Verifikasi Cloudflare gagal. Silakan coba lagi.");
                }}
                onExpire={() => {
                  setIsVerified(false);
                }}
                options={{ theme: 'dark' }} // Tema gelap biar matching sama login kita
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !isVerified}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Authenticating..." : (!isVerified ? "Selesaikan Keamanan" : "Login to Dashboard")}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}