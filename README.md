<div align="center">

🎓 Class Portfolio & Digital Diary 🚀

A Modern, Realtime, & Interactive Memorial Web Application

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p>
  <strong>Merekam jejak, karya, dan cerita kelas dalam satu ruang digital tanpa batas.</strong>
</p>

<p>
  <a href="#-demo">🌐 Demo</a> •
  <a href="#-fitur-unggulan">✨ Fitur</a> •
  <a href="#-tech-stack">🛠️ Tech Stack</a> •
  <a href="#-instalasi">⚙️ Instalasi</a> •
  <a href="#-deployment">🚀 Deployment</a>
</p>

</div>

📖 Tentang Project

Class Portfolio & Digital Diary adalah aplikasi web untuk mendokumentasikan perjalanan sebuah kelas dalam satu platform digital.

Aplikasi ini menggabungkan:

👥 Profil anggota kelas

🖼️ Galeri foto dan video

📝 Buku tamu / messages

📔 Digital diary / stories

🗓️ Timeline perjalanan kelas

💼 Portfolio project

🔐 Admin dashboard

⚡ Realtime update

☁️ Cloud storage

Project dirancang sebagai single-page application (SPA) menggunakan React dan Vite, dengan Supabase sebagai backend, database PostgreSQL, authentication, realtime communication, dan file storage.

Status Project: 🚧 Development / Customizable

🎯 Tujuan Project

Project ini dibuat untuk menyediakan ruang digital yang dapat digunakan oleh satu kelas untuk:

Menyimpan dokumentasi kegiatan.

Menampilkan profil seluruh anggota kelas.

Menampilkan project atau karya anggota.

Menyimpan cerita dan kenangan kelas.

Membuat timeline perjalanan kelas.

Menyediakan buku tamu interaktif.

Mengelola konten melalui dashboard administrator.

Menghadirkan data yang dapat diperbarui secara realtime.

✨ Fitur Unggulan

⚡ 1. Realtime Auto-Update

Data dapat diperbarui secara realtime menggunakan Supabase Realtime.

Area yang dapat menggunakan realtime:

Messages

Stories

Gallery

Timeline

Projects

Members

Ketika data berubah di database, aplikasi dapat menerima perubahan tanpa harus melakukan refresh manual.

📖 2. Interactive Book Reader

Messages dan Stories dapat dibuat dengan konsep seperti buku digital.

Contoh interaksi:

Page transition

Page flip

Smooth animation

Previous / next page

Book cover

Reader mode

Konsep ini membuat halaman dokumentasi terasa lebih interaktif dibandingkan halaman CRUD biasa.

🃏 3. 3D Flip Cards

Halaman Members menggunakan kartu profil interaktif.

Front Side

Menampilkan:

Foto

Nama

Role / posisi

Informasi singkat

Back Side

Menampilkan:

Bio

Quote

Social media

Informasi tambahan

Kartu dapat menggunakan animasi 3D flip.

🎬 4. Smart Media Support

Sistem media dapat menangani:

JPG

JPEG

PNG

WEBP

GIF

MP4

WEBM

Untuk media tertentu, aplikasi dapat membedakan apakah file merupakan gambar atau video dan menampilkan komponen yang sesuai.

Contoh:

Image
 └── Preview → Click → Modal

Video
 └── Thumbnail → Hover → Play

🖼️ 5. Interactive Gallery

Gallery digunakan untuk menampilkan dokumentasi kelas.

Fitur yang dapat tersedia:

Grid layout

Image preview

Video preview

Modal viewer

Responsive layout

Upload media

Delete media

Caption

Category / tag

📝 6. Messages / Guest Book

Messages berfungsi sebagai buku tamu digital.

Pengguna dapat:

Menulis pesan

Melihat pesan anggota lain

Membaca pesan dalam format buku

Menggunakan timestamp

Mendapatkan update realtime

Administrator dapat:

Menambah data

Mengedit data

Menghapus data

Moderasi pesan

📔 7. Stories / Digital Diary

Stories digunakan untuk menyimpan cerita perjalanan kelas.

Contoh konten:

Hari pertama masuk kelas

Kegiatan kampus

Praktikum

Event

Perjalanan

Momen lucu

Perpisahan

Refleksi kelas

🗓️ 8. Timeline

Timeline menyimpan perjalanan kelas berdasarkan waktu.

Contoh:

2024
 │
 ├── 🎓 Awal Perkuliahan
 │
 ├── 🧪 Praktikum Pertama
 │
 ├── 🏆 Event Kampus
 │
 └── 📸 Dokumentasi Kelas
 │
2025
 │
 ├── 💼 Project
 │
 └── 🎓 Semester Akhir

💼 9. Projects / Class Portfolio

Projects digunakan untuk menampilkan karya atau project kelas.

Informasi yang dapat ditampilkan:

Project title

Description

Thumbnail

Technology

Team members

Project URL

GitHub URL

Created date

🔐 10. Secure Admin Dashboard

Administrator memiliki dashboard khusus untuk mengelola data.

Modul admin:

Dashboard
├── Members
├── Gallery
├── Messages
├── Stories
├── Timeline
└── Projects

Operasi CRUD:

Create

Read

Update

Delete

Upload media dapat diarahkan langsung ke Supabase Storage.

Catatan keamanan: keamanan aplikasi tidak cukup hanya dengan menyembunyikan halaman admin. Gunakan Supabase Auth dan Row Level Security (RLS) untuk membatasi operasi database berdasarkan role/permission.

🖥️ Struktur Halaman

Struktur halaman publik yang direkomendasikan:

/
├── Home
├── Members
├── Gallery
├── Projects
├── Stories
├── Timeline
└── Messages

Halaman administrator:

/admin
├── Dashboard
├── Members
├── Gallery
├── Projects
├── Stories
├── Timeline
└── Messages

🛠️ Tech Stack

Frontend

Technology

Function

React

UI framework

Vite

Development server & build tool

Tailwind CSS

Styling

Framer Motion

Animation

Lucide React

Icons

React Router DOM

Client-side routing

Backend

Technology

Function

Supabase

Backend as a Service

PostgreSQL

Relational database

Supabase Realtime

Realtime database events

Supabase Storage

File storage

Supabase Auth

Authentication & authorization

Deployment

Technology

Function

Vercel

Hosting & deployment

GitHub

Source code repository

🏗️ Arsitektur Sistem

                        ┌─────────────────────┐
                        │       User          │
                        │ Browser / Mobile    │
                        └──────────┬──────────┘
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │    React + Vite     │
                        │      Frontend       │
                        └──────────┬──────────┘
                                   │
                     ┌─────────────┴─────────────┐
                     │                           │
                     ▼                           ▼
             ┌───────────────┐           ┌───────────────┐
             │   Supabase    │           │    Vercel     │
             │   Backend     │           │    Hosting    │
             └───────┬───────┘           └───────────────┘
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
      PostgreSQL   Storage   Realtime
      Database     Bucket    Channels

📁 Struktur Project

📦 class-portfolio
 ┣ 📂 public
 ┃ ┗ 📜 favicon.*
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┗ 📜 ImageModal.jsx
 ┃ ┣ 📂 lib
 ┃ ┃ ┣ 📜 supabase.js
 ┃ ┃ ┗ 📜 storage.js
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 admin
 ┃ ┃ ┃ ┣ 📜 Dashboard.jsx
 ┃ ┃ ┃ ┣ 📜 ManageGallery.jsx
 ┃ ┃ ┃ ┣ 📜 ManageMembers.jsx
 ┃ ┃ ┃ ┣ 📜 ManageMessages.jsx
 ┃ ┃ ┃ ┣ 📜 ManageProjects.jsx
 ┃ ┃ ┃ ┣ 📜 ManageStories.jsx
 ┃ ┃ ┃ ┗ 📜 ManageTimeline.jsx
 ┃ ┃ ┣ 📜 Gallery.jsx
 ┃ ┃ ┣ 📜 Members.jsx
 ┃ ┃ ┣ 📜 Messages.jsx
 ┃ ┃ ┣ 📜 Projects.jsx
 ┃ ┃ ┣ 📜 Stories.jsx
 ┃ ┃ ┗ 📜 Timeline.jsx
 ┃ ┣ 📜 App.jsx
 ┃ ┣ 📜 index.css
 ┃ ┗ 📜 main.jsx
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 vercel.json
 ┣ 📜 tailwind.config.js
 ┣ 📜 vite.config.js
 ┣ 📜 package.json
 ┗ 📜 README.md

⚙️ Instalasi

1. Prerequisites

Pastikan software berikut sudah tersedia:

Node.js LTS

npm

Git

Visual Studio Code atau code editor lain

Cek instalasi:

node --version
npm --version
git --version

2. Clone Repository

git clone https://github.com/mubaraqmkbs13/class-portfolio.git

Masuk ke folder:

cd class-portfolio

3. Install Dependencies

npm install

🔐 Environment Variables

Buat file:

.env

di root project, sejajar dengan package.json.

Contoh:

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

Jangan commit file .env ke repository publik.

Tambahkan .env ke .gitignore:

node_modules
dist
.env
.env.local
.env.*.local

🗄️ Setup Supabase

Buat project baru di Supabase.

Project membutuhkan database PostgreSQL dan Storage.

Database Tables

Minimal tabel yang digunakan:

classes
members
gallery
timeline
projects
messages
stories

Struktur field dapat disesuaikan dengan implementasi frontend.

Contoh sederhana:

members

id
class_id
name
photo_url
role
bio
quote
social_url
created_at

gallery

id
class_id
title
description
media_url
media_type
created_at

timeline

id
class_id
title
description
event_date
image_url
created_at

projects

id
class_id
title
description
thumbnail_url
github_url
project_url
created_at

messages

id
class_id
name
message
created_at

stories

id
class_id
title
content
cover_url
created_at

⚡ Supabase Realtime

Jika fitur realtime digunakan, pastikan tabel yang diperlukan telah dikonfigurasi untuk menerima perubahan melalui Supabase Realtime.

Contoh penggunaan dari React:

const channel = supabase
  .channel('messages-realtime')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'messages',
    },
    (payload) => {
      console.log('Database changed:', payload)
    }
  )
  .subscribe()

Hapus subscription saat component di-unmount:

return () => {
  supabase.removeChannel(channel)
}

📁 Supabase Storage

Buat bucket:

timeline-images
project-images
gallery-images
member-photos

Contoh struktur storage:

member-photos/
├── member-001.jpg
├── member-002.jpg
└── member-003.jpg

gallery-images/
├── event-001.jpg
├── event-002.jpg
└── event-003.mp4

Bucket public hanya cocok jika file memang dimaksudkan untuk dapat diakses publik. Untuk data privat, gunakan bucket private dan signed URLs.

▶️ Menjalankan Project

Development mode:

npm run dev

Aplikasi biasanya tersedia pada:

http://localhost:5173

🏭 Production Build

Build aplikasi:

npm run build

Preview hasil build:

npm run preview

🚀 Deployment

Vercel

Project dapat di-deploy menggunakan Vercel.

1. Push ke GitHub

git add .
git commit -m "Initial project"
git push origin main

2. Import Repository

Di Vercel:

Add New Project
        ↓
Import Git Repository
        ↓
Select class-portfolio
        ↓
Configure Project
        ↓
Deploy

3. Environment Variables

Tambahkan:

VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

Nilainya harus sama dengan konfigurasi Supabase.

4. SPA Routing

Karena React Router menggunakan client-side routing, server perlu mengarahkan route aplikasi kembali ke index.html.

Contoh vercel.json:

{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

🔒 Security

Beberapa hal penting sebelum production:

Jangan expose secret key

Aman untuk frontend:

VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

Jangan pernah memasukkan:

SUPABASE_SERVICE_ROLE_KEY

ke frontend atau repository publik.

Gunakan Row Level Security

Supabase RLS sebaiknya digunakan untuk menentukan siapa yang dapat:

SELECT
INSERT
UPDATE
DELETE

Contoh konsep:

Public
 └── SELECT public content

Authenticated User
 └── INSERT message

Admin
 ├── INSERT
 ├── UPDATE
 └── DELETE

Policy harus disesuaikan dengan struktur authentication dan role pada project.

🧩 Environment Architecture

Local Development
       │
       ├── React
       ├── Vite
       └── .env
              │
              ▼
          Supabase
              │
       ┌──────┼──────┐
       ▼      ▼      ▼
    Database Storage Realtime


Production
       │
       ▼
     Vercel
       │
       ▼
 React Application
       │
       ▼
   Supabase

📱 Responsive Design

UI dirancang dengan pendekatan mobile-first.

Target:

Mobile
  ↓
Tablet
  ↓
Laptop
  ↓
Desktop

Komponen harus mendukung:

Touch interaction

Responsive grid

Responsive typography

Mobile navigation

Desktop navigation

Adaptive modal

Flexible media

🎨 Design Direction

Rekomendasi visual:

Style

Modern
Minimal
Elegant
Interactive
Youthful
Editorial

UI Elements

Glassmorphism secukupnya

Soft shadows

Rounded cards

Large typography

Smooth transitions

Micro-interactions

Image-focused layout

Editorial typography

Animation

Gunakan animasi untuk meningkatkan UX, bukan sekadar dekorasi.

Contoh:

Page Enter
   ↓
Fade + Slide

Card Hover
   ↓
Scale + Shadow

Book
   ↓
Page Flip

Gallery
   ↓
Image Reveal

Navigation
   ↓
Smooth Transition

⚖️ Analisis Project

🟢 Kelebihan

1. Modern Architecture

React + Vite memberikan development experience yang cepat dan struktur frontend yang modular.

2. Realtime Experience

Supabase Realtime memungkinkan UI menerima perubahan data tanpa reload manual.

3. Low Infrastructure Complexity

Supabase menyediakan database, storage, authentication, dan realtime dalam satu platform.

4. Scalable Frontend Structure

Komponen dapat dipisahkan menjadi reusable components sehingga project lebih mudah dikembangkan.

5. Responsive

Tailwind CSS mempermudah implementasi responsive UI.

6. Rich Interaction

Framer Motion dapat digunakan untuk membuat:

Page transition

Modal animation

Flip card

Scroll animation

Micro-interaction

🔴 Kekurangan & Limitasi

1. Free Tier Limit

Layanan cloud memiliki batas penggunaan sesuai paket yang aktif. Batas aktual perlu dicek pada pricing dan dokumentasi layanan saat deployment.

2. SPA SEO

React SPA membutuhkan konfigurasi tambahan jika SEO menjadi prioritas utama.

3. Internet Dependency

Fitur realtime dan cloud storage membutuhkan koneksi internet.

4. Realtime Connection Management

Subscription realtime harus dikelola dengan benar agar tidak menyebabkan:

Duplicate listeners

Memory leaks

Unnecessary connections

5. Security Configuration

Supabase dapat aman untuk production, tetapi RLS, Auth, Storage Policies, dan database policies harus dikonfigurasi dengan benar.

🧪 Development Workflow

Workflow yang direkomendasikan:

1. Create Feature
       ↓
2. Build Component
       ↓
3. Connect Supabase
       ↓
4. Test Local
       ↓
5. Git Commit
       ↓
6. Push GitHub
       ↓
7. Vercel Build
       ↓
8. Production

🧹 Code Quality

Rekomendasi struktur:

components/
    reusable UI

pages/
    page-level components

lib/
    external service configuration

hooks/
    reusable React hooks

utils/
    helper functions

Jika project semakin besar, struktur dapat dikembangkan menjadi:

src/
├── components/
├── features/
│   ├── members/
│   ├── gallery/
│   ├── messages/
│   ├── stories/
│   ├── timeline/
│   └── projects/
├── hooks/
├── lib/
├── pages/
├── utils/
└── assets/

🧭 Roadmap

Phase 1 — Core

React setup

Vite setup

Tailwind setup

Supabase setup

Database schema

Basic routing

Phase 2 — Public Pages

Home

Members

Gallery

Projects

Stories

Timeline

Messages

Phase 3 — Interaction

Page flip

3D cards

Modal viewer

Scroll animations

Hover video

Realtime update

Phase 4 — Admin

Authentication

Admin dashboard

CRUD Members

CRUD Gallery

CRUD Projects

CRUD Stories

CRUD Timeline

CRUD Messages

Phase 5 — Production

RLS

Storage policies

Performance optimization

Responsive testing

Error handling

SEO metadata

Vercel deployment

Production testing

🐛 Troubleshooting

npm install gagal

Coba:

npm cache verify
npm install

Jika dependency bermasalah:

rm -rf node_modules
npm install

Pada Windows PowerShell:

Remove-Item -Recurse -Force node_modules
npm install

Supabase tidak terkoneksi

Periksa:

VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

Pastikan nama variable sesuai dengan kode:

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

Restart development server setelah mengubah .env:

npm run dev

Refresh halaman menghasilkan 404 di Vercel

Pastikan konfigurasi SPA rewrite tersedia:

{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

Upload Storage gagal

Periksa:

Nama bucket.

Bucket policy.

Authentication.

File size.

MIME type.

Supabase Storage configuration.

Realtime tidak berjalan

Periksa:

Table sudah dikonfigurasi untuk realtime.

Nama table benar.

Schema benar.

Subscription berhasil.

RLS/policy tidak memblokir akses.

Channel tidak dibuat berkali-kali.

📊 Performance Checklist

Sebelum production:

[ ] Compress large images
[ ] Use WebP/AVIF when appropriate
[ ] Lazy load images
[ ] Lazy load heavy components
[ ] Avoid unnecessary realtime subscriptions
[ ] Cleanup subscriptions
[ ] Minimize unnecessary re-renders
[ ] Test mobile performance
[ ] Test production build

Untuk gallery dengan banyak media, jangan memuat semua file resolusi penuh sekaligus.

🤝 Contribution

Jika project ini dikembangkan bersama:

1. Fork / Clone

git clone https://github.com/mubaraqmkbs13/class-portfolio.git

2. Buat branch

git checkout -b feature/nama-feature

3. Commit

git add .
git commit -m "feat: add nama feature"

4. Push

git push origin feature/nama-feature

5. Pull Request

Buat Pull Request ke branch utama.

📝 Commit Convention

Gunakan format sederhana:

feat: fitur baru
fix: perbaikan bug
docs: dokumentasi
style: perubahan styling
refactor: refactor kode
perf: optimasi performa
chore: konfigurasi/dependency

Contoh:

git commit -m "feat: add realtime gallery"
git commit -m "fix: resolve image upload issue"
git commit -m "docs: update installation guide"

🌐 Demo

Ganti URL berikut dengan URL deployment Vercel project.

Live Demo: https://your-project.vercel.app

Repository: https://github.com/mubaraqmkbs13/class-portfolio

👨‍💻 Author

Mubaraq Mkbs

GitHub:

https://github.com/mubaraqmkbs13

📄 License

Project ini dapat menggunakan lisensi sesuai kebutuhan project.

Jika project akan dipublikasikan sebagai open source, tambahkan file:

LICENSE

Contoh pilihan:

MIT

Apache-2.0

GPL-3.0

⭐ Support

Jika project ini membantu atau menarik untuk dikembangkan:

⭐ Star repository
🍴 Fork repository
🐛 Report issue
💡 Submit feature request

<div align="center">

🎓 Built to preserve memories, projects, and stories.

Class Portfolio & Digital Diary

</div>
