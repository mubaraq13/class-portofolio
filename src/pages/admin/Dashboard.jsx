// src/pages/admin/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
// Tambahkan ikon BookOpen untuk Stories
import { Users, Briefcase, Image as ImageIcon, Clock, LogOut, Home, Plus, MessageSquare, ChevronRight, BookOpen } from 'lucide-react'; 

export default function Dashboard() {
  const navigate = useNavigate();
  // Tambahkan 'stories' ke state
  const [stats, setStats] = useState({ members: 0, projects: 0, gallery: 0, timeline: 0, messages: 0, stories: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSessionAndFetchStats();
  }, []);

  const checkSessionAndFetchStats = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return navigate('/admin/login');

    try {
      // Ambil jumlah data dari 6 tabel sekaligus!
      const [membersRes, projectsRes, galleryRes, timelineRes, messagesRes, storiesRes] = await Promise.all([
        supabase.from('members').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('gallery').select('id', { count: 'exact', head: true }),
        supabase.from('timeline').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }),
        supabase.from('stories').select('id', { count: 'exact', head: true }) // Query Stories
      ]);

      setStats({
        members: membersRes.count || 0,
        projects: projectsRes.count || 0,
        gallery: galleryRes.count || 0,
        timeline: timelineRes.count || 0,
        messages: messagesRes.count || 0,
        stories: storiesRes.count || 0 // Masukkan ke state
      });

      const { data: recentMsg } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
        
      if (recentMsg) setRecentMessages(recentMsg);

    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
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
          <Link to="/admin/dashboard" className="block px-4 py-3 bg-white/10 text-cyan-400 rounded-xl font-medium">Dashboard</Link>
          <Link to="/admin/members" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Members</Link>
          <Link to="/admin/projects" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Projects</Link>
          <Link to="/admin/gallery" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Gallery</Link>
          <Link to="/admin/timeline" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Timeline</Link>
          <Link to="/admin/messages" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Messages</Link>
          {/* Menu Stories Ditambahkan di Sidebar Dashboard */}
          <Link to="/admin/stories" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Stories</Link>
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-white transition-colors"><Home size={18} /> View Website</Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-xl transition-colors"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Dashboard Overview</h1>
          <p className="text-slate-500">Selamat datang di panel kontrol kelas.</p>
        </div>

        {/* KARTU STATISTIK SEKARANG ADA 6 KOTAK */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 mb-12">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/members')}>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-3"><Users size={24} /></div>
            <h3 className="text-3xl font-bold text-navy-900">{stats.members}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">Members</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/projects')}>
            <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500 mb-3"><Briefcase size={24} /></div>
            <h3 className="text-3xl font-bold text-navy-900">{stats.projects}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">Projects</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/gallery')}>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 mb-3"><ImageIcon size={24} /></div>
            <h3 className="text-3xl font-bold text-navy-900">{stats.gallery}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">Photos</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/timeline')}>
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mb-3"><Clock size={24} /></div>
            <h3 className="text-3xl font-bold text-navy-900">{stats.timeline}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">Events</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/messages')}>
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 mb-3"><MessageSquare size={24} /></div>
            <h3 className="text-3xl font-bold text-navy-900">{stats.messages}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">Messages</p>
          </div>

          {/* KARTU BARU: STORIES */}
          <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/stories')}>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-500 mb-3"><BookOpen size={24} /></div>
            <h3 className="text-3xl font-bold text-navy-900">{stats.stories}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">Class Diary</p>
          </div>

        </div>

        {/* LAYOUT BAWAH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-6">Quick Actions</h2>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link to="/admin/members" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-navy-900 text-white rounded-xl font-semibold hover:bg-navy-800 transition-colors shadow-md"><Plus size={20} /> Add Member</Link>
              <Link to="/admin/gallery" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-navy-900 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors shadow-sm"><Plus size={20} /> Upload Photo</Link>
              <Link to="/admin/projects" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-navy-900 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors shadow-sm"><Plus size={20} /> Add Project</Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                <MessageSquare size={20} className="text-amber-500" /> Pesan Terbaru
              </h2>
              <Link to="/admin/messages" className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                Lihat Semua <ChevronRight size={16} />
              </Link>
            </div>
            
            {recentMessages.length === 0 ? (
              <p className="text-slate-500 text-center py-4">Belum ada pesan yang masuk.</p>
            ) : (
              <div className="space-y-4">
                {recentMessages.map(msg => (
                  <div key={msg.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-cyan-200 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-navy-900 text-sm">{msg.name}</span>
                      <span className="text-xs text-slate-400">{formatDateTime(msg.created_at)}</span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}