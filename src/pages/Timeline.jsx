// src/pages/Timeline.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageModal from '../components/ImageModal';

export default function Timeline() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // State untuk Modal

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const { data, error } = await supabase
          .from('timeline')
          .select('*')
          .order('event_date', { ascending: false }); // Sejarah terbaru di atas

        if (error) throw error;
        if (data) setEvents(data);
      } catch (error) {
        console.error('Error fetching timeline:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  // Format tanggal ke format Indonesia yang rapi
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      
      {/* HEADER HALAMAN */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 font-semibold text-sm mb-4 border border-cyan-100">
          <Clock size={18} /> Garis Waktu
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4 drop-shadow-lg">Our Journey</h1>
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Jejak langkah, prestasi, dan cerita yang membentuk sejarah kelas kami.
        </p>
      </motion.div>

      {/* TIMELINE LIST */}
      {events.length === 0 ? (
        <div className="text-center text-slate-500 bg-white p-12 rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
          Belum ada catatan sejarah kelas yang ditulis.
        </div>
      ) : (
        <div className="relative border-l-4 border-cyan-100 ml-4 md:ml-8 space-y-12 pb-12">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }} // Animasi muncul saat di-scroll
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Titik (Dot) di Garis Waktu */}
              <div className="absolute -left-[14px] top-2 w-6 h-6 rounded-full bg-cyan-500 border-4 border-slate-50 shadow-sm"></div>
              
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300">
                <span className="flex items-center gap-1.5 text-sm font-bold text-cyan-600 mb-3">
                  <Calendar size={16} /> {formatDate(event.event_date)}
                </span>
                
                <h3 className="text-2xl font-bold text-navy-900 mb-4">{event.title}</h3>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  {event.description}
                </p>
                
                {/* Gambar Dokumentasi (Jika Ada) */}
                {event.image_url && (
                  <div 
                    className="w-full max-w-lg rounded-2xl overflow-hidden border border-slate-100 cursor-pointer shadow-sm hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage(event.image_url)}
                  >
                    <img 
                      src={event.image_url} 
                      alt={event.title} 
                      className="w-full h-auto object-cover max-h-80"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODAL GAMBAR */}
      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

    </div>
  );
}