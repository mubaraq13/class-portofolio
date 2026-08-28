// src/components/ImageModal.jsx
import { X } from 'lucide-react';

export default function ImageModal({ imageUrl, onClose }) {
  if (!imageUrl) return null;

  // Fungsi pintar untuk mendeteksi apakah URL ini adalah video
  const isVideo = imageUrl.match(/\.(mp4|webm|ogg)(\?.*)?$/i);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-12 text-slate-300 hover:text-red-400 transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm"
        >
          <X size={32} />
        </button>

        {isVideo ? (
          // Jika Video, tampilkan pemutar video (Bisa di-play, pause, ada suaranya)
          <video 
            src={imageUrl} 
            controls 
            autoPlay
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-white/20 bg-black"
          />
        ) : (
          // Jika Foto, tampilkan gambar seperti biasa
          <img 
            src={imageUrl} 
            alt="Preview" 
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-white/20"
          />
        )}
      </div>
    </div>
  );
}