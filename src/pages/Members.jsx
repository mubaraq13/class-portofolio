// src/pages/Members.jsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; 
import { supabase } from '../lib/supabase';
import { Users, X, MousePointerClick, AtSign } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  
  // State untuk melacak foto ke berapa yang sedang dilihat (1 = utama, 2 = gaya bebas)
  const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);

  useEffect(() => {
    // Fungsi tarik data
    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        if (data) setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    // 1. Tarik data pas halaman pertama kali dibuka
    fetchMembers();

    // 2. PASANG RADAR REALTIME SUPABASE 🚀
    const radar = supabase
      .channel('custom-members-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'members' }, // Fokus mantau tabel 'members'
        (payload) => {
          console.log('Ada perubahan data anggota kelas!', payload);
          // 3. Langsung update tampilan tanpa refresh!
          fetchMembers(); 
        }
      )
      .subscribe();

    // 4. Matikan radar saat pindah halaman biar enteng
    return () => {
      supabase.removeChannel(radar);
    };
  }, []);

  // Kunci scroll saat modal terbuka
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedMember]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen relative">
      
      {/* HEADER HALAMAN */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cyan-300 font-semibold text-sm mb-4 border border-white/20 backdrop-blur-md shadow-sm">
          <Users size={18} /> Anggota Kelas
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4 drop-shadow-lg">
          Meet Our Family
        </h1>
        
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Kenali lebih dekat orang-orang hebat di balik cerita kelas kami.
        </p>
      </motion.div>

      {/* GRID ANGGOTA */}
      {members.length === 0 ? (
        <div className="text-center text-slate-500 bg-white/95 backdrop-blur-md p-12 rounded-3xl border border-white/20 shadow-sm max-w-2xl mx-auto">
          Belum ada data anggota yang ditambahkan.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedMember(member);
                setIsPhotoFlipped(false); // Reset ke foto utama setiap kali modal dibuka
              }}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-6 text-center border border-white/20 shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img 
                  src={member.photo_url || 'https://via.placeholder.com/150'} 
                  alt={member.full_name}
                  className="w-full h-full object-cover rounded-full ring-4 ring-slate-100 group-hover:ring-cyan-300 transition-all duration-300 shadow-md"
                />
                {member.role !== 'Siswa' && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-navy-900 text-cyan-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap shadow-lg border border-cyan-500/30">
                    {member.role}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-navy-900 mb-1 group-hover:text-cyan-600 transition-colors">
                {member.full_name}
              </h3>
              
              {member.role === 'Siswa' && (
                <p className="text-sm font-semibold text-cyan-600 mb-3">{member.role}</p>
              )}
              {member.role !== 'Siswa' && <div className="h-2"></div>}
              
              <p className="text-sm text-slate-600 line-clamp-2 italic font-medium">
                "{member.bio || 'Maju terus pantang mundur.'}"
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* PORTAL MODAL */}
      {createPortal(
        <AnimatePresence>
          {selectedMember && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 bg-navy-900/90 backdrop-blur-md"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Tombol Close */}
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-white/50 backdrop-blur-sm text-slate-700 hover:bg-red-500 hover:text-white rounded-full transition-all shadow-sm"
                >
                  <X size={20} />
                </button>

                {/* SISI KIRI (FOTO) - DENGAN FITUR FLIP 3D */}
                <div 
                  className="w-full md:w-2/5 h-72 md:h-auto relative bg-slate-100 shrink-0 border-b md:border-b-0 md:border-r border-slate-200 group cursor-pointer"
                  onClick={() => {
                    // Hanya bisa flip kalau foto ke-2 tersedia di database
                    if (selectedMember.photo_url_2) {
                      setIsPhotoFlipped(!isPhotoFlipped);
                    }
                  }}
                  style={{ perspective: 1000 }} 
                >
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={isPhotoFlipped ? 'foto-2' : 'foto-1'}
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -90 }}
                      transition={{ duration: 0.3 }}
                      src={isPhotoFlipped && selectedMember.photo_url_2 ? selectedMember.photo_url_2 : (selectedMember.photo_url || 'https://via.placeholder.com/400')} 
                      alt={selectedMember.full_name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent md:hidden pointer-events-none"></div>

                  {/* Indikator "Klik untuk lihat gaya bebas" */}
                  {selectedMember.photo_url_2 && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 backdrop-blur-sm">
                      <MousePointerClick size={32} className="animate-bounce" />
                      <p className="font-bold tracking-wider text-sm">
                        {isPhotoFlipped ? "Lihat Foto Formal" : "Lihat Gaya Bebas"}
                      </p>
                    </div>
                  )}
                </div>

                {/* SISI KANAN (BIODATA) */}
                <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col bg-white overflow-y-auto min-h-[400px]">
                  <div className="my-auto">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 shadow-sm border ${selectedMember.role === 'Siswa' ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-cyan-50 text-cyan-700 border-cyan-200'}`}>
                      {selectedMember.role}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-2 leading-tight">
                      {selectedMember.full_name}
                    </h2>
                    
                    <div className="w-16 h-1.5 bg-cyan-400 rounded-full my-6"></div>
                    
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Bio / Quotes</h4>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap italic text-lg font-medium">
                          "{selectedMember.bio || 'Tidak ada deskripsi bio yang ditambahkan.'}"
                        </p>
                      </div>
                      
                      {/* TOMBOL LINK (PAKAI AT-SIGN) */}
                      {selectedMember.instagram && (
                        <a 
                          href={`https://instagram.com/${selectedMember.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
                        >
                          <AtSign size={18} />
                          {selectedMember.instagram.replace('@', '')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
}