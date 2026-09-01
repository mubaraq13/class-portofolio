// src/pages/admin/ManageProjects.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Briefcase, Image as ImageIcon, Film, Plus, Trash2, Edit, ExternalLink, X, ArrowLeft } from 'lucide-react';

export default function ManageProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [classId, setClassId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', category: 'Website', description: '', year: new Date().getFullYear().toString(), project_url: '', cover_file: null, existing_cover_url: ''
  });

  useEffect(() => { checkSessionAndFetchData(); }, []);

  const checkSessionAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return navigate('/admin/login');
    try {
      const { data: classData } = await supabase.from('classes').select('id').limit(1).maybeSingle();
      if (classData) setClassId(classData.id);
      const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (projectsData) setProjects(projectsData);
    } catch (error) { console.error("Error:", error); } finally { setLoading(false); }
  };

  const handleEditClick = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title, category: project.category, description: project.description || '', year: project.year || '', project_url: project.project_url || '', cover_file: null, existing_cover_url: project.cover_image || ''
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: '', category: 'Website', description: '', year: new Date().getFullYear().toString(), project_url: '', cover_file: null, existing_cover_url: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus project ini?")) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) { alert("Gagal menghapus: " + error.message); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classId) return alert("ID Kelas belum ada!");
    
    setUploading(true);
    try {
      let coverUrl = editingId ? formData.existing_cover_url : '';
      if (formData.cover_file) coverUrl = await uploadImage(formData.cover_file, 'project-covers');
      if (!coverUrl) return alert("File Cover wajib diisi!");

      // Trik agar URL kosong aman masuk database
      const finalProjectUrl = formData.project_url.trim() === '' ? null : formData.project_url;

      if (editingId) {
        const { error } = await supabase.from('projects').update({
          title: formData.title, category: formData.category, description: formData.description, year: formData.year, project_url: finalProjectUrl, cover_image: coverUrl
        }).eq('id', editingId);
        if (error) throw error;
        alert("Project berhasil diperbarui! ✨");
      } else {
        const { error } = await supabase.from('projects').insert([{
          class_id: classId, title: formData.title, category: formData.category, description: formData.description, year: formData.year, project_url: finalProjectUrl, cover_image: coverUrl
        }]);
        if (error) throw error;
        alert("Project berhasil ditambahkan! 🚀");
      }
      handleCancel();
      checkSessionAndFetchData();
    } catch (error) { alert("Gagal menyimpan: " + error.message); } finally { setUploading(false); }
  };

  const isVideoFile = (url) => url?.match(/\.(mp4|webm|ogg)(\?.*)?$/i);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div></div>;

  return (
    <div className="p-6 md:p-10">
      
      {/* TOMBOL KEMBALI KE DASHBOARD */}
      <div className="mb-6">
        <Link 
          to="/admin/dashboard" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-100 font-semibold text-sm transition-all"
        >
          <ArrowLeft size={18} /> Kembali ke Dashboard
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-navy-900">Manage Projects</h1><p className="text-slate-500">Kelola portofolio karya kelas.</p></div>
        <button onClick={isAdding ? handleCancel : () => setIsAdding(true)} className="flex items-center gap-2 bg-cyan-500 text-navy-900 px-5 py-2.5 rounded-xl font-bold">
          {isAdding ? "Batal" : <><Plus size={20} /> Add Project</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-cyan-200 mb-8 animate-in fade-in">
          <h2 className="text-xl font-bold text-navy-900 mb-4">{editingId ? "Edit Project ✏️" : "Tambah Project Baru 🚀"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div><label className="block text-sm font-semibold mb-1">Nama Project</label><input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-cyan-500 outline-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold mb-1">Kategori</label><select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-cyan-500 outline-none"><option value="Website">Website</option><option value="Aplikasi">Aplikasi</option><option value="Film/Video">Film/Video</option><option value="Lainnya">Lainnya</option></select></div>
                <div><label className="block text-sm font-semibold mb-1">Tahun</label><input type="number" required value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-cyan-500 outline-none" /></div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Link URL <span className="text-cyan-500 font-normal">(Opsional)</span>
                </label>
                <input 
                  type="text" 
                  value={formData.project_url} 
                  onChange={(e) => setFormData({...formData, project_url: e.target.value})} 
                  placeholder="Contoh: https://... (Kosongkan jika tidak ada)"
                  className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-cyan-500 outline-none" 
                />
              </div>

              <div><label className="block text-sm font-semibold mb-1">Deskripsi</label><textarea value={formData.description} required onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-cyan-500 outline-none" rows="2"></textarea></div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Cover (Foto/Video) {editingId && <span className="text-cyan-500 font-normal">(Opsional)</span>}</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center h-full flex flex-col justify-center items-center hover:border-cyan-500 relative bg-slate-50">
                {editingId && formData.existing_cover_url && !formData.cover_file && (
                  <div className="absolute inset-0 opacity-20 pointer-events-none rounded-xl overflow-hidden">
                    {isVideoFile(formData.existing_cover_url) ? <video src={formData.existing_cover_url} className="w-full h-full object-cover" /> : <img src={formData.existing_cover_url} className="w-full h-full object-cover" />}
                  </div>
                )}
                <input type="file" accept="image/*, video/mp4, video/webm" onChange={(e) => setFormData({...formData, cover_file: e.target.files[0]})} className="text-sm z-10 cursor-pointer" />
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3"><button type="button" onClick={handleCancel} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100">Batal</button><button type="submit" disabled={uploading} className="bg-navy-900 text-cyan-400 px-8 py-3 rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50">{uploading ? "Menyimpan..." : (editingId ? "Update Project" : "Simpan Project")}</button></div>
          </form>
        </div>
      )}

      {/* TABEL DENGAN OVERFLOW UNTUK MOBILE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead><tr className="bg-slate-50 text-slate-500 text-sm border-b"><th className="p-4 font-semibold w-16">Cover</th><th className="p-4 font-semibold">Info Project</th><th className="p-4 font-semibold">Deskripsi</th><th className="p-4 font-semibold text-center">Aksi</th></tr></thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4"><div className="w-16 h-16 rounded-xl overflow-hidden bg-black relative">{isVideoFile(project.cover_image) ? <video src={project.cover_image} className="w-full h-full object-cover opacity-80" muted autoPlay loop playsInline /> : <img src={project.cover_image} className="w-full h-full object-cover" />}</div></td>
                  <td className="p-4"><h3 className="font-bold text-navy-900">{project.title}</h3><div className="flex gap-2 mt-1"><span className="text-xs font-semibold bg-cyan-50 text-cyan-700 px-2 rounded">{project.category}</span><span className="text-xs text-slate-400">{project.year}</span></div></td>
                  <td className="p-4 text-sm text-slate-500">{project.description}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button onClick={() => handleEditClick(project)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(project.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}