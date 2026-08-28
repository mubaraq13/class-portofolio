// src/pages/admin/ManageProjects.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Briefcase, LogOut, Home, Plus, Trash2, Image as ImageIcon, ExternalLink } from 'lucide-react';
import ImageModal from '../../components/ImageModal';

export default function ManageProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [classId, setClassId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tugas Akhir',
    description: '',
    project_url: '',
    year: new Date().getFullYear(),
    cover: null
  });

  // State untuk Modal Gambar
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    checkSessionAndFetchData();
  }, []);

  const checkSessionAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return navigate('/admin/login');

    try {
      const { data: classData } = await supabase.from('classes').select('id').limit(1).maybeSingle();
      if (classData) setClassId(classData.id);

      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (projectsData) setProjects(projectsData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!classId) return alert("ID Kelas belum ada!");
    if (!formData.cover) return alert("Cover project wajib diisi!");
    
    setUploading(true);
    try {
      const coverUrl = await uploadImage(formData.cover, 'project-images');

      const { error } = await supabase.from('projects').insert([
        {
          class_id: classId,
          title: formData.title,
          category: formData.category,
          description: formData.description,
          project_url: formData.project_url,
          year: formData.year,
          cover_image: coverUrl
        }
      ]);

      if (error) throw error;

      alert("Project berhasil ditambahkan! 🚀");
      setIsAdding(false);
      setFormData({ 
        title: '', category: 'Tugas Akhir', description: '', project_url: '', year: new Date().getFullYear(), cover: null 
      });
      checkSessionAndFetchData();

    } catch (error) {
      alert("Gagal menambahkan project: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus project ini?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      alert("Gagal menghapus: " + error.message);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div></div>;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-navy-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-cyan-400 tracking-wider">ADMIN PANEL</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/admin/dashboard" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Dashboard</Link>
          <Link to="/admin/members" className="block px-4 py-3 bg-white/10 text-cyan-400 rounded-xl font-medium">Manage Members</Link>
          <Link to="/admin/projects" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Projects</Link>
          <Link to="/admin/gallery" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Gallery</Link>
          <Link to="/admin/timeline" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Timeline</Link>
          <Link to="/admin/messages" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Messages</Link>
          <Link to="/admin/stories" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Stories</Link>
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-white transition-colors">
            <Home size={18} /> View Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-xl transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Manage Projects</h1>
            <p className="text-slate-500">Pamerkan karya dan tugas terbaik kelas.</p>
          </div>
          <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 bg-cyan-500 text-navy-900 px-5 py-2.5 rounded-xl font-bold hover:bg-cyan-400 shadow-lg">
            {isAdding ? "Batal" : <><Plus size={20} /> Add Project</>}
          </button>
        </div>

        {/* FORM TAMBAH PROJECT */}
        {isAdding && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Tambah Project Baru</h2>
            <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Project</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none" placeholder="Contoh: Mesin Pencacah Plastik" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none">
                      <option value="Tugas Akhir">Tugas Akhir</option>
                      <option value="Praktikum">Praktikum</option>
                      <option value="Inovasi Mandiri">Inovasi Mandiri</option>
                      <option value="Lomba">Lomba</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tahun</label>
                    <input type="number" required value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Link Demo / Video (Opsional)</label>
                  <input type="url" value={formData.project_url} onChange={(e) => setFormData({...formData, project_url: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none" placeholder="https://youtube.com/..." />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none" rows="3" placeholder="Jelaskan tentang project ini..."></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Cover Project (Wajib, Maks 5MB)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center h-full flex flex-col justify-center items-center hover:border-cyan-500 transition-colors">
                  <ImageIcon size={40} className="text-slate-400 mb-2" />
                  <input type="file" required accept="image/png, image/jpeg, image/jpg, image/webp" onChange={(e) => setFormData({...formData, cover: e.target.files[0]})} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-cyan-50 file:text-cyan-700 cursor-pointer" />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit" disabled={uploading} className="bg-navy-900 text-cyan-400 px-8 py-3 rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50">
                  {uploading ? "Mengunggah..." : "Simpan Project"}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* GRID DAFTAR PROJECT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-100">Belum ada project yang diunggah.</div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
                
                {/* Gambar Cover - Bisa Diklik untuk Lightbox */}
                <div 
                  className="h-48 overflow-hidden relative cursor-pointer"
                  onClick={() => setSelectedImage(project.cover_image)}
                >
                  <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-navy-900 text-xs font-bold px-3 py-1 rounded-full">
                    {project.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-navy-900 line-clamp-1">{project.title}</h3>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{project.year}</span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{project.description}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    {project.project_url ? (
                      <a href={project.project_url} target="_blank" rel="noreferrer" className="text-cyan-600 hover:text-cyan-700 flex items-center gap-1 text-sm font-semibold">
                        <ExternalLink size={16} /> Link Demo
                      </a>
                    ) : (
                      <span className="text-sm text-slate-300">No Link</span>
                    )}
                    
                    <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Gambar */}
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

      </main>
    </div>
  );
}