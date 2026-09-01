// src/components/AdminLayout.jsx
import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, Home, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // State untuk nyimpen koordinat jari pas nyentuh layar
  const [touchStartX, setTouchStartX] = useState(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Manage Members', path: '/admin/members' },
    { name: 'Manage Projects', path: '/admin/projects' },
    { name: 'Manage Gallery', path: '/admin/gallery' },
    { name: 'Manage Timeline', path: '/admin/timeline' },
    { name: 'Manage Messages', path: '/admin/messages' },
    { name: 'Manage Stories', path: '/admin/stories' },
  ];

  // LOGIKA SWIPE NATIVE (Anti-Ghosting / Anti nutup sendiri)
  const handleTouchStart = (e) => {
    // Catat posisi X jari pertama kali nempel layar
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    
    // Catat posisi X pas jari diangkat
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;

    // Kalau ditarik ke KIRI lebih dari 75 pixel, baru menu ditutup
    if (distance > 75) {
      setIsMobileMenuOpen(false);
    }
    
    // Reset state
    setTouchStartX(null);
  };

  // Komponen isi sidebar
  const SidebarContent = ({ isMobile = false }) => (
    <>
      <div className="p-6 border-b border-white/10 flex justify-between items-center shrink-0">
        <h2 className="text-2xl font-bold text-cyan-400 tracking-wider">ADMIN PANEL</h2>
        {isMobile && (
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition-colors">
            <X size={28} />
          </button>
        )}
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overscroll-contain">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => isMobile && setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-white/10 text-cyan-400 font-medium' 
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10 space-y-2 shrink-0">
        <Link to="/" className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-white transition-colors">
          <Home size={18} /> View Website
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-xl transition-colors">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row w-full absolute inset-0 z-50">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-navy-900 text-white flex items-center justify-between p-4 sticky top-0 z-40 shadow-md">
        <h2 className="text-xl font-bold text-cyan-400">ADMIN PANEL</h2>
        <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-300 hover:text-white transition-colors">
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE SIDEBAR (Drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop hitam transparan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
            />
            
            {/* Laci Menu dengan Sensor Sentuh Native */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              
              // EVENT SENSOR SENTUH HP DI SINI
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm z-50 bg-navy-900 text-white flex flex-col md:hidden shadow-2xl"
            >
              <SidebarContent isMobile={true} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 bg-navy-900 text-white hidden md:flex flex-col shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}