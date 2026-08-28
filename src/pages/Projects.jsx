// src/pages/Projects.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Briefcase, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageModal from '../components/ImageModal'; // 1. Import komponen Modal

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 2. Tambahkan state untuk Modal
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('year', { ascending: false }); // Urutkan tahun terbaru di atas

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
          <Briefcase size={18} /> Portofolio Kelas
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4 drop-shadow-lg">Masterpiece Kami</h1>
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Kumpulan tugas akhir, inovasi, dan karya terbaik yang pernah kami ciptakan.
        </p>
      </motion.div>

      {/* GRID PROJECT */}
      {projects.length === 0 ? (
        <div className="text-center text-slate-500 bg-white p-12 rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
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
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* AREA GAMBAR (Sekarang Bisa Diklik) */}
              <div 
                className="h-56 overflow-hidden relative cursor-pointer"
                onClick={() => setSelectedImage(project.cover_image)} // 3. Fungsi klik untuk buka modal
              >
                <img 
                  src={project.cover_image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge Kategori */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-navy-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {project.category}
                </div>

                {/* Overlay Hover (Petunjuk Klik) */}
                <div className="absolute inset-0 bg-navy-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-navy-900/80 text-cyan-400 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold tracking-wide shadow-lg">
                    Perbesar Gambar
                  </span>
                </div>
              </div>

              {/* KONTEN BAWAH (Info Project) */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-navy-900 line-clamp-2">{project.title}</h3>
                </div>
                
                <p className="text-slate-600 text-sm mb-6 flex-1">
                  {project.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                    <Calendar size={16} /> {project.year}
                  </div>
                  
                  {project.project_url && (
                    <a 
                      href={project.project_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-600 hover:text-cyan-700 bg-cyan-50 hover:bg-cyan-100 px-4 py-2 rounded-xl transition-colors"
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

      {/* 4. MODAL GAMBAR */}
      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

    </div>
  );
}