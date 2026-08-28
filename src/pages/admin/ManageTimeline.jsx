// src/pages/admin/ManageTimeline.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Clock, LogOut, Home, Plus, Trash2, Image as ImageIcon, Calendar } from 'lucide-react';
import ImageModal from '../../components/ImageModal';

export default function ManageTimeline() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [classId, setClassId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    image: null
  });

  // State untuk Modal Gambar
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    checkSessionAndFetchData();
  }, []);

  const checkSessionAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return navigate('/admin/login');

    try {
      const { data: classData } = await supabase.from('classes').select('id').limit(1).maybeSingle();
      if (classData) setClassId(classData.id);

      const { data: timelineData } = await supabase
        .from('timeline')
        .select('*')
        .order('event_date', { ascending: false });
      
      if (timelineData) setEvents(timelineData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!classId) return alert("ID Kelas belum ada!");
    
    setUploading(true);
    try {
      let imageUrl = null;
      if (formData.image) {
        imageUrl = await uploadImage(formData.image, 'timeline-images');
      }

      const { error } = await supabase.from('timeline').insert([
        {
          class_id: classId,
          title: formData.title,
          description: formData.description,
          event_date: formData.event_date,
          image_url: imageUrl
        }
      ]);

      if (error) throw error;

      alert("Momen sejarah berhasil dicatat! ⏳");
      setIsAdding(false);
      setFormData({ title: '', description: '', event_date: '', image: null });
      checkSessionAndFetchData();

    } catch (error) {
      alert("Gagal menambahkan event: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus momen ini dari sejarah kelas?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from('timeline').delete().eq('id', id);
      if (error) throw error;
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      alert("Gagal menghapus: " + error.message);
    }
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
          <Link to="/admin/timeline" className="block px-4 py-3 bg-white/10 text-cyan-400 rounded-xl font-medium">Manage Timeline</Link>
          <Link to="/admin/messages" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Messages</Link>
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
            <h1 className="text-3xl font-bold text-navy-900">Manage Timeline</h1>
            <p className="text-slate-500">Catat momen penting dan perjalanan kelas.</p>
          </div>
          <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 bg-cyan-500 text-navy-900 px-5 py-2.5 rounded-xl font-bold hover:bg-cyan-400 shadow-lg">
            {isAdding ? "Batal" : <><Plus size={20} /> Add Event</>}
          </button>
        </div>

        {/* FORM TAMBAH EVENT TIMELINE */}
        {isAdding && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-12">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Catat Momen Baru</h2>
            <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Momen / Acara</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none" placeholder="Contoh: Hari Pertama Masuk SMK" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Kejadian</label>
                  <input type="date" required value={formData.event_date} onChange={(e) => setFormData({...formData, event_date: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Cerita / Deskripsi</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none" rows="3" placeholder="Ceritakan apa yang terjadi hari itu..."></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Foto Bukti (Opsional, Maks 5MB)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center h-full flex flex-col justify-center items-center hover:border-cyan-500 transition-colors">
                  <ImageIcon className="text-slate-400 mb-2" size={40} />
                  <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-cyan-50 file:text-cyan-700 cursor-pointer" />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit" disabled={uploading} className="bg-navy-900 text-cyan-400 px-8 py-3 rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50">
                  {uploading ? "Menyimpan..." : "Catat ke Sejarah"}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* LIST EVENT TIMELINE */}
        <div className="max-w-3xl">
          {events.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-100">Belum ada sejarah yang dicatat.</div>
          ) : (
            <div className="relative border-l-2 border-slate-200 ml-4 space-y-10 pb-8 mt-6">
              {events.map((event) => (
                <div key={event.id} className="relative pl-8">
                  {/* Titik marker di garis */}
                  <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-cyan-400 border-4 border-slate-50"></div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-cyan-100 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">
                          <Calendar size={14} /> {event.event_date}
                        </span>
                        <h3 className="text-xl font-bold text-navy-900">{event.title}</h3>
                      </div>
                      <button onClick={() => handleDelete(event.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{event.description}</p>
                    
                    {event.image_url && (
                      <div className="w-full max-w-sm rounded-xl overflow-hidden border border-slate-100">
                        {/* Gambar bisa diklik */}
                        <img 
                          src={event.image_url} 
                          alt={event.title} 
                          className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedImage(event.image_url)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Gambar */}
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

      </main>
    </div>
  );
}