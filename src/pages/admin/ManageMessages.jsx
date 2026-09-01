// src/pages/admin/ManageMessages.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Trash2, Edit, ArrowLeft } from 'lucide-react';

export default function ManageMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', message: '' });

  useEffect(() => { checkSessionAndFetchData(); }, []);

  const checkSessionAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return navigate('/admin/login');
    try {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
      if (data) setMessages(data);
    } catch (error) { console.error("Error:", error); } finally { setLoading(false); }
  };

  const handleEditClick = (msg) => {
    setEditingId(msg.id);
    setFormData({ name: msg.name, message: msg.message });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ name: '', message: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pesan ini permanen?")) return;
    try {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (error) throw error;
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (error) { alert("Gagal menghapus pesan: " + error.message); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('messages').update({
        name: formData.name, message: formData.message
      }).eq('id', editingId);
      
      if (error) throw error;
      alert("Pesan berhasil diupdate! ✨");
      handleCancel();
      checkSessionAndFetchData();
    } catch (error) { alert("Gagal menyimpan: " + error.message); } finally { setSubmitting(false); }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900">Manage Messages</h1>
        <p className="text-slate-500">Moderasi pesan yang masuk dari pengunjung.</p>
      </div>

      {/* FORM EDIT PESAN */}
      {isEditing && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-200 mb-8 animate-in fade-in">
          <h2 className="text-xl font-bold text-navy-900 mb-4">Edit Pesan ✏️</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-semibold mb-1">Nama Pengirim</label><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-cyan-500 outline-none" /></div>
            <div><label className="block text-sm font-semibold mb-1">Isi Pesan</label><textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full p-3 rounded-xl border focus:ring-cyan-500 outline-none" rows="3"></textarea></div>
            <div className="flex justify-end gap-3"><button type="button" onClick={handleCancel} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100">Batal</button><button type="submit" disabled={submitting} className="bg-amber-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-600">{submitting ? "Menyimpan..." : "Update Pesan"}</button></div>
          </form>
        </div>
      )}

      {/* TABEL DAFTAR PESAN (DENGAN SCROLL HORIZONTAL MOBILE) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b">
                <th className="p-4 font-semibold w-1/4">Pengirim & Waktu</th>
                <th className="p-4 font-semibold w-1/2">Isi Pesan</th>
                <th className="p-4 font-semibold text-center w-1/4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr><td colSpan="3" className="p-8 text-center text-slate-500">Belum ada pesan masuk.</td></tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="border-b hover:bg-slate-50">
                    <td className="p-4 align-top">
                      <p className="font-bold text-navy-900">{msg.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{formatDateTime(msg.created_at)}</p>
                    </td>
                    <td className="p-4 text-sm text-slate-600 whitespace-pre-wrap">{msg.message}</td>
                    <td className="p-4 text-center align-top">
                      <div className="flex justify-center items-center gap-2">
                        <button onClick={() => handleEditClick(msg)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(msg.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
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