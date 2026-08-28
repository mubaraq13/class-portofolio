// src/pages/Gallery.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Image as ImageIcon, Calendar, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageModal from '../components/ImageModal';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data) setPhotos(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Helper cek file video
  const isVideoFile = (url) => url?.match(/\.(mp4|webm|ogg)(\?.*)?$/i);

  if (loading) return <div className="min-h-[70vh] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cyan-300 font-semibold text-sm mb-4 border border-white/20 backdrop-blur-md shadow-sm">
          <ImageIcon size={18} /> Galeri Kelas
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4 drop-shadow-lg">
          Memories We Made
        </h1>
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Kumpulan momen tak terlupakan, tawa, dan cerita yang terekam dalam lensa & video.
        </p>
      </motion.div>

      {photos.length === 0 ? (
        <div className="text-center text-slate-500 bg-white/95 backdrop-blur-md p-12 rounded-3xl border border-white/20 shadow-sm max-w-2xl mx-auto">
          Belum ada foto/video kenangan yang diunggah.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <motion.div 
              key={photo.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer bg-black shadow-lg border border-white/10 hover:shadow-cyan-500/20 transition-all"
              onClick={() => setSelectedImage(photo.image_url)}
            >
              
              {isVideoFile(photo.image_url) ? (
                <>
                  <video 
                    src={photo.image_url} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80"
                    muted playsInline loop
                    onMouseEnter={(e) => e.target.play()} // Putar saat disentuh!
                    onMouseLeave={(e) => e.target.pause()}
                  />
                  {/* Ikon penanda kalau ini video */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity group-hover:opacity-0">
                    <div className="bg-black/40 p-3 rounded-full text-white backdrop-blur-sm border border-white/20 shadow-lg">
                      <Film size={28} />
                    </div>
                  </div>
                </>
              ) : (
                <img 
                  src={photo.image_url} alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">{photo.category}</span>
                <h3 className="text-white font-bold text-lg leading-tight mb-2">{photo.title}</h3>
                {photo.event_date && <p className="text-slate-300 text-xs flex items-center gap-1.5 font-medium"><Calendar size={14} /> {photo.event_date}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}