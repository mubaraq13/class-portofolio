// src/pages/Messages.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MessageSquare, Send, User, Clock, Edit2, Trash2, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false }); 

      if (error) throw error;
      if (data) setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (msg) => {
    setEditingId(msg.id);
    setFormData({
      name: msg.name,
      message: msg.message
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', message: '' });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus pesan ini?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (error) throw error;
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (error) {
      alert("Gagal menghapus pesan: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setSubmitting(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('messages')
          .update({
            name: formData.name,
            message: formData.message
          })
          .eq('id', editingId);

        if (error) throw error;
        alert("Pesan berhasil diperbarui! ✨");
      } else {
        const { error } = await supabase.from('messages').insert([
          {
            name: formData.name,
            message: formData.message
          }
        ]);

        if (error) throw error;
        alert("Yeay! Pesanmu berhasil dikirim! 🚀");
      }

      handleCancelEdit();
      fetchMessages();
      
    } catch (error) {
      alert("Gagal menyimpan pesan: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
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
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 font-semibold text-sm mb-4 border border-cyan-100">
          <MessageSquare size={18} /> Ruang Pesan
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4 drop-shadow-lg">Wall of Messages</h1>
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Tinggalkan jejakmu di sini. Tulis salam, pesan, atau kesan untuk kelas kami!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start overflow-hidden">
        
        {/* FORM KIRIM / EDIT PESAN */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`lg:col-span-5 bg-white p-8 rounded-3xl border shadow-xl sticky top-24 transition-colors ${editingId ? 'border-amber-300 shadow-amber-500/10' : 'border-slate-100 shadow-cyan-500/5'}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
              {editingId ? "Edit Pesan" : "Tulis Pesan"} {editingId ? "✏️" : "✍️"}
            </h2>
            {editingId && (
              <button onClick={handleCancelEdit} className="text-slate-400 hover:text-red-500 bg-slate-100 p-2 rounded-full transition-colors">
                <X size={18} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Kamu (Boleh Anonim)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400" />
                </div>
                <input 
                  type="text" required maxLength="50"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-11 p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none bg-slate-50 focus:bg-white transition-colors" 
                  placeholder="Contoh: Hamba Allah" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Pesan & Kesan</label>
              <textarea 
                required rows="4" maxLength="500"
                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none bg-slate-50 focus:bg-white transition-colors resize-none" 
                placeholder="Halo semuanya, semangat terus ya belajarnya!..."
              ></textarea>
            </div>

            <div className="flex gap-3">
              {editingId && (
                <button 
                  type="button" onClick={handleCancelEdit}
                  className="w-1/3 flex items-center justify-center bg-slate-100 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
              )}
              <button 
                type="submit" disabled={submitting}
                className={`${editingId ? 'w-2/3 bg-amber-500 hover:bg-amber-600' : 'w-full bg-navy-900 hover:bg-navy-800'} text-white py-4 rounded-xl font-bold disabled:opacity-50 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
              >
                {submitting ? "Memproses..." : (editingId ? <><Edit2 size={18} /> Update Pesan</> : <><Send size={18} /> Kirim Pesan Sekarang</>)}
              </button>
            </div>
          </form>
        </motion.div>

        {/* DAFTAR PESAN */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-7 min-w-0" 
        >
          {messages.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-slate-500">
              <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
              <p>Belum ada pesan. Jadilah yang pertama mengirim pesan!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white p-6 md:p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all relative overflow-hidden ${editingId === msg.id ? 'border-amber-300 ring-4 ring-amber-50' : 'border-slate-100'}`}
                >
                  <div className="flex items-start justify-between mb-4 gap-4">
                    
                    {/* INFO PENGIRIM: PERBAIKAN LEBAR AGAR TIDAK TEMBUS */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        {/* break-words akan memotong nama panjang tanpa spasi */}
                        <h3 className="font-bold text-navy-900 text-lg break-words leading-tight">{msg.name}</h3>
                        <p className="text-xs font-semibold text-slate-400 flex items-center gap-1 mt-1">
                          <Clock size={12} /> {formatDateTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                    
                    {/* TOMBOL EDIT DAN HAPUS */}
                    <div className="flex gap-2 shrink-0">
                      <button 
                        onClick={() => handleEditClick(msg)}
                        className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Pesan"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(msg.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Pesan"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative">
                    <span className="absolute -top-4 -left-2 text-4xl text-cyan-200">"</span>
                    {/* PERBAIKAN ISI PESAN: Tambah break-words agar teks acak otomatis dipotong ke bawah */}
                    <p className="text-slate-600 leading-relaxed relative z-10 whitespace-pre-wrap break-words">
                      {msg.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}