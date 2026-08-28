// src/pages/admin/ManageMembers.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { LogOut, Home, Plus, Trash2, Image as ImageIcon, Edit } from 'lucide-react'; // Tambah icon Edit
import ImageModal from '../../components/ImageModal';

export default function ManageMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [classId, setClassId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // State untuk mode Edit
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    role: 'Siswa',
    bio: '',
    photo: null,
    existing_photo_url: '' // Untuk menyimpan URL foto lama saat edit
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

      const { data: membersData } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (membersData) setMembers(membersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  // FUNGSI MEMBUKA FORM EDIT
  const handleEditClick = (member) => {
    setEditingId(member.id);
    setFormData({
      full_name: member.full_name,
      role: member.role,
      bio: member.bio || '',
      photo: null, // Kosongkan file input
      existing_photo_url: member.photo_url || '' // Simpan foto lama
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll otomatis ke atas
  };

  // FUNGSI MEMBATALKAN FORM
  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ full_name: '', role: 'Siswa', bio: '', photo: null, existing_photo_url: '' });
  };

  // FUNGSI SUBMIT (Bisa untuk Tambah Baru / Update Data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classId) return alert("ID Kelas belum ada!");
    
    setUploading(true);
    try {
      let photoUrl = editingId ? formData.existing_photo_url : ''; 

      // Jika user memilih file foto baru, upload ke Storage
      if (formData.photo) {
        photoUrl = await uploadImage(formData.photo, 'member-photos');
      }

      if (editingId) {
        // MODE UPDATE DATA
        const { error } = await supabase
          .from('members')
          .update({
            full_name: formData.full_name,
            role: formData.role,
            bio: formData.bio,
            photo_url: photoUrl
          })
          .eq('id', editingId);

        if (error) throw error;
        alert("Data member berhasil diperbarui! ✨");
      } else {
        // MODE TAMBAH DATA BARU
        const { error } = await supabase.from('members').insert([
          {
            class_id: classId,
            full_name: formData.full_name,
            role: formData.role,
            bio: formData.bio,
            photo_url: photoUrl
          }
        ]);

        if (error) throw error;
        alert("Member berhasil ditambahkan! 🎉");
      }

      handleCancel(); // Reset form & tutup
      checkSessionAndFetchData(); // Refresh data tabel

    } catch (error) {
      alert("Gagal menyimpan data: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus member ini?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from('members').delete().eq('id', id);
      if (error) throw error;
      setMembers(members.filter(member => member.id !== id));
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
          <Link to="/admin/members" className="block px-4 py-3 bg-white/10 text-cyan-400 rounded-xl font-medium">Manage Members</Link>
          <Link to="/admin/projects" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Projects</Link>
          <Link to="/admin/gallery" className="block px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors">Manage Gallery</Link>
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Manage Members</h1>
            <p className="text-slate-500">Atur anggota kelas dan pengurus inti.</p>
          </div>
          <button 
            onClick={isAdding ? handleCancel : () => setIsAdding(true)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-colors shadow-lg ${
              isAdding ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-cyan-500 text-navy-900 hover:bg-cyan-400'
            }`}
          >
            {isAdding ? "Batal" : <><Plus size={20} /> Add Member</>}
          </button>
        </div>

        {/* FORM TAMBAH / EDIT MEMBER */}
        {isAdding && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-cyan-200 mb-8 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-xl font-bold text-navy-900 mb-4">
              {editingId ? "Edit Data Anggota" : "Tambah Anggota Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input type="text" required value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Masukkan nama..." />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Jabatan / Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none">
                    <option value="Siswa">Siswa</option>
                    <option value="Ketua Kelas">Ketua Kelas</option>
                    <option value="Wakil Ketua">Wakil Ketua</option>
                    <option value="Sekretaris">Sekretaris</option>
                    <option value="Bendahara">Bendahara</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Bio Singkat</label>
                  <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" rows="2" placeholder="Kata-kata mutiara..."></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Foto Profil {editingId && <span className="text-cyan-500 font-normal">(Opsional: biarkan kosong jika tidak diganti)</span>}
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center h-full flex flex-col justify-center items-center hover:border-cyan-500 transition-colors relative overflow-hidden">
                  
                  {/* Tampilkan preview foto lama jika sedang edit dan belum pilih file baru */}
                  {editingId && formData.existing_photo_url && !formData.photo && (
                    <div className="absolute inset-0 opacity-20">
                      <img src={formData.existing_photo_url} alt="old-pic" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    <ImageIcon size={40} className="text-slate-400 mb-2" />
                    <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={(e) => setFormData({...formData, photo: e.target.files[0]})} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-cyan-50 file:text-cyan-700 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button type="button" onClick={handleCancel} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                  Batal
                </button>
                <button type="submit" disabled={uploading} className="bg-navy-900 text-cyan-400 px-8 py-3 rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50 transition-colors">
                  {uploading ? "Menyimpan..." : (editingId ? "Update Member" : "Simpan Member")}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TABEL DAFTAR MEMBER */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-semibold">Profil</th>
                <th className="p-4 font-semibold">Jabatan</th>
                <th className="p-4 font-semibold hidden md:table-cell">Bio</th>
                <th className="p-4 font-semibold text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-slate-500">Belum ada data member.</td></tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 flex items-center gap-4">
                      <img 
                        src={member.photo_url || 'https://via.placeholder.com/150'} 
                        alt="Profile" 
                        className="w-12 h-12 rounded-full object-cover border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                          if(member.photo_url) setSelectedImage(member.photo_url);
                        }}
                      />
                      <span className="font-bold text-navy-900">{member.full_name}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.role === 'Siswa' ? 'bg-slate-100 text-slate-600' : 'bg-cyan-100 text-cyan-700'}`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500 truncate max-w-xs hidden md:table-cell">{member.bio || '-'}</td>
                    
                    {/* KOLOM AKSI (EDIT & HAPUS) */}
                    <td className="p-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button 
                          onClick={() => handleEditClick(member)} 
                          title="Edit"
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(member.id)} 
                          title="Hapus"
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Komponen Modal Gambar */}
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

      </main>
    </div>
  );
}