// src/pages/Projects.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Briefcase, ExternalLink, Calendar, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageModal from '../components/ImageModal';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('year', { ascending: false });

        if (error) throw error;
        if (data) setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fungsi pintar mendeteksi ekstensi video
  const isVideoFile = (url) => {
    return url?.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      
      {/* HEADER HALAMAN (Gaya Gradasi & Kaca) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cyan-300 font-semibold text-sm mb-4 border border-white/20 backdrop-blur-md shadow-sm">
          <Briefcase size={18} /> Portofolio Kelas
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4 drop-shadow-lg">
          Masterpiece Kami
        </h1>
        
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Kumpulan tugas akhir, inovasi, dan karya terbaik yang pernah kami ciptakan.
        </p>
      </motion.div>

      {/* GRID PROJECT */}
      {projects.length === 0 ? (
        <div className="text-center text-slate-500 bg-white/95 backdrop-blur-md p-12 rounded-3xl border border-white/20 shadow-sm max-w-2xl mx-auto">
          Belum ada karya atau project yang diunggah.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 group flex flex-col hover:-translate-y-1"
            >
              {/* AREA MEDIA (COVER PROJECT) */}
              <div 
                className="h-56 overflow-hidden relative cursor-pointer bg-black"
                onClick={() => setSelectedImage(project.cover_image)}
              >
                
                {isVideoFile(project.cover_image) ? (
                  <>
                    {/* TAMPILAN VIDEO */}
                    <video 
                      src={project.cover_image} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      muted playsInline loop
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity group-hover:opacity-0">
                      <div className="bg-black/40 p-3 rounded-full text-white backdrop-blur-sm border border-white/20">
                        <Film size={24} />
                      </div>
                    </div>
                  </>
                ) : (
                  /* TAMPILAN GAMBAR/FOTO */
                  <img 
                    src={project.cover_image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                
                {/* Badge Kategori di Atas Kiri */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-navy-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {project.category}
                </div>

                {/* Overlay Hover Gelap (Petunjuk Klik) */}
                <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="bg-white/20 text-white backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold tracking-wide border border-white/30 shadow-lg">
                    Lihat Preview
                  </span>
                </div>
              </div>

              {/* KONTEN BAWAH (Info Project) */}
              <div className="p-6 flex flex-col flex-1 bg-white/80">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-navy-900 line-clamp-2">{project.title}</h3>
                </div>
                
                <p className="text-slate-600 text-sm mb-6 flex-1">
                  {project.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                    <Calendar size={16} /> {project.year}
                  </div>
                  
                  {project.project_url && (
                    <a 
                      href={project.project_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-600 hover:text-cyan-700 bg-cyan-50 hover:bg-cyan-100 px-4 py-2 rounded-xl transition-colors shadow-sm"
                    >
                      Lihat Demo <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      )}

      {/* MODAL GAMBAR & VIDEO */}
      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

    </div>
  );
}