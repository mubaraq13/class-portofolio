// src/pages/admin/ManageMembers.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Plus, Trash2, Image as ImageIcon, Edit, ArrowLeft, AtSign } from 'lucide-react'; 
import ImageModal from '../../components/ImageModal';

export default function ManageMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [classId, setClassId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    role: 'Siswa',
    bio: '',
    instagram: '', 
    photo: null,
    existing_photo_url: '',
    photo_2: null, 
    existing_photo_url_2: '' 
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

  const handleEditClick = (member) => {
    setEditingId(member.id);
    setFormData({
      full_name: member.full_name,
      role: member.role,
      bio: member.bio || '',
      instagram: member.instagram || '',
      photo: null, 
      existing_photo_url: member.photo_url || '',
      photo_2: null,
      existing_photo_url_2: member.photo_url_2 || '' 
    });
    setIsAdding(true);
    
    // PERBAIKAN SCROLL: Arahkan ke area <main> dengan sedikit jeda (setTimeout)
    setTimeout(() => {
      const mainScrollArea = document.querySelector('main');
      if (mainScrollArea) {
        mainScrollArea.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Fallback
      }
    }, 100);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ full_name: '', role: 'Siswa', bio: '', instagram: '', photo: null, existing_photo_url: '', photo_2: null, existing_photo_url_2: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classId) return alert("ID Kelas belum ada!");
    
    setUploading(true);
    try {
      let photoUrl = editingId ? formData.existing_photo_url : ''; 
      let photoUrl2 = editingId ? formData.existing_photo_url_2 : ''; 

      if (formData.photo) {
        photoUrl = await uploadImage(formData.photo, 'member-photos');
      }

      if (formData.photo_2) {
        photoUrl2 = await uploadImage(formData.photo_2, 'member-photos');
      }

      const payload = {
        full_name: formData.full_name,
        role: formData.role,
        bio: formData.bio,
        instagram: formData.instagram, 
        photo_url: photoUrl,
        photo_url_2: photoUrl2 
      };

      if (editingId) {
        const { error } = await supabase.from('members').update(payload).eq('id', editingId);
        if (error) throw error;
        alert("Data member berhasil diperbarui! ✨");
      } else {
        const { error } = await supabase.from('members').insert([{ class_id: classId, ...payload }]);
        if (error) throw error;
        alert("Member berhasil ditambahkan! 🎉");
      }

      handleCancel(); 
      checkSessionAndFetchData();

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
    <div className="p-6 md:p-10">
      
      {/* TOMBOL KEMBALI */}
      <div className="mb-6">
        <Link 
          to="/admin/dashboard" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-100 font-semibold text-sm transition-all"
        >
          <ArrowLeft size={18} /> Kembali ke Dashboard
        </Link>
      </div>

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
              
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Instagram <span className="font-normal text-cyan-500">(Opsional)</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign size={16} className="text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      value={formData.instagram} 
                      onChange={(e) => setFormData({...formData, instagram: e.target.value})} 
                      className="w-full pl-9 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" 
                      placeholder="tanpa @, cth: rizal" 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Bio Singkat</label>
                <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" rows="2" placeholder="Kata-kata mutiara..."></textarea>
              </div>
            </div>

            {/* INPUT DUA FOTO BERDAMPINGAN DENGAN FITUR HAPUS FOTO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Foto Utama */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 text-center">Foto Utama (Formal)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center h-48 flex flex-col justify-center items-center hover:border-cyan-500 transition-colors relative overflow-hidden group">
                  
                  {/* Tampilkan preview foto lama */}
                  {formData.existing_photo_url && !formData.photo && (
                    <div className="absolute inset-0 opacity-40">
                      <img src={formData.existing_photo_url} alt="old-pic" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col items-center w-full px-2">
                    <ImageIcon size={30} className="text-slate-400 mb-2" />
                    <input 
                      id="upload-photo-1"
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setFormData({...formData, photo: e.target.files[0]})} 
                      className="text-xs text-slate-500 w-full cursor-pointer ml-6" 
                    />
                    {/* Text file baru jika dipilih */}
                    {formData.photo && (
                      <span className="text-xs text-cyan-700 font-bold mt-2 bg-cyan-50 px-2 py-1 rounded truncate max-w-full">
                        File: {formData.photo.name}
                      </span>
                    )}
                  </div>

                  {/* TOMBOL HAPUS FOTO UTAMA */}
                  {(formData.existing_photo_url || formData.photo) && (
                    <button 
                      type="button" 
                      title="Hapus Foto Ini"
                      onClick={() => {
                        document.getElementById('upload-photo-1').value = '';
                        setFormData({...formData, photo: null, existing_photo_url: ''});
                      }} 
                      className="absolute top-2 right-2 z-20 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-all shadow-md opacity-80 hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Foto Kedua */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 text-center">Foto Kedua (Bebas)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center h-48 flex flex-col justify-center items-center hover:border-cyan-500 transition-colors relative overflow-hidden group">
                  
                  {/* Tampilkan preview foto lama */}
                  {formData.existing_photo_url_2 && !formData.photo_2 && (
                    <div className="absolute inset-0 opacity-40">
                      <img src={formData.existing_photo_url_2} alt="old-pic-2" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col items-center w-full px-2">
                    <ImageIcon size={30} className="text-slate-400 mb-2" />
                    <input 
                      id="upload-photo-2"
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setFormData({...formData, photo_2: e.target.files[0]})} 
                      className="text-xs text-slate-500 w-full cursor-pointer ml-6" 
                    />
                    {/* Text file baru jika dipilih */}
                    {formData.photo_2 && (
                      <span className="text-xs text-cyan-700 font-bold mt-2 bg-cyan-50 px-2 py-1 rounded truncate max-w-full">
                        File: {formData.photo_2.name}
                      </span>
                    )}
                  </div>

                  {/* TOMBOL HAPUS FOTO KEDUA */}
                  {(formData.existing_photo_url_2 || formData.photo_2) && (
                    <button 
                      type="button" 
                      title="Hapus Foto Ini"
                      onClick={() => {
                        document.getElementById('upload-photo-2').value = '';
                        setFormData({...formData, photo_2: null, existing_photo_url_2: ''});
                      }} 
                      className="absolute top-2 right-2 z-20 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-all shadow-md opacity-80 hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
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

      {/* TABEL DAFTAR MEMBER (DENGAN HORIZONTAL SCROLL) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* WRAPPER OVERFLOW UNTUK MOBILE */}
        <div className="overflow-x-auto w-full">
          {/* TABEL DIBERI MINIMAL LEBAR (min-w-[700px]) AGAR BISA DI-SCROLL */}
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-semibold">Profil</th>
                <th className="p-4 font-semibold">Jabatan</th>
                <th className="p-4 font-semibold hidden md:table-cell">Bio & Sosmed</th>
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
                      <div className="relative group cursor-pointer" onClick={() => { if(member.photo_url) setSelectedImage(member.photo_url); }}>
                        <img 
                          src={member.photo_url || 'https://via.placeholder.com/150'} 
                          alt="Profile" 
                          className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        />
                        {/* Jika punya foto ke-2, tampilkan indikator kecil */}
                        {member.photo_url_2 && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white" title="Punya 2 Foto"></div>
                        )}
                      </div>
                      <span className="font-bold text-navy-900">{member.full_name}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.role === 'Siswa' ? 'bg-slate-100 text-slate-600' : 'bg-cyan-100 text-cyan-700'}`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500 hidden md:table-cell">
                      <div className="truncate max-w-xs">{member.bio || '-'}</div>
                      {member.instagram && (
                        <div className="text-xs text-cyan-600 mt-1 flex items-center gap-1">
                          <AtSign size={12} /> @{member.instagram}
                        </div>
                      )}
                    </td>
                    
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

      </div>

      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

    </div>
  );
}