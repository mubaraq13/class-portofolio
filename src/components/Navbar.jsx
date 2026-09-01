// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Sembunyikan Navbar publik jika sedang berada di halaman Dasbor Admin
  if (location.pathname.startsWith('/admin')) return null;

  // Daftar Menu Publik
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Members', path: '/members' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Messages', path: '/messages' },
    { name: 'Stories', path: '/stories' },
  ];

  return (
    <nav className="bg-navy-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-1 z-50">
            <span className="text-xl font-black text-white tracking-widest">CLASS</span>
            <span className="text-xl font-black text-cyan-400 tracking-widest">PORTFOLIO</span>
          </Link>

          {/* DESKTOP MENU (Tampil di layar besar) */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-bold transition-colors ${
                  location.pathname === link.path 
                    ? 'text-cyan-400' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* ADMIN PANEL BUTTON */}
            <Link 
              to="/admin/login"
              className="ml-4 flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white text-sm font-bold transition-all shadow-lg hover:shadow-cyan-500/20"
            >
              <LogIn size={16} className="text-cyan-400" /> Admin Panel
            </Link>
          </div>

          {/* MOBILE MENU BUTTON (Hamburger) */}
          <button 
            className="lg:hidden text-slate-300 hover:text-white z-50 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU DROPDOWN (Dengan Animasi Framer Motion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-navy-900 border-t border-white/10 overflow-hidden shadow-2xl absolute w-full"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsOpen(false)} // Otomatis tutup menu saat diklik
                  className={`block text-sm font-bold ${
                    location.pathname === link.path 
                      ? 'text-cyan-400' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10">
                <Link 
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm font-bold transition-colors"
                >
                  <LogIn size={16} className="text-cyan-400" /> Admin Panel
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}