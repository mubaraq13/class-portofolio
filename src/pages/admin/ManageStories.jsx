// src/pages/admin/ManageStories.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { BookOpen, Trash2, Clock, User, Edit, Plus, X, ArrowLeft } from 'lucide-react';

export default function ManageStories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '', content: '' });

  useEffect(() => { checkSessionAndFetchData(); }, []);

  const checkSessionAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return navigate('/admin/login');
    try {
      const { data } = await supabase.from('stories').select('*').order('created_at', { ascending: false });
      if (data) setStories(data);
    } catch (error) { console.error("Error:", error); } finally { setLoading(false); }
  };

  const handleEditClick = (story) => {
    setEditingId(story.id);
    setFormData({ title: story.title, author: story.author, content: story.content });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: '', author: '', content: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus cerita ini secara permanen?")) return;
    try {
      const { error } = await supabase.from('stories').delete().eq('id', id);
      if (error) throw error;
      setStories(stories.filter(story => story.id !== id));
    } catch (error) { alert("Gagal menghapus: " + error.message); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        const { error } = await supabase.from('stories').update({
          title: formData.title, author: formData.author, content: formData.content
        }).eq('id', editingId);
        if (error) throw error;
        alert("Cerita berhasil diupdate! ✨");
      } else {
        const { error } = await supabase.from('stories').insert([{
          title: formData.title, author: formData.author, content: formData.content
        }]);
        if (error) throw error;
        alert("Cerita berhasil ditambahkan! 📖");
      }
      handleCancel();
      checkSessionAndFetchData();
    } catch (error) { alert("Gagal menyimpan: " + error.message); } finally { setSubmitting(false); }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

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
        <div><h1 className="text-3xl font-bold text-navy-900">Manage Stories</h1><p className="text-slate-500">Moderasi cerita atau blog kelas.</p></div>
        <button onClick={isAdding ? handleCancel : () => setIsAdding(true)} className="flex items-center gap-2 bg-cyan-500 text-navy-900 px-5 py-2.5 rounded-xl font-bold shadow-lg hover:bg-cyan-400 transition-colors">
          {isAdding ? "Batal" : <><Plus size={20} /> Tulis Cerita</>}
        </button>
      </div>

      {/* FORM TAMBAH / EDIT CERITA */}
      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-cyan-200 mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-bold text-navy-900 mb-4">{editingId ? "Edit Cerita ✏️" : "Tulis Cerita Baru 📖"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-1 text-slate-700">Judul Cerita</label><input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" /></div>
              <div><label className="block text-sm font-semibold mb-1 text-slate-700">Penulis</label><input type="text" required value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" /></div>
            </div>
            <div><label className="block text-sm font-semibold mb-1 text-slate-700">Isi Cerita</label><textarea required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" rows="5"></textarea></div>
            <div className="flex justify-end gap-3"><button type="button" onClick={handleCancel} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Batal</button><button type="submit" disabled={submitting} className="bg-navy-900 text-cyan-400 px-8 py-3 rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50 transition-colors">{submitting ? "Menyimpan..." : (editingId ? "Update Cerita" : "Simpan Cerita")}</button></div>
          </form>
        </div>
      )}

      {/* TABEL DAFTAR CERITA */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-semibold w-1/4">Judul & Penulis</th>
                <th className="p-4 font-semibold w-1/2">Cuplikan Isi</th>
                <th className="p-4 font-semibold text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {stories.length === 0 ? (
                <tr><td colSpan="3" className="p-8 text-center text-slate-500">Belum ada cerita yang ditambahkan.</td></tr>
              ) : (
                stories.map((story) => (
                  <tr key={story.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 align-top">
                      <p className="font-bold text-navy-900">{story.title}</p>
                      <p className="text-xs text-cyan-600 mt-1 flex items-center gap-1"><User size={12}/> {story.author}</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> {formatDateTime(story.created_at)}</p>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      <p className="line-clamp-3">{story.content}</p>
                    </td>
                    <td className="p-4 text-center align-top">
                      <div className="flex justify-center items-center gap-2">
                        <button onClick={() => handleEditClick(story)} title="Edit" className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(story.id)} title="Hapus" className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}