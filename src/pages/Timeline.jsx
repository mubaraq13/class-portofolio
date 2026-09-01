// src/pages/Timeline.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Clock, Calendar, Film, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageModal from '../components/ImageModal';

export default function Timeline() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // State untuk kontrol halaman Buku (Page Flip)
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        // Urutkan dari yang paling lama ke terbaru atau sebaliknya sesuai selera buku
        const { data, error } = await supabase
          .from('timeline')
          .select('*')
          .order('date', { ascending: true }); // Diurut kronologis biar dibaca kayak buku sejarah

        if (error) throw error;
        if (data) setTimeline(data);
      } catch (error) {
        console.error('Error fetching timeline:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  const isVideoFile = (url) => {
    return url?.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleNext = () => {
    if (currentIndex < timeline.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const currentItem = timeline[currentIndex];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen relative flex flex-col items-center justify-center">
      
      {/* HEADER HALAMAN */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cyan-300 font-semibold text-sm mb-3 border border-white/20 backdrop-blur-md shadow-sm">
          <BookOpen size={18} /> Buku Catatan Sejarah Kelas
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-2 drop-shadow-lg">
          Class Timeline Book
        </h1>
        <p className="text-slate-200 max-w-xl mx-auto text-sm md:text-base drop-shadow-md">
          Buka lembar demi lembar kisah perjalanan dan momen berharga kita bersama.
        </p>
      </motion.div>

      {/* JIKA KOSONG */}
      {timeline.length === 0 ? (
        <div className="text-center text-slate-500 bg-white/95 backdrop-blur-md p-12 rounded-3xl border border-white/20 shadow-sm max-w-xl mx-auto">
          Belum ada catatan sejarah yang ditambahkan.
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col items-center">
          
          {/* WADAH UTAMA BUKU (BOOK CONTAINER) */}
          <div className="relative w-full bg-white rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-200 overflow-hidden min-h-[480px] md:min-h-[420px] flex flex-col md:flex-row">
            
            {/* EFEK LIPATAN TENGAH BUKU (CENTER BINDING SHADOW) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200/50 to-transparent pointer-events-none z-20"></div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, rotateY: 45, scale: 0.95 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -45, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full flex flex-col md:flex-row p-8 md:p-12 items-center justify-between gap-8 my-auto"
              >
                
                {/* HALAMAN KIRI: KONTEN TEKS & TANGGAL */}
                <div className="w-full md:w-1/2 space-y-6 md:pr-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-50 text-cyan-700 rounded-full text-xs font-bold border border-cyan-200 shadow-sm">
                      <Calendar size={14} /> {formatDate(currentItem.date)}
                    </span>
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                      Lembar {currentIndex + 1} dari {timeline.length}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black text-navy-900 leading-tight">
                    {currentItem.title}
                  </h2>

                  <div className="w-16 h-1.5 bg-cyan-400 rounded-full"></div>

                  <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium italic">
                    "{currentItem.description}"
                  </p>
                </div>

                {/* HALAMAN KANAN: FOTO / MEDIA */}
                {currentItem.image_url ? (
                  <div 
                    className="w-full md:w-1/2 h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer relative bg-slate-900 shadow-xl border-4 border-white group shrink-0"
                    onClick={() => setSelectedImage(currentItem.image_url)}
                  >
                    {isVideoFile(currentItem.image_url) ? (
                      <>
                        <video 
                          src={currentItem.image_url} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                          muted playsInline loop
                          onMouseEnter={(e) => e.target.play()}
                          onMouseLeave={(e) => e.target.pause()}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black/50 p-4 rounded-full text-white backdrop-blur-md border border-white/20 shadow-lg">
                            <Film size={28} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <img 
                        src={currentItem.image_url} 
                        alt={currentItem.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                    <span className="absolute bottom-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/20">
                      Klik untuk memperbesar
                    </span>
                  </div>
                ) : (
                  <div className="w-full md:w-1/2 h-64 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                    <Clock size={40} className="mb-2 opacity-50" />
                    <p className="text-sm font-semibold">Momen tanpa dokumentasi visual, tapi abadi dalam ingatan.</p>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>

          {/* NAVIGASI TOMBOL BUKU (PREV / NEXT) */}
          <div className="flex items-center justify-between w-full mt-8 px-4">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              <ChevronLeft size={20} /> Lembar Sebelumnya
            </button>

            <div className="flex gap-1.5 overflow-x-auto max-w-xs py-2">
              {timeline.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${currentIndex === idx ? 'w-8 bg-cyan-400' : 'w-2.5 bg-white/30 hover:bg-white/50'}`}
                  title={`Ke Lembar ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              disabled={currentIndex === timeline.length - 1}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              Lembar Berikutnya <ChevronRight size={20} />
            </button>
          </div>

        </div>
      )}

      {/* POPUP MODAL GAMBAR/VIDEO */}
      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

    </div>
  );
}