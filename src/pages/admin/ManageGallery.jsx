// src/pages/admin/ManageGallery.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Image as ImageIcon, Film, Plus, Trash2, Edit, Calendar, X, ArrowLeft } from 'lucide-react';
import ImageModal from '../../components/ImageModal';

export default function ManageGallery() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [classId, setClassId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', category: 'Kegiatan Kelas', description: '', event_date: '', image: null, existing_image_url: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => { checkSessionAndFetchData(); }, []);

  const checkSessionAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return navigate('/admin/login');
    try {
      const { data: classData } = await supabase.from('classes').select('id').limit(1).maybeSingle();
      if (classData) setClassId(classData.id);
      const { data: galleryData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (galleryData) setPhotos(galleryData);
    } catch (error) { console.error("Error:", error); } finally { setLoading(false); }
  };

  const handleEditClick = (photo) => {
    setEditingId(photo.id);
    setFormData({
      title: photo.title || '', category: photo.category || 'Kegiatan Kelas', description: photo.description || '', event_date: photo.event_date || '', image: null, existing_image_url: photo.image_url || ''
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: '', category: 'Kegiatan Kelas', description: '', event_date: '', image: null, existing_image_url: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus media ini?")) return;
    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
      setPhotos(photos.filter(photo => photo.id !== id));
    } catch (error) { alert("Gagal menghapus: " + error.message); }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!classId) return alert("ID Kelas belum ada!");
    
    setUploading(true);
    try {
      let mediaUrl = editingId ? formData.existing_image_url : '';
      if (formData.image) mediaUrl = await uploadImage(formData.image, 'gallery-images');
      if (!mediaUrl) return alert("File wajib diisi!");

      if (editingId) {
        const { error } = await supabase.from('gallery').update({
          title: formData.title, category: formData.category, description: formData.description, event_date: formData.event_date || null, image_url: mediaUrl
        }).eq('id', editingId);
        if (error) throw error;
        alert("Galeri berhasil diupdate! ✨");
      } else {
        const { error } = await supabase.from('gallery').insert([{
          class_id: classId, title: formData.title, category: formData.category, description: formData.description, event_date: formData.event_date || null, image_url: mediaUrl
        }]);
        if (error) throw error;
        alert("Berhasil ditambahkan! 🎉");
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
        <div><h1 className="text-3xl font-bold text-navy-900">Manage Gallery</h1><p className="text-slate-500">Kelola foto dan video kelas.</p></div>
        <button onClick={isAdding ? handleCancel : () => setIsAdding(true)} className="flex items-center gap-2 bg-cyan-500 text-navy-900 px-5 py-2.5 rounded-xl font-bold">
          {isAdding ? "Batal" : <><Plus size={20} /> Upload Media</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-cyan-200 mb-8 animate-in fade-in">
          <h2 className="text-xl font-bold text-navy-900 mb-4">{editingId ? "Edit Media ✏️" : "Upload Media Baru"}</h2>
          <form onSubmit={handleAddPhoto} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div><label className="block text-sm font-semibold mb-1">Judul</label><input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-cyan-500 outline-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold mb-1">Kategori</label><select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-cyan-500 outline-none"><option value="Kegiatan Kelas">Kegiatan Kelas</option><option value="Kunjungan Industri">Kunjungan Industri</option><option value="Video Cinematic">Video Cinematic</option><option value="Bebas">Bebas</option></select></div>
                <div><label className="block text-sm font-semibold mb-1">Tanggal</label><input type="date" value={formData.event_date} onChange={(e) => setFormData({...formData, event_date: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-cyan-500 outline-none" /></div>
              </div>
              <div><label className="block text-sm font-semibold mb-1">Keterangan</label><textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-cyan-500 outline-none" rows="2"></textarea></div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">File Media {editingId && <span className="text-cyan-500">(Opsional jika tak diganti)</span>}</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center h-full flex flex-col justify-center items-center hover:border-cyan-500">
                <input type="file" accept="image/*, video/mp4, video/webm" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} className="text-sm cursor-pointer" />
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3"><button type="button" onClick={handleCancel} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100">Batal</button><button type="submit" disabled={uploading} className="bg-navy-900 text-cyan-400 px-8 py-3 rounded-xl font-bold">{uploading ? "Mengunggah..." : "Simpan"}</button></div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-black rounded-2xl shadow-sm border border-slate-100 overflow-hidden group relative">
            <div className="aspect-square overflow-hidden cursor-pointer relative" onClick={() => setSelectedImage(photo.image_url)}>
              {isVideoFile(photo.image_url) ? (
                <video src={photo.image_url} className="w-full h-full object-cover opacity-80" muted />
              ) : (
                <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              )}
            </div>
            
            <div className="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 pointer-events-none">
              <div>
                <h3 className="font-bold text-white text-sm line-clamp-2">{photo.title}</h3>
              </div>
              <div className="flex gap-2 self-end pointer-events-auto">
                <button onClick={(e) => { e.stopPropagation(); handleEditClick(photo); }} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"><Edit size={16} /></button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(photo.id); }} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}