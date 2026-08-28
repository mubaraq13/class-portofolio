// src/pages/About.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Info, GraduationCap, MapPin, Calendar, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const { data, error } = await supabase.from('classes').select('*').limit(1).maybeSingle();
        if (error) throw error;
        if (data) setClassData(data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (loading || !classData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      
      {/* HEADER HALAMAN (DIUBAH JADI GRADASI TERANG) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        {/* Badge Transparan Glassmorphism */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cyan-300 font-semibold text-sm mb-4 border border-white/20 backdrop-blur-md shadow-sm">
          <Info size={18} /> Profil Kelas
        </div>
        
        {/* Teks Judul Gradasi Putih ke Cyan */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4 drop-shadow-lg">
          Tentang Kami
        </h1>
        
        {/* Subtitle Putih Pucat */}
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Mengenal lebih dekat identitas, sejarah, dan visi dari kelas kebanggaan kami.
        </p>
      </motion.div>

      {/* KONTEN UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Kolom Kiri: Teks Deskripsi (Diberi sedikit efek kaca) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl"
        >
          <h2 className="text-3xl font-black text-navy-900 mb-6">{classData.name}</h2>
          
          <div className="prose prose-lg text-slate-600">
            <p className="mb-6 leading-relaxed whitespace-pre-wrap">
              {classData.description || 'Deskripsi kelas belum ditambahkan oleh Admin.'}
            </p>
          </div>

          <div className="mt-10 p-6 bg-cyan-50 rounded-2xl border border-cyan-100 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-cyan-100 opacity-50">
              <Award size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-cyan-800 mb-2 uppercase tracking-widest text-sm">Motto Kami</h3>
              <p className="text-xl font-medium text-cyan-900 italic">"{classData.motto}"</p>
            </div>
          </div>
        </motion.div>

        {/* Kolom Kanan: Kotak Info / Identitas */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="bg-navy-900/90 backdrop-blur-md p-6 rounded-2xl text-white shadow-xl border border-white/10 flex items-center gap-5 hover:-translate-y-1 transition-transform">
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <MapPin size={28} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-cyan-200 text-sm font-medium mb-1">Institusi / Sekolah</p>
              <h3 className="text-xl font-bold">{classData.institution}</h3>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl flex items-center gap-5 hover:-translate-y-1 transition-transform">
            <div className="p-4 bg-blue-50 rounded-xl">
              <GraduationCap size={28} className="text-blue-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Jurusan / Program Studi</p>
              <h3 className="text-xl font-bold text-navy-900">{classData.department}</h3>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl flex items-center gap-5 hover:-translate-y-1 transition-transform">
            <div className="p-4 bg-orange-50 rounded-xl">
              <Calendar size={28} className="text-orange-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Tahun Ajaran / Angkatan</p>
              <h3 className="text-xl font-bold text-navy-900">{classData.start_year} - {classData.end_year}</h3>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl flex items-center gap-5 hover:-translate-y-1 transition-transform">
            <div className="p-4 bg-purple-50 rounded-xl">
              <Users size={28} className="text-purple-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Wali Kelas</p>
              <h3 className="text-xl font-bold text-navy-900">{classData.homeroom_teacher}</h3>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}