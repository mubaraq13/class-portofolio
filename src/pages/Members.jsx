// src/pages/Members.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, X } from 'lucide-react'; // Tambahkan icon X untuk tombol close modal
import { motion, AnimatePresence } from 'framer-motion';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk menyimpan data member yang sedang diklik
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
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

    fetchMembers();
  }, []);

  // Matikan scroll body kalau modal sedang terbuka
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedMember]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      
      {/* HEADER HALAMAN */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 font-semibold text-sm mb-4 border border-cyan-100">
          <Users size={18} /> Anggota Kelas
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4 drop-shadow-lg">Meet Our Family</h1>
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Kenali lebih dekat orang-orang hebat di balik cerita kelas kami.
        </p>
      </motion.div>

      {/* GRID ANGGOTA */}
      {members.length === 0 ? (
        <div className="text-center text-slate-500 bg-white p-12 rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
          Belum ada data anggota yang ditambahkan oleh Admin.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMember(member)} // Event Klik untuk buka Modal
              className="bg-white rounded-3xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-cyan-200 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img 
                  src={member.photo_url || 'https://via.placeholder.com/150'} 
                  alt={member.full_name}
                  className="w-full h-full object-cover rounded-full ring-4 ring-slate-50 group-hover:ring-cyan-100 transition-all duration-300"
                />
                {member.role !== 'Siswa' && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-navy-900 text-cyan-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                    {member.role}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-1 group-hover:text-cyan-600 transition-colors">{member.full_name}</h3>
              {member.role === 'Siswa' && (
                <p className="text-sm font-semibold text-cyan-600 mb-3">{member.role}</p>
              )}
              {member.role !== 'Siswa' && <div className="h-2"></div>}
              <p className="text-sm text-slate-500 line-clamp-2 italic">
                "{member.bio || 'Maju terus pantang mundur.'}"
              </p>
              
              {/* Petunjuk Klik (Opsional, agar user tau bisa diklik) */}
              <div className="mt-4 text-xs font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100">
                Klik untuk lihat profil
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* POP-UP MODAL DETAIL MEMBER */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)} // Tutup jika klik area luar (background gelap)
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat kotak putihnya diklik
            >
              {/* Tombol Close */}
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              {/* Bagian Kiri: Foto Besar */}
              <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-slate-100">
                <img 
                  src={selectedMember.photo_url || 'https://via.placeholder.com/400'} 
                  alt={selectedMember.full_name}
                  className="w-full h-full object-cover"
                />
                {/* Latar gradien bawah foto (khusus mobile agar estetik) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden"></div>
              </div>

              {/* Bagian Kanan: Biodata Lengkap */}
              <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center bg-white">
                <div>
                  <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 ${selectedMember.role === 'Siswa' ? 'bg-slate-100 text-slate-600' : 'bg-cyan-100 text-cyan-700'}`}>
                    {selectedMember.role}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2 leading-tight">
                    {selectedMember.full_name}
                  </h2>
                </div>
                
                <div className="w-12 h-1 bg-cyan-400 rounded-full my-6"></div>
                
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Bio / Quotes</h4>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap italic text-lg">
                    "{selectedMember.bio || 'Tidak ada deskripsi bio yang ditambahkan.'}"
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}