// src/pages/admin/ManageTimeline.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit, ArrowLeft, Image as ImageIcon, Film, Upload } from 'lucide-react';

export default function ManageTimeline() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [classId, setClassId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', event_date: '', description: '', image_url: '' });
  const [uploadFile, setUploadFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [mediaType, setMediaType] = useState('image'); // 'image' atau 'video'

  useEffect(() => { checkSessionAndFetchData(); }, []);

  const checkSessionAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return navigate('/admin/login');
    try {
      const { data: classData } = await supabase.from('classes').select('id').limit(1).maybeSingle();
      if (classData) setClassId(classData.id);
      const { data: timelineData } = await supabase.from('timeline').select('*').order('event_date', { ascending: false });
      if (timelineData) setEvents(timelineData);
    } catch (error) { console.error("Error:", error); } finally { setLoading(false); }
  };

  // Cek apakah URL/File adalah Video
  const isVideo = (urlOrType) => {
    if (!urlOrType) return false;
    return urlOrType.match(/\.(mp4|webm|ogg)$/i) || urlOrType.startsWith('video/');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMediaType(file.type.startsWith('video/') ? 'video' : 'image');
    }
  };

  const handleEditClick = (event) => {
    setEditingId(event.id);
    setFormData({ title: event.title, event_date: event.event_date, description: event.description, image_url: event.image_url || '' });
    
    const url = event.image_url || '';
    setPreviewUrl(url);
    setMediaType(isVideo(url) ? 'video' : 'image');
    setUploadFile(null);
    
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: '', event_date: '', description: '', image_url: '' });
    setUploadFile(null);
    setPreviewUrl(null);
    setMediaType('image');
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus momen ini?")) return;
    try {
      const { error } = await supabase.from('timeline').delete().eq('id', id);
      if (error) throw error;
      setEvents(events.filter(e => e.id !== id));
    } catch (error) { alert("Gagal menghapus: " + error.message); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classId) return alert("ID Kelas belum ada!");
    setSubmitting(true);
    
    try {
      let finalImageUrl = formData.image_url;

      // PROSES UPLOAD MEDIA (FOTO/VIDEO)
      if (uploadFile) {
        const fileExt = uploadFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('timeline')
          .upload(filePath, uploadFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('timeline')
          .getPublicUrl(filePath);

        finalImageUrl = publicUrlData.publicUrl;
      }

      // SIMPAN KE DATABASE
      if (editingId) {
        const { error } = await supabase.from('timeline').update({
          title: formData.title, event_date: formData.event_date, description: formData.description, image_url: finalImageUrl
        }).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('timeline').insert([{
          class_id: classId, title: formData.title, event_date: formData.event_date, description: formData.description, image_url: finalImageUrl
        }]);
        if (error) throw error;
      }
      handleCancel();
      checkSessionAndFetchData();
    } catch (error) { 
      alert("Gagal menyimpan: " + error.message); 
    } finally { 
      setSubmitting(false); 
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div></div>;

  return (
    <div className="p-6 md:p-10">
        
      <div className="mb-6">
        <Link 
          to="/admin/dashboard" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-100 font-semibold text-sm transition-all"
        >
          <ArrowLeft size={18} /> Kembali ke Dashboard
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-navy-900">Manage Timeline</h1><p className="text-slate-500">Kelola catatan momen penting kelas.</p></div>
        <button onClick={isAdding ? handleCancel : () => setIsAdding(true)} className="flex items-center gap-2 bg-cyan-500 text-navy-900 px-5 py-2.5 rounded-xl font-bold">
          {isAdding ? "Batal" : <><Plus size={20} /> Add Event</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-cyan-200 mb-8 animate-in fade-in">
          <h2 className="text-xl font-bold text-navy-900 mb-4">{editingId ? "Edit Momen ✏️" : "Tambah Momen Baru 🚀"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-1">Judul Peristiwa</label><input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-cyan-500 outline-none" placeholder="Coba Praktikum Kimia..." /></div>
              <div><label className="block text-sm font-semibold mb-1">Tanggal</label><input type="date" required value={formData.event_date} onChange={(e) => setFormData({...formData, event_date: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-cyan-500 outline-none" /></div>
            </div>
            
            {/* INPUT MEDIA (FOTO/VIDEO) */}
            <div>
              <label className="block text-sm font-semibold mb-2">Upload Foto/Video (Opsional)</label>
              <div className="flex items-center gap-4">
                {previewUrl ? (
                  mediaType === 'video' ? (
                    <video src={previewUrl} className="w-24 h-24 object-cover rounded-xl border-2 border-cyan-200" controls />
                  ) : (
                    <img src={previewUrl} alt="Preview" className="w-24 h-24 object-cover rounded-xl border-2 border-cyan-200" />
                  )
                ) : (
                  <div className="w-24 h-24 flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl gap-1">
                    <div className="flex gap-1">
                      <ImageIcon size={18} className="text-slate-400" />
                      <Film size={18} className="text-slate-400" />
                    </div>
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors w-full">
                  <Upload size={20} className="text-slate-400" />
                  <span className="text-sm text-slate-500 font-medium">Pilih Foto atau Video...</span>
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>

            <div><label className="block text-sm font-semibold mb-1">Keterangan / Cerita</label><textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-cyan-500 outline-none" rows="3" placeholder="Ceritain momen serunya di sini..."></textarea></div>
            
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={handleCancel} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100">Batal</button>
              <button type="submit" disabled={submitting} className="bg-navy-900 text-cyan-400 px-8 py-3 rounded-xl font-bold disabled:opacity-50 flex items-center gap-2">
                {submitting ? "Menyimpan..." : "Simpan Data"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABEL DATA */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead><tr className="bg-slate-50 text-slate-500 text-sm border-b"><th className="p-4 font-semibold w-24">Media</th><th className="p-4 font-semibold">Tanggal</th><th className="p-4 font-semibold">Momen / Judul</th><th className="p-4 font-semibold text-center w-28">Aksi</th></tr></thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b hover:bg-slate-50">
                  <td className="p-4">
                    {event.image_url ? (
                      isVideo(event.image_url) ? (
                        <div className="relative w-16 h-16 rounded-lg shadow-sm border overflow-hidden bg-slate-900">
                          <video src={event.image_url} className="w-full h-full object-cover opacity-80" muted />
                          <Film size={16} className="absolute inset-0 m-auto text-white/70" />
                        </div>
                      ) : (
                        <img src={event.image_url} alt="Event" className="w-16 h-16 object-cover rounded-lg shadow-sm border" />
                      )
                    ) : (
                      <div className="w-16 h-16 flex flex-col items-center justify-center bg-slate-100 rounded-lg gap-1">
                        <ImageIcon size={18} className="text-slate-300" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-semibold text-slate-600 whitespace-nowrap">{event.event_date}</td>
                  <td className="p-4"><h3 className="font-bold text-navy-900">{event.title}</h3><p className="text-sm text-slate-500 line-clamp-2">{event.description}</p></td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button onClick={() => handleEditClick(event)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(event.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
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