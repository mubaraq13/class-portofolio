// src/pages/admin/ManageStories.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { BookOpen, LogOut, Home, Trash2, Clock, User } from 'lucide-react';

export default function ManageStories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSessionAndFetchData();
  }, []);

  const checkSessionAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return navigate('/admin/login');

    try {
      const { data } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setStories(data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus cerita ini secara permanen?");
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
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
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
          <Link to="/admin/messages" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Messages</Link>
          {/* Menu Stories Aktif */}
          <Link to="/admin/stories" className="block px-4 py-3 bg-white/10 text-cyan-400 rounded-xl font-medium">Manage Stories</Link>
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-white transition-colors"><Home size={18} /> View Website</Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-xl transition-colors"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900">Manage Stories</h1>
          <p className="text-slate-500">Moderasi cerita atau blog yang ditulis oleh anggota kelas.</p>
        </div>

        {/* TABEL DAFTAR CERITA */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-semibold w-1/4">Judul & Penulis</th>
                <th className="p-4 font-semibold w-1/2">Cuplikan Isi</th>
                <th className="p-4 font-semibold text-center w-1/4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {stories.length === 0 ? (
                <tr><td colSpan="3" className="p-8 text-center text-slate-500">Belum ada cerita yang masuk.</td></tr>
              ) : (
                stories.map((story) => (
                  <tr key={story.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 align-top">
                      <p className="font-bold text-navy-900 text-base mb-1">{story.title}</p>
                      <p className="text-xs font-semibold text-cyan-600 flex items-center gap-1 mb-1">
                        <User size={12} /> {story.author}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {formatDateTime(story.created_at)}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      <p className="line-clamp-3 leading-relaxed">{story.content}</p>
                    </td>
                    <td className="p-4 text-center align-top">
                      <button 
                        onClick={() => handleDelete(story.id)} 
                        title="Hapus Cerita"
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