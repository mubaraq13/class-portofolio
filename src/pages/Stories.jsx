// src/pages/Stories.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BookOpen, User, Clock, Edit3, Trash2, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk form (Tambah / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: ''
  });

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setStories(data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (story = null) => {
    if (story) {
      setEditingId(story.id);
      setFormData({ title: story.title, author: story.author, content: story.content });
    } else {
      setEditingId(null);
      setFormData({ title: '', author: '', content: '' });
    }
    setIsFormOpen(true);
    document.body.style.overflow = 'hidden'; // Kunci scroll
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ title: '', author: '', content: '' });
    document.body.style.overflow = 'unset'; // Buka scroll
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim() || !formData.content.trim()) return;

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
        alert("Cerita barumu berhasil dipublish! 📖");
      }
      handleCloseForm();
      fetchStories();
    } catch (error) {
      alert("Gagal menyimpan cerita: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus cerita ini selamanya?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from('stories').delete().eq('id', id);
      if (error) throw error;
      setStories(stories.filter(story => story.id !== id));
    } catch (error) {
      alert("Gagal menghapus cerita: " + error.message);
    }
  };

  const formatDateTime = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div></div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen relative">
      
      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 font-semibold text-sm mb-4 border border-cyan-100">
          <BookOpen size={18} /> Cerita Kelas
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4 drop-shadow-lg">Class Diary</h1>
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Kumpulan artikel, cerita seru, dan pengalaman tak terlupakan selama di kelas.
        </p>
        <button 
          onClick={() => handleOpenForm()}
          className="bg-navy-900 text-cyan-400 px-8 py-4 rounded-full font-bold hover:bg-navy-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
        >
          <Edit3 size={20} /> Tulis Cerita Baru
        </button>
      </motion.div>

      {/* DAFTAR CERITA */}
      {stories.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-slate-500">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <p>Belum ada cerita yang ditulis. Yuk mulai sejarah pertamamu!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {stories.map((story, index) => (
            <motion.article 
              key={story.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-navy-900 mb-2 leading-tight">{story.title}</h2>
                  <div className="flex items-center gap-4 text-sm font-semibold text-slate-400">
                    <span className="flex items-center gap-1 text-cyan-600"><User size={16} /> {story.author}</span>
                    <span className="flex items-center gap-1"><Clock size={16} /> {formatDateTime(story.created_at)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenForm(story)} className="p-2 text-slate-400 hover:text-amber-500 bg-slate-50 hover:bg-amber-50 rounded-lg transition-colors"><Edit3 size={16} /></button>
                  <button onClick={() => handleDelete(story.id)} className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg">{story.content}</p>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* MODAL FORM TULIS CERITA */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-900/90 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                  {editingId ? "Edit Cerita ✍️" : "Tulis Cerita Baru 📖"}
                </h2>
                <button onClick={handleCloseForm} className="text-slate-400 hover:text-red-500 p-2"><X size={24} /></button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Cerita</label>
                    <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Contoh: Tragedi Lupa Bawa PR Fisika..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Penulis</label>
                    <input type="text" required value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Nama Kamu..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Isi Cerita</label>
                    <textarea required rows="8" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none resize-none" placeholder="Pada suatu hari di sudut kelas..."></textarea>
                  </div>
                  <button type="submit" disabled={submitting} className="w-full bg-navy-900 text-cyan-400 py-4 rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50 transition-all flex justify-center items-center gap-2">
                    {submitting ? "Menyimpan..." : <><Send size={18} /> Publish Cerita</>}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}