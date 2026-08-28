// src/lib/storage.js
import { supabase } from './supabase';

// Meskipun namanya uploadImage (agar tidak error di file lain), 
// sekarang fungsi ini sudah pintar dan bisa menerima Video!
export const uploadImage = async (file, bucket) => {
  if (!file) throw new Error('Tidak ada file yang dipilih.');

  // 1. Ambil ekstensi file (contoh: 'mp4', 'jpg')
  const fileExt = file.name.split('.').pop().toLowerCase();
  
  // 2. DAFTAR FILE YANG DIIZINKAN (Sekarang termasuk Video!)
  const allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'webm', 'ogg'];

  if (!allowedExts.includes(fileExt)) {
    throw new Error('Format file tidak didukung! Gunakan JPG, PNG, WEBP, atau MP4/WEBM untuk video.');
  }

  // 3. Batasan Ukuran File (Maksimal 50MB)
  const maxSize = 50 * 1024 * 1024; // 50MB dalam bytes
  if (file.size > maxSize) {
    throw new Error('Ukuran file terlalu besar! Maksimal 50MB.');
  }

  // 4. Buat nama file unik agar tidak bentrok
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  
  try {
    // 5. Upload ke Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // 6. Ambil URL Publiknya
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    
    return data.publicUrl;
    
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};