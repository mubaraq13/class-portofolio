// src/pages/Stories.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BookOpen, User, Clock, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // State untuk kontrol Slide Buku (Index halaman aktif)
  const [currentIndex, setCurrentIndex] = useState(0);

  const [formData, setFormData] = useState({ 
    title: '', 
    author: '', 
    content: '' 
  });

  useEffect(() => { 
    // 1. Tarik data cerita pertama kali saat halaman dibuka
    fetchStories(); 

    // 2. PASANG RADAR REALTIME SUPABASE 🚀
    const radar = supabase
      .channel('custom-stories-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'stories' }, // Pantau tabel 'stories'
        (payload) => {
          console.log('Ada cerita/bab baru masuk!', payload);
          // 3. Langsung tarik data cerita baru tanpa refresh!
          fetchStories();
          // Opsional: Langsung balik ke bab terbaru (index 0)
          setCurrentIndex(0); 
        }
      )
      .subscribe();

    // 4. Matikan radar saat pindah halaman biar enteng
    return () => {
      supabase.removeChannel(radar);
    };
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      if (data) setStories(data);
    } catch (error) { 
      console.error('Error fetching stories:', error); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim() || !formData.content.trim()) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase.from('stories').insert([
        { 
          title: formData.title, 
          author: formData.author, 
          content: formData.content 
        }
      ]);
      
      if (error) throw error;
      
      setFormData({ title: '', author: '', content: '' });
      alert("Bab cerita baru berhasil dijilid ke dalam buku kelas! 📖");
      
      // Catatan: fetchStories() dan setCurrentIndex(0) sudah dihapus dari sini 
      // karena sudah otomatis diurus sama Radar Realtime di atas!
      
    } catch (error) { 
      alert("Gagal menyimpan cerita: " + error.message); 
    } finally { 
      setSubmitting(false); 
    }
  };

  const formatDateTime = (dateString) => { 
    return new Date(dateString).toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }); 
  };

  // Navigasi Slide Buku
  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Kembali ke halaman awal jika sudah di ujung
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(stories.length - 1); // Lompat ke halaman terakhir
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const currentStory = stories[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-between">
      
      {/* HEADER HALAMAN */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cyan-300 font-semibold text-sm mb-4 border border-white/20 backdrop-blur-md shadow-sm">
          <BookOpen size={18} /> Buku Arsip Kenangan Interaktif
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4 drop-shadow-lg">
          Class Diary Reader
        </h1>
        
        <p className="text-slate-200 text-lg drop-shadow-md max-w-2xl mx-auto">
          Buka lembaran demi lembaran kisah, cerita seru, dan sejarah berharga kelas kita secara berdampingan.
        </p>
      </motion.div>

      {/* GRID LAYOUT UTAMA: KIRI FORM, KANAN SLIDER BUKU */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        
        {/* FORM TULIS CERITA (DI KIRI / STICKY) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/20 shadow-xl lg:sticky lg:top-24"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
              Tambah Bab Baru 📖
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Bab / Cerita</label>
              <input 
                type="text" 
                required 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                className="w-full p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm" 
                placeholder="Contoh: Bab 1 - Awal Pertemuan..." 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Penulis / Kontributor</label>
              <input 
                type="text" 
                required 
                value={formData.author} 
                onChange={(e) => setFormData({...formData, author: e.target.value})} 
                className="w-full p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm" 
                placeholder="Nama Kamu..." 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Isi Cerita / Bab</label>
              <textarea 
                required 
                rows="4" 
                value={formData.content} 
                onChange={(e) => setFormData({...formData, content: e.target.value})} 
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none resize-none bg-slate-50 focus:bg-white transition-colors text-sm" 
                placeholder="Tuliskan kisah seru di sini..."
              ></textarea>
            </div>

            <div className="pt-1">
              <button 
                type="submit" 
                disabled={submitting} 
                className="w-full bg-navy-900 text-cyan-400 py-3.5 rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50 transition-all flex justify-center items-center gap-2 shadow-lg"
              >
                {submitting ? "Menyimpan..." : <><Send size={18} /> Jilid ke Buku</>}
              </button>
            </div>
          </form>
        </motion.div>

        {/* SLIDER Buku (DI KANAN): TAMPIL SATU PER SATU SEPERTI LEMBARAN BUKU */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {stories.length === 0 ? (
            <div className="text-center p-12 bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-sm text-slate-500">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <p>Belum ada bab cerita yang ditulis di buku ini.</p>
            </div>
          ) : (
            <div className="relative">
              
              {/* KOTAK UTAMA LEMBARAN BUKU */}
              <div className="bg-amber-50/95 backdrop-blur-md p-8 md:p-10 rounded-3xl border-2 border-amber-200 shadow-2xl relative min-h-[420px] flex flex-col justify-between overflow-hidden">
                
                {/* Efek Garis Tengah Buku / Jilidan */}
                <div className="absolute top-0 bottom-0 left-4 w-1 bg-amber-200/60 hidden md:block"></div>

                {/* ANIMASI PERPINDAHAN HALAMAN (Framer Motion AnimatePresence) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStory.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* Header Lembaran */}
                      <div className="flex justify-between items-start border-b border-amber-200/60 pb-4 mb-6">
                        <div>
                          <span className="text-xs font-mono font-bold text-amber-700/60 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                            Halaman {currentIndex + 1} dari {stories.length}
                          </span>
                          <h2 className="text-2xl md:text-3xl font-black text-amber-950 mt-3 leading-snug break-words">
                            {currentStory.title}
                          </h2>
                        </div>
                      </div>

                      {/* Isi Teks Lembaran Buku */}
                      <div className="max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-slate-700 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-serif italic">
                          "{currentStory.content}"
                        </p>
                      </div>
                    </div>

                    {/* Footer Lembaran (Penulis & Tanggal) */}
                    <div className="pt-6 mt-6 border-t border-amber-200/60 flex flex-wrap justify-between items-center text-xs md:text-sm text-amber-900/70 font-semibold">
                      <span className="flex items-center gap-1.5 bg-amber-100/80 px-3 py-1 rounded-full">
                        <User size={14} /> Ditulis oleh: {currentStory.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {formatDateTime(currentStory.created_at)}
                      </span>
                    </div>

                  </motion.div>
                </AnimatePresence>

              </div>

              {/* TOMBOL NAVIGASI SLIDE (KIRI & KANAN) */}
              <div className="flex justify-between items-center mt-6 px-2">
                <button 
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl backdrop-blur-md transition-all hover:scale-105 shadow-lg"
                >
                  <ChevronLeft size={20} /> Sebelumnya
                </button>

                {/* Indikator Titik Halaman */}
                <div className="flex gap-1.5 overflow-x-auto max-w-[200px] py-2">
                  {stories.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentIndex === idx ? 'w-6 bg-cyan-400' : 'w-2.5 bg-white/30 hover:bg-white/50'
                      }`}
                      title={`Halaman ${idx + 1}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold rounded-2xl transition-all hover:scale-105 shadow-lg"
                >
                  Selanjutnya <ChevronRight size={20} />
                </button>
              </div>

            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}