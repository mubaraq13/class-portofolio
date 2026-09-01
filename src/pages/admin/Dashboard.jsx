// src/pages/admin/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Users, Briefcase, Image as ImageIcon, Clock, MessageSquare, BookOpen, ArrowLeft } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    members: 0,
    projects: 0,
    gallery: 0,
    timeline: 0,
    messages: 0,
    stories: 0
  });

  useEffect(() => {
    checkSessionAndFetchStats();
  }, []);

  const checkSessionAndFetchStats = async () => {
    // Pastikan user sudah login
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
      return;
    }

    try {
      // Ambil jumlah data dari semua tabel secara paralel biar cepat
      const [members, projects, gallery, timeline, messages, stories] = await Promise.all([
        supabase.from('members').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('gallery').select('*', { count: 'exact', head: true }),
        supabase.from('timeline').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('stories').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        members: members.count || 0,
        projects: projects.count || 0,
        gallery: gallery.count || 0,
        timeline: timeline.count || 0,
        messages: messages.count || 0,
        stories: stories.count || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Konfigurasi kartu statistik (Ditambah 'path' untuk link tujuan)
  const statCards = [
    { label: 'Members', count: stats.members, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', path: '/admin/members' },
    { label: 'Projects', count: stats.projects, icon: Briefcase, color: 'text-cyan-500', bg: 'bg-cyan-50', path: '/admin/projects' },
    { label: 'Photos', count: stats.gallery, icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-50', path: '/admin/gallery' },
    { label: 'Events', count: stats.timeline, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50', path: '/admin/timeline' },
    { label: 'Messages', count: stats.messages, icon: MessageSquare, color: 'text-yellow-500', bg: 'bg-yellow-50', path: '/admin/messages' },
    { label: 'Class Diary', count: stats.stories, icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50', path: '/admin/stories' },
  ];

  return (
    <div className="p-6 md:p-10">
      
      {/* TOMBOL KEMBALI KE WEBSITE UTAMA */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-100 font-semibold text-sm transition-all"
        >
          <ArrowLeft size={18} /> Kembali ke Website Utama
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900">Dashboard Overview</h1>
        <p className="text-slate-500">Selamat datang di panel kontrol kelas.</p>
      </div>

      {/* GRID STATISTIK MENGGUNAKAN LINK */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={index} 
              to={stat.path}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:shadow-md hover:border-cyan-200 transition-all cursor-pointer group"
            >
              <div className={`p-4 rounded-full ${stat.bg} ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={28} />
              </div>
              <h3 className="text-3xl font-black text-navy-900 mb-1 group-hover:text-cyan-600 transition-colors">{stat.count}</h3>
              <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            </Link>
          );
        })}
      </div>

    </div>
  );
}