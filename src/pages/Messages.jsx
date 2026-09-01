// src/pages/Messages.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MessageSquare, Send, User, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // State untuk kontrol Slide Buku Tamu (Index halaman aktif)
  const [currentIndex, setCurrentIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  useEffect(() => {
    // 1. Tarik data pertama kali saat halaman dibuka
    fetchMessages();

    // 2. PASANG RADAR REALTIME SUPABASE 🚀
    const radar = supabase
      .channel('custom-messages-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' }, // Pantau tabel 'messages'
        (payload) => {
          console.log('Ada pesan baru masuk!', payload);
          fetchMessages();
          setCurrentIndex(0); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(radar);
    };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('messages').insert([
        {
          name: formData.name,
          message: formData.message
        }
      ]);

      if (error) throw error;
      
      setFormData({ name: '', message: '' });
      alert("Yeay! Pesanmu berhasil dijilid ke buku tamu! 🚀");
      
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

  const handleNext = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(messages.length - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const currentMessage = messages[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-between">
      
      {/* HEADER HALAMAN */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cyan-300 font-semibold text-sm mb-4 border border-white/20 backdrop-blur-md shadow-sm">
          <BookOpen size={18} /> Buku Tamu Interaktif
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4 drop-shadow-lg">
          Wall of Messages Reader
        </h1>
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Geser lembaran demi lembaran catatan, salam, dan kesan yang tersimpan rapi bagaikan buku memori kelas.
        </p>
      </motion.div>

      {/* GRID LAYOUT UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        
        {/* FORM KIRIM PESAN */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/20 shadow-xl lg:sticky lg:top-24"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
              Tulis Lembaran Baru ✍️
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Kamu (Boleh Anonim)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400" />
                </div>
                <input 
                  type="text" required maxLength="50"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-11 p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm" 
                  placeholder="Contoh: Hamba Allah" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Pesan & Kesan</label>
              <textarea 
                required rows="8" maxLength="10000"
                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none bg-slate-50 focus:bg-white transition-colors resize-none text-sm" 
                placeholder="Tulis kesan indahmu sepanjang mungkin di sini..."
              ></textarea>
              <div className="text-right text-[10px] font-medium text-slate-400 mt-1">
                {formData.message.length} / 10000 karakter
              </div>
            </div>

            <div className="pt-1">
              <button 
                type="submit" disabled={submitting}
                className="w-full bg-navy-900 text-cyan-400 py-3.5 rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {submitting ? "Menyimpan..." : <><Send size={18} /> Simpan ke Buku</>}
              </button>
            </div>
          </form>
        </motion.div>

        {/* SLIDER BUKU TAMU */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {messages.length === 0 ? (
            <div className="text-center p-12 bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-sm text-slate-500">
              <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
              <p>Belum ada lembaran catatan. Jadilah yang pertama menulis!</p>
            </div>
          ) : (
            <div className="relative">
              
              <div className="bg-amber-50/95 backdrop-blur-md p-8 md:p-10 rounded-3xl border-2 border-amber-200 shadow-2xl relative min-h-[450px] flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 bottom-0 left-4 w-1 bg-amber-200/60 hidden md:block"></div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMessage.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center border-b border-amber-200/60 pb-4 mb-6">
                        <span className="text-xs font-mono font-bold text-amber-700/60 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                          Lembar {currentIndex + 1} dari {messages.length}
                        </span>
                        <span className="text-xs text-amber-900/50 font-mono">
                          {formatDateTime(currentMessage.created_at)}
                        </span>
                      </div>

                      {/* FIX NYAMPING: Tambah overflow-x-hidden, break-words, dan break-all */}
                      <div className="max-h-[350px] overflow-y-auto overflow-x-hidden pr-3 custom-scrollbar my-2">
                        <p className="text-slate-800 text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-serif italic break-words break-all">
                          "{currentMessage.message}"
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-amber-200/60 flex items-center gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-base shadow-inner uppercase">
                        {currentMessage.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-amber-950 text-base truncate">{currentMessage.name}</h3>
                        <p className="text-xs text-amber-800/60">Pengunjung / Teman Sekelas</p>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-center mt-6 px-2">
                <button 
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl backdrop-blur-md transition-all hover:scale-105 shadow-lg"
                >
                  <ChevronLeft size={20} /> Sebelumnya
                </button>

                <div className="flex gap-1.5 overflow-x-auto max-w-[200px] py-2">
                  {messages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentIndex === idx ? 'w-6 bg-cyan-400' : 'w-2.5 bg-white/30 hover:bg-white/50'
                      }`}
                      title={`Lembar ${idx + 1}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold rounded-2xl transition-all hover:scale-105 shadow-lg"
                >
                  Selanjutnya <ChevronRight size={20} />
                </button>
              </div>

            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}