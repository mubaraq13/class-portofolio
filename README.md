# 🎓 Class Portfolio & Digital Diary

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BA5?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Sebuah platform web modern, interaktif, dan *realtime* yang dibangun untuk mengarsipkan kenangan kelas, menampilkan portofolio siswa, dan menjaga tali silaturahmi melalui buku tamu digital.

## ✨ Fitur Utama

- **👥 Anggota Kelas (Members):** Direktori anggota interaktif dengan fitur flip foto 3D (foto formal & gaya bebas) serta tautan langsung ke media sosial (Instagram).
- **📸 Galeri (Gallery):** Galeri bergaya *masonry* yang mendukung foto resolusi tinggi dan video yang diputar otomatis (*auto-play* saat di-*hover*).
- **⏳ Sejarah Kelas (Timeline):** Sejarah kronologis acara dan momen kelas yang disajikan dalam antarmuka buku interaktif yang bisa dibalik halamannya.
- **🚀 Masterpiece (Projects):** Etalase untuk memamerkan tugas akhir, inovasi, dan karya/portofolio terbaik dari anggota kelas.
- **📖 Buku Cerita (Stories):** Fitur berbagi cerita dan pengalaman secara *realtime* dengan desain antarmuka buku harian. Mendukung tulisan panjang hingga 10.000 karakter.
- **💌 Buku Tamu (Messages):** Dinding pesan interaktif dan *realtime*. Ketika seseorang mengirim pesan, layar semua pengguna lain akan otomatis ter-update tanpa perlu *refresh*.
- **🔐 Admin Panel:** *Dashboard* aman khusus pengurus/admin untuk mengelola (CRUD) semua konten, termasuk unggah media (foto/video) langsung ke Supabase Storage.

## 🛠️ Teknologi yang Digunakan

- **Frontend:** React.js + Vite
- **Styling:** Tailwind CSS
- **Animasi:** Framer Motion
- **Ikon:** Lucide React
- **Database & Backend:** Supabase (PostgreSQL)
- **File Storage:** Supabase Storage
- **Hosting & Deployment:** Vercel

---

## 🚀 Panduan Instalasi Lokal (Local Setup)

Jika kamu ingin mengembangkan atau menjalankan project ini di komputer lokal, ikuti langkah-langkah berikut:

### 1. Kloning Repository
```bash
git clone [https://github.com/mubaraqmkbs13/class-portfolio.git](https://github.com/mubaraqmkbs13/class-portfolio.git)
cd class-portfolio

**2.Install Dependencies**
Pastikan Node.js sudah terinstal, lalu jalankan:
Bash
npm install

**###3. Konfigurasi Environment Variables###**
Buat file bernama .env di folder paling luar (root), lalu masukkan kredensial Supabase kamu:

Cuplikan kode
VITE_SUPABASE_URL=url_project_supabase_kamu
VITE_SUPABASE_ANON_KEY=anon_key_supabase_kamu

**4. Jalankan Aplikasi**
Bash
npm run dev
Buka http://localhost:5173 di browser kamu.

**🗄️ Konfigurasi Supabase (Database & Storage)**
Aplikasi ini sangat bergantung pada Supabase. Pastikan kamu telah membuat struktur berikut di Supabase Dashboard:

A. Tabel Database
Buat tabel-tabel berikut:

classes (Untuk menyimpan data kelas dasar)

members (Data siswa/anggota)

gallery (Data foto/video galeri)

timeline (Catatan momen/sejarah)

projects (Data portofolio/karya)

stories (Cerita panjang)

messages (Buku tamu)

⚠️ PENTING UNTUK FITUR REALTIME:
Buka Supabase Dashboard ➔ Table Editor ➔ Pilih tabel (messages, stories, timeline, projects, members, gallery) ➔ Klik Edit Table ➔ Centang opsi "Enable Realtime" ➔ Save.

B. Storage Buckets
Buat bucket berikut di menu Storage dan pastikan diatur sebagai Public:

timeline-images

project-images

gallery-images

member-photos

🌐 Konfigurasi Deployment (Vercel)
Aplikasi ini adalah Single Page Application (SPA). Agar tidak terjadi error 404 Not Found saat halaman di-refresh di Vercel, pastikan file vercel.json ada di root direktori dengan isi berikut:

JSON
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
👨‍💻 Dikembangkan Oleh
Muhammad Dzaky Mubaraq

Tim Penghuni Kampus

Jangan ragu untuk memodifikasi, menggunakan, atau memberi ⭐ (Star) pada repository ini jika bermanfaat!


Setelah lu paste, klik **Commit changes** (tombol hijau) di GitHub, dan web *repository* lu bakal langsung kelihatan gahar! 🚀
