// src/pages/admin/ManageMessages.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { MessageSquare, LogOut, Home, Trash2, Clock } from 'lucide-react';

export default function ManageMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSessionAndFetchData();
  }, []);

  const checkSessionAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return navigate('/admin/login');

    try {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus pesan ini permanen?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (error) throw error;
      
      // Hapus dari state
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (error) {
      alert("Gagal menghapus pesan: " + error.message);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
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
          <Link to="/admin/members" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Members</Link>
          <Link to="/admin/projects" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Projects</Link>
          <Link to="/admin/gallery" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Gallery</Link>
          <Link to="/admin/timeline" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Timeline</Link>
          <Link to="/admin/messages" className="block px-4 py-3 bg-white/10 text-cyan-400 rounded-xl font-medium">Manage Messages</Link>
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
            <h1 className="text-3xl font-bold text-navy-900">Manage Messages</h1>
            <p className="text-slate-500">Moderasi pesan yang masuk dari pengunjung.</p>
          </div>
        </div>

        {/* TABEL DAFTAR PESAN */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-semibold w-1/4">Pengirim & Waktu</th>
                <th className="p-4 font-semibold w-1/2">Isi Pesan</th>
                <th className="p-4 font-semibold text-center w-1/4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr><td colSpan="3" className="p-8 text-center text-slate-500">Belum ada pesan yang masuk.</td></tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 align-top">
                      <p className="font-bold text-navy-900">{msg.name}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <Clock size={12} /> {formatDateTime(msg.created_at)}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-slate-600 whitespace-pre-wrap">
                      {msg.message}
                    </td>
                    <td className="p-4 text-center align-top">
                      <button 
                        onClick={() => handleDelete(msg.id)} 
                        title="Hapus Spam/Pesan"
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-block"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}