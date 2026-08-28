// src/pages/admin/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { fadeUp } from '../../lib/animations';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Jika berhasil, arahkan ke dashboard admin
      if (data.session) {
        navigate('/admin/dashboard'); // <-- WAJIB ADA '/' DI SINI
      }
    } catch (err) {
      setError("Email atau password salah!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <motion.div 
        initial="hidden" animate="visible" variants={fadeUp}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy-900 mb-2">Admin Login</h1>
          <p className="text-slate-500 text-sm">Masuk untuk mengelola portofolio kelas.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-6 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-navy-900 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                placeholder="admin@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy-900 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-navy-900 text-cyan-400 font-bold rounded-xl hover:bg-navy-800 transition-colors shadow-lg disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-cyan-400"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}