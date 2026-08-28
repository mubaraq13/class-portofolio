// src/pages/admin/ManageGallery.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage'; // Tetap gunakan ini (bisa untuk video juga)
import { Image as ImageIcon, Film, LogOut, Home, Plus, Trash2, Calendar } from 'lucide-react';
import ImageModal from '../../components/ImageModal';

export default function ManageGallery() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [classId, setClassId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Kegiatan Kelas',
    description: '',
    event_date: '',
    image: null
  });

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

      const { data: galleryData } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (galleryData) setPhotos(galleryData);
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

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!classId) return alert("ID Kelas belum ada!");
    if (!formData.image) return alert("File Media (Foto/Video) wajib diisi!");
    
    setUploading(true);
    try {
      // Proses upload ke storage Supabase
      const mediaUrl = await uploadImage(formData.image, 'gallery-images');
      
      const { error } = await supabase.from('gallery').insert([
        {
          class_id: classId,
          title: formData.title,
          category: formData.category,
          description: formData.description,
          event_date: formData.event_date || null,
          image_url: mediaUrl
        }
      ]);

      if (error) throw error;
      alert("Media berhasil ditambahkan ke Galeri! 🎉");
      setIsAdding(false);
      setFormData({ title: '', category: 'Kegiatan Kelas', description: '', event_date: '', image: null });
      checkSessionAndFetchData();
    } catch (error) {
      alert("Gagal menambahkan media: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus media ini?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
      setPhotos(photos.filter(photo => photo.id !== id));
    } catch (error) {
      alert("Gagal menghapus: " + error.message);
    }
  };

  // Fungsi helper untuk mendeteksi apakah file adalah video
  const isVideoFile = (url) => {
    return url?.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR KIRI */}
      <aside className="w-64 bg-navy-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-cyan-400 tracking-wider">ADMIN PANEL</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/admin/dashboard" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Dashboard</Link>
          <Link to="/admin/members" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Members</Link>
          <Link to="/admin/projects" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Projects</Link>
          <Link to="/admin/gallery" className="block px-4 py-3 bg-white/10 text-cyan-400 rounded-xl font-medium">Manage Gallery</Link>
          <Link to="/admin/timeline" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Timeline</Link>
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* HEADER KONTEN */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Manage Gallery</h1>
            <p className="text-slate-500">Unggah foto dan video kenangan kelas.</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)} 
            className="flex items-center gap-2 bg-cyan-500 text-navy-900 px-5 py-2.5 rounded-xl font-bold hover:bg-cyan-400 shadow-lg transition-colors"
          >
            {isAdding ? "Batal" : <><Plus size={20} /> Upload Media</>}
          </button>
        </div>

        {/* FORM UPLOAD MEDIA (FOTO/VIDEO) */}
        {isAdding && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 animate-in fade-in">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Upload Foto / Video Baru</h2>
            <form onSubmit={handleAddPhoto} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Judul / Nama Acara</label>
                  <input 
                    type="text" required 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori</label>
                    <select 
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})} 
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none"
                    >
                      <option value="Kegiatan Kelas">Kegiatan Kelas</option>
                      <option value="Kunjungan Industri">Kunjungan Industri</option>
                      <option value="Video Cinematic">Video Cinematic</option>
                      <option value="Bebas">Bebas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Acara</label>
                    <input 
                      type="date" 
                      value={formData.event_date} 
                      onChange={(e) => setFormData({...formData, event_date: e.target.value})} 
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Keterangan Singkat</label>
                  <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-cyan-500 outline-none" 
                    rows="2"
                  ></textarea>
                </div>
              </div>

              {/* AREA INPUT FILE (BISA FOTO & VIDEO) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                  File Media <span className="text-xs text-slate-400 font-normal">(Maks 50MB, Foto/Video)</span>
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center h-full flex flex-col justify-center items-center hover:border-cyan-500 transition-colors">
                  <div className="flex gap-2 mb-2 text-slate-400">
                    <ImageIcon size={32} />
                    <Film size={32} />
                  </div>
                  <input 
                    type="file" required 
                    accept="image/*, video/mp4, video/webm" 
                    onChange={(e) => setFormData({...formData, image: e.target.files[0]})} 
                    className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-cyan-50 file:text-cyan-700 cursor-pointer" 
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button 
                  type="submit" disabled={uploading} 
                  className="bg-navy-900 text-cyan-400 px-8 py-3 rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50 transition-colors"
                >
                  {uploading ? "Mengunggah..." : "Simpan ke Galeri"}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* GRID DAFTAR FOTO DAN VIDEO */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.length === 0 ? (
            <div className="col-span-full p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-100">
              Belum ada media di galeri.
            </div>
          ) : (
            photos.map((photo) => (
              <div key={photo.id} className="bg-black rounded-2xl shadow-sm border border-slate-100 overflow-hidden group relative">
                
                {/* PREVIEW MEDIA */}
                <div 
                  className="aspect-square overflow-hidden cursor-pointer relative"
                  onClick={() => setSelectedImage(photo.image_url)}
                >
                  {isVideoFile(photo.image_url) ? (
                    <>
                      {/* JIKA VIDEO */}
                      <video 
                        src={photo.image_url} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                        muted playsInline loop
                        onMouseEnter={(e) => e.target.play()} // Putar video saat disentuh kursor
                        onMouseLeave={(e) => e.target.pause()}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/50 p-3 rounded-full text-white backdrop-blur-sm">
                          <Film size={24} />
                        </div>
                      </div>
                    </>
                  ) : (
                    /* JIKA FOTO */
                    <img 
                      src={photo.image_url} 
                      alt={photo.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  )}
                </div>
                
                {/* OVERLAY HITAM SAAT HOVER */}
                <div className="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 pointer-events-none">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                      {photo.category}
                    </span>
                    <h3 className="font-bold text-white text-sm mt-1 line-clamp-2">
                      {photo.title}
                    </h3>
                    {photo.event_date && (
                      <p className="text-slate-300 text-xs flex items-center gap-1 mt-2">
                        <Calendar size={12} /> {photo.event_date}
                      </p>
                    )}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(photo.id); }} 
                    className="pointer-events-auto self-end bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* MODAL (BISA PLAY VIDEO JUGA) */}
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

      </main>
    </div>
  );
}