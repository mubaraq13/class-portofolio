<div align="center">

# 🎓 Class Portfolio & Digital Diary 🚀

### A Modern, Realtime, & Interactive Memorial Web Application

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
  <a href="#-fitur-unggulan">✨ Fitur</a> •
  <a href="#-tech-stack">🛠️ Tech Stack</a> •
  <a href="#-instalasi">⚙️ Instalasi</a> •
  <a href="#-database">🗄️ Database</a> •
  <a href="#-deployment">🚀 Deployment</a>
</p>

</div>

---

# 📖 Tentang Project

**Class Portfolio & Digital Diary** adalah aplikasi web interaktif yang dibuat untuk mendokumentasikan perjalanan, karya, anggota, cerita, dan berbagai kenangan sebuah kelas dalam satu platform digital.

Project ini dirancang dengan konsep:

- 🎓 Class Portfolio
- 📔 Digital Diary
- 🖼️ Digital Gallery
- 🗓️ Class Timeline
- 💬 Guest Book
- 👥 Member Directory
- 💼 Project Showcase
- 🔐 Admin Dashboard
- ⚡ Realtime Update

Aplikasi menggunakan **React + Vite** pada sisi frontend dan **Supabase** sebagai backend, database PostgreSQL, realtime service, authentication, serta cloud storage.

---

# 🎯 Tujuan Project

Project ini bertujuan untuk membuat sebuah ruang digital yang dapat digunakan oleh satu kelas untuk:

- Menampilkan seluruh anggota kelas.
- Menyimpan dokumentasi foto dan video.
- Menampilkan project atau karya anggota.
- Menyimpan cerita perjalanan kelas.
- Membuat timeline kegiatan.
- Menyediakan buku tamu digital.
- Mengelola konten melalui Admin Dashboard.
- Menggunakan realtime update tanpa refresh halaman.

---

# ✨ Fitur Unggulan

## ⚡ Realtime Auto-Update

Data pada aplikasi dapat diperbarui secara realtime menggunakan **Supabase Realtime**.

Data yang dapat menggunakan realtime:

- Messages
- Stories
- Gallery
- Timeline
- Projects
- Members

Ketika data berubah di database, frontend dapat menerima perubahan tanpa melakukan refresh halaman.

---

## 📖 Interactive Book Reader

Messages dan Stories dibuat dengan konsep seperti membaca buku digital.

Fitur:

- Page transition
- Page flip animation
- Previous page
- Next page
- Book cover
- Smooth animation
- Responsive reader

Contoh konsep:

```text
┌─────────────────────────────┐
│                             │
│        CLASS STORIES        │
│                             │
│     ┌───────────────┐       │
│     │               │       │
│     │    PAGE 01    │       │
│     │               │       │
│     └───────────────┘       │
│                             │
│       ← Previous Next →     │
│                             │
└─────────────────────────────┘

🃏 3D Flip Member Cards

Setiap anggota kelas dapat ditampilkan menggunakan kartu 3D interaktif.

Front



┌────────────────────┐
│                    │
│      PHOTO         │
│                    │
│     Mubaraq        │
│     Developer      │
│                    │
└────────────────────┘

Back



┌────────────────────┐
│      ABOUT ME      │
│                    │
│   Short Biography  │
│                    │
│   🔗 Instagram     │
│   🔗 GitHub        │
│                    │
└────────────────────┘

🎬 Smart Media Support

Aplikasi mendukung media seperti:

JPG

JPEG

PNG

WEBP

GIF

MP4

WEBM

Sistem dapat membedakan image dan video berdasarkan tipe media.

Contoh:



Image
   ↓
Preview
   ↓
Click
   ↓
Image Modal


Video
   ↓
Thumbnail
   ↓
Hover
   ↓
Auto Play

🖼️ Interactive Gallery

Gallery digunakan untuk menyimpan dokumentasi kelas.

Fitur:

Responsive grid

Image preview

Video preview

Modal viewer

Upload media

Delete media

Caption

Category

Timestamp

Contoh:



┌──────────┬──────────┬──────────┐
│          │          │          │
│  IMAGE   │  IMAGE   │  VIDEO   │
│          │          │          │
├──────────┼──────────┼──────────┤
│          │          │          │
│  IMAGE   │  IMAGE   │  IMAGE   │
│          │          │          │
└──────────┴──────────┴──────────┘

💬 Messages / Guest Book

Messages berfungsi sebagai buku tamu digital.

User dapat:

Menulis pesan.

Melihat pesan.

Membaca pesan.

Melihat waktu pesan.

Mendapatkan update realtime.

Admin dapat:

Create

Read

Update

Delete

📔 Stories / Digital Diary

Stories digunakan untuk menyimpan cerita dan perjalanan kelas.

Contoh:

Hari pertama masuk kelas.

Kegiatan kampus.

Praktikum.

Event.

Perjalanan.

Momen lucu.

Project.

Perpisahan.

Kenangan kelas.

🗓️ Timeline

Timeline digunakan untuk mencatat perjalanan kelas berdasarkan waktu.

Contoh:



2024
 │
 ├── 🎓 Awal Perkuliahan
 │
 ├── 🧪 Praktikum Pertama
 │
 ├── 📸 Dokumentasi Kelas
 │
 └── 🏆 Event Kampus
 │
 ▼
2025
 │
 ├── 💻 Project
 │
 ├── 🎓 Semester Akhir
 │
 └── 📸 Graduation

💼 Projects / Class Portfolio

Projects digunakan untuk menampilkan project atau karya anggota kelas.

Informasi project:

Project title

Description

Thumbnail

Technology

Team members

GitHub URL

Live URL

Created date

🔐 Admin Dashboard

Admin Dashboard digunakan untuk mengelola seluruh data aplikasi.

Struktur:



ADMIN DASHBOARD

├── 📊 Dashboard
├── 👥 Members
├── 🖼️ Gallery
├── 💬 Messages
├── 📔 Stories
├── 🗓️ Timeline
└── 💼 Projects

Setiap modul dapat memiliki:



CREATE
READ
UPDATE
DELETE

🛠️ Tech Stack

Frontend

TechnologyFunction



React 18

Frontend Framework

Vite

Build Tool

Tailwind CSS

Styling

Framer Motion

Animation

Lucide React

Icons

React Router DOM

Routing

Backend

TechnologyFunction



Supabase

Backend as a Service

PostgreSQL

Database

Supabase Realtime

Realtime Update

Supabase Storage

File Storage

Supabase Auth

Authentication

Deployment

TechnologyFunction



GitHub

Repository

Vercel

Hosting

🏗️ Arsitektur Sistem



                         USER
                           │
                           ▼
                  ┌─────────────────┐
                  │     Browser     │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  React + Vite   │
                  │    Frontend     │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    Supabase     │
                  └────────┬────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        PostgreSQL      Storage      Realtime
         Database        Bucket      Channels
              │            │            │
              └────────────┼────────────┘
                           │
                           ▼
                    Admin Dashboard

📁 Struktur Folder



📦 class-portfolio
│
├── 📂 public
│   ├── favicon.ico
│   └── assets
│
├── 📂 src
│   │
│   ├── 📂 components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ImageModal.jsx
│   │   ├── Loading.jsx
│   │   └── ...
│   │
│   ├── 📂 pages
│   │   │
│   │   ├── 📂 admin
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ManageGallery.jsx
│   │   │   ├── ManageMembers.jsx
│   │   │   ├── ManageMessages.jsx
│   │   │   ├── ManageProjects.jsx
│   │   │   ├── ManageStories.jsx
│   │   │   └── ManageTimeline.jsx
│   │   │
│   │   ├── Home.jsx
│   │   ├── Gallery.jsx
│   │   ├── Members.jsx
│   │   ├── Messages.jsx
│   │   ├── Projects.jsx
│   │   ├── Stories.jsx
│   │   └── Timeline.jsx
│   │
│   ├── 📂 lib
│   │   ├── supabase.js
│   │   └── storage.js
│   │
│   ├── 📂 hooks
│   │   └── ...
│   │
│   ├── 📂 utils
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── vercel.json
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md

⚙️ Instalasi

1. Requirements

Pastikan sudah menginstall:

Node.js

npm

Git

Visual Studio Code

Cek versi:



node --version
npm --version
git --version

2. Clone Repository



git clone https://github.com/mubaraqmkbs13/class-portfolio.git

Masuk ke folder:



cd class-portfolio

3. Install Dependencies



npm install

4. Environment Variables

Buat file:



.env

di root project.

Isi:



VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

Contoh:



VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

Jangan upload .env ke GitHub.

Tambahkan ke .gitignore:



node_modules
dist
.env
.env.local
.env.*.local

🗄️ Database

Database menggunakan PostgreSQL melalui Supabase.

Tabel utama:



classes
members
gallery
timeline
projects
messages
stories

👥 Table: members

Contoh struktur:



members
│
├── id
├── class_id
├── name
├── photo_url
├── role
├── bio
├── quote
├── social_url
└── created_at

🖼️ Table: gallery



gallery
│
├── id
├── class_id
├── title
├── description
├── media_url
├── media_type
└── created_at

🗓️ Table: timeline



timeline
│
├── id
├── class_id
├── title
├── description
├── event_date
├── image_url
└── created_at

💼 Table: projects



projects
│
├── id
├── class_id
├── title
├── description
├── thumbnail_url
├── github_url
├── project_url
└── created_at

💬 Table: messages



messages
│
├── id
├── class_id
├── name
├── message
└── created_at

📔 Table: stories



stories
│
├── id
├── class_id
├── title
├── content
├── cover_url
└── created_at

⚡ Supabase Realtime

Aktifkan realtime pada tabel yang membutuhkan update langsung.

Contoh implementasi:



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

Jangan lupa melakukan cleanup:



return () => {
  supabase.removeChannel(channel)
}

📁 Supabase Storage

Buat bucket berikut:



timeline-images
project-images
gallery-images
member-photos

Struktur:



Supabase Storage
│
├── timeline-images
│
├── project-images
│
├── gallery-images
│
└── member-photos

Jika file memang dimaksudkan untuk publik, bucket dapat dikonfigurasi sebagai public.

Untuk file privat, gunakan private bucket dan signed URL.

🔒 Security

Environment Variable

Frontend hanya menggunakan:



VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

Jangan pernah memasukkan:



SUPABASE_SERVICE_ROLE_KEY=

ke frontend.

Jangan commit:



.env

ke GitHub.

🛡️ Row Level Security

Gunakan Supabase Row Level Security untuk mengatur permission.

Konsep:



PUBLIC
│
└── SELECT public content


AUTHENTICATED USER
│
└── INSERT message


ADMIN
│
├── SELECT
├── INSERT
├── UPDATE
└── DELETE

RLS harus disesuaikan dengan sistem authentication dan role yang digunakan project.

▶️ Menjalankan Project

Development:



npm run dev

Kemudian buka:



http://localhost:5173

🏭 Production Build

Build:



npm run build

Preview:



npm run preview

🚀 Deployment Vercel

1. Push ke GitHub



git add .



git commit -m "initial project"



git push origin main

2. Deploy ke Vercel

Masuk ke Vercel.



Add New Project
       ↓
Import Git Repository
       ↓
class-portfolio
       ↓
Deploy

🔐 Environment Variables Vercel

Tambahkan:



VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

Contoh:



VITE_SUPABASE_URL
https://your-project.supabase.co

VITE_SUPABASE_ANON_KEY
your-anon-key

🔀 Vercel SPA Routing

Karena menggunakan React Router, tambahkan:



{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

Simpan sebagai:



vercel.json

📱 Responsive Design

Project menggunakan pendekatan mobile-first.

Target device:



📱 Mobile
   ↓
📱 Tablet
   ↓
💻 Laptop
   ↓
🖥️ Desktop

UI harus mendukung:

Touch interaction

Responsive grid

Mobile navigation

Desktop navigation

Responsive modal

Responsive typography

Responsive media

🎨 Design Direction

Style yang digunakan:



Modern
Minimal
Elegant
Interactive
Editorial
Youthful

Elemen UI:

Rounded cards

Soft shadows

Large typography

Smooth transitions

Micro-interactions

Image-focused layout

Glass effect secukupnya

🎬 Animation System

Framer Motion digunakan untuk membuat:



Page Enter
     ↓
Fade + Slide


Card Hover
     ↓
Scale + Shadow


Member Card
     ↓
3D Flip


Gallery
     ↓
Image Reveal


Book
     ↓
Page Flip


Navigation
     ↓
Smooth Transition

Animasi sebaiknya digunakan untuk meningkatkan UX dan bukan hanya sebagai dekorasi.

📊 Performance

Checklist sebelum production:



[ ] Compress images
[ ] Gunakan WebP/AVIF jika sesuai
[ ] Lazy load image
[ ] Lazy load component berat
[ ] Optimalkan realtime subscription
[ ] Cleanup realtime channel
[ ] Hindari unnecessary re-render
[ ] Test mobile
[ ] Test production build
[ ] Test slow internet

Untuk gallery dengan banyak media, hindari memuat seluruh file resolusi penuh sekaligus.

🐛 Troubleshooting

npm install error

Coba:



npm cache verify
npm install

Jika masih bermasalah:



rm -rf node_modules
npm install

Windows PowerShell:



Remove-Item -Recurse -Force node_modules
npm install

Supabase tidak terkoneksi

Periksa .env:



VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

Periksa konfigurasi:



const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY

Setelah mengubah .env, restart:



npm run dev

Realtime tidak bekerja

Periksa:



[ ] Realtime sudah aktif
[ ] Nama table benar
[ ] Schema public benar
[ ] Channel berhasil subscribe
[ ] Tidak ada duplicate subscription
[ ] RLS tidak memblokir akses
[ ] Cleanup channel sudah dibuat

Storage Upload Error

Periksa:



[ ] Nama bucket benar
[ ] Storage policy benar
[ ] User memiliki permission
[ ] File size sesuai
[ ] MIME type sesuai
[ ] URL storage benar

🧹 Development Workflow



Create Feature
      ↓
Create Component
      ↓
Connect Supabase
      ↓
Test Local
      ↓
Fix Bug
      ↓
Git Commit
      ↓
Push GitHub
      ↓
Vercel Build
      ↓
Production

📝 Commit Convention

Gunakan format:



feat:
fix:
docs:
style:
refactor:
perf:
chore:

Contoh:



git commit -m "feat: add realtime gallery"



git commit -m "fix: fix image upload"



git commit -m "docs: update README"



git commit -m "refactor: improve member component"

🤝 Contribution

Clone repository:



git clone https://github.com/mubaraqmkbs13/class-portfolio.git

Buat branch:



git checkout -b feature/nama-feature

Lakukan perubahan kemudian:



git add .

Commit:



git commit -m "feat: add new feature"

Push:



git push origin feature/nama-feature

Kemudian buat Pull Request.

🗺️ Roadmap

Phase 1 — Core

React setup

Vite setup

Tailwind setup

Supabase setup

Database schema

Routing

Phase 2 — Public Website

Home

Members

Gallery

Projects

Stories

Timeline

Messages

Phase 3 — Animation

Page transition

3D flip cards

Book animation

Gallery animation

Scroll animation

Hover video

Phase 4 — Realtime

Realtime Messages

Realtime Gallery

Realtime Stories

Realtime Timeline

Realtime Projects

Phase 5 — Admin

Admin Authentication

Dashboard

Members CRUD

Gallery CRUD

Projects CRUD

Stories CRUD

Timeline CRUD

Messages CRUD

Phase 6 — Production

RLS

Storage policies

Error handling

Performance optimization

SEO

Responsive testing

Vercel deployment

🌐 Demo

Ganti URL berikut dengan URL Vercel project.

Live Website



https://your-project.vercel.app

GitHub Repository



https://github.com/mubaraqmkbs13/class-portfolio

👨‍💻 Author

Mubaraq Mkbs

GitHub:



https://github.com/mubaraqmkbs13

📄 License

Project ini dapat menggunakan license sesuai kebutuhan.

Contoh:



MIT License

Jika ingin menggunakan MIT License, tambahkan file:



LICENSE

ke root repository.

<div align="center">

🎓 Class Portfolio & Digital Diary

Preserve The Memories. Showcase The Journey. 🚀

Made with ❤️ using React, Supabase & Vercel.

</div> ```

lu buat dalam satu file saja

Siap. Ini satu file README.md utuh, tinggal copy-paste semuanya ke README.md.



<div align="center">

# 🎓 Class Portfolio & Digital Diary 🚀

### A Modern, Realtime, & Interactive Memorial Web Application

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<p>
  <strong>Merekam jejak, karya, dan cerita kelas dalam satu ruang digital tanpa batas.</strong>
</p>

<p>
  <a href="#-tentang-project">Tentang</a> •
  <a href="#-fitur-unggulan">Fitur</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-instalasi">Instalasi</a> •
  <a href="#-database">Database</a> •
  <a href="#-deployment">Deployment</a>
</p>

</div>

---

# 📖 Tentang Project

**Class Portfolio & Digital Diary** adalah aplikasi web interaktif yang dibuat untuk mendokumentasikan perjalanan, karya, anggota, cerita, dan berbagai kenangan sebuah kelas dalam satu platform digital.

Project ini menggabungkan konsep:

- 🎓 Class Portfolio
- 📔 Digital Diary
- 🖼️ Digital Gallery
- 🗓️ Class Timeline
- 💬 Guest Book
- 👥 Member Directory
- 💼 Project Showcase
- 🔐 Admin Dashboard
- ⚡ Realtime Update
- ☁️ Cloud Storage

Aplikasi menggunakan **React + Vite** sebagai frontend dan **Supabase** sebagai backend, PostgreSQL database, realtime service, authentication, serta cloud storage.

---

# 🎯 Tujuan Project

Project ini dibuat untuk menyediakan ruang digital bagi sebuah kelas untuk:

- Menampilkan profil anggota kelas.
- Menyimpan dokumentasi foto dan video.
- Menampilkan project dan karya anggota.
- Menyimpan cerita perjalanan kelas.
- Membuat timeline kegiatan.
- Menyediakan buku tamu digital.
- Mengelola seluruh konten melalui Admin Dashboard.
- Memberikan pengalaman realtime tanpa refresh halaman.

---

# ✨ Fitur Unggulan

## ⚡ 1. Realtime Auto-Update

Data aplikasi dapat diperbarui secara realtime menggunakan **Supabase Realtime**.

Data yang dapat menggunakan realtime:

- Messages
- Stories
- Gallery
- Timeline
- Projects
- Members

Ketika data berubah di database, frontend dapat menerima perubahan tanpa melakukan refresh manual.

---

## 📖 2. Interactive Book Reader

Messages dan Stories menggunakan konsep buku digital interaktif.

Fitur:

- Page transition
- Page flip animation
- Previous page
- Next page
- Book cover
- Smooth animation
- Responsive reader

Konsep:

```text
┌─────────────────────────────┐
│                             │
│        CLASS STORIES        │
│                             │
│     ┌───────────────┐       │
│     │               │       │
│     │    PAGE 01    │       │
│     │               │       │
│     └───────────────┘       │
│                             │
│      ← Previous | Next →    │
│                             │
└─────────────────────────────┘

🃏 3. 3D Flip Member Cards

Profil anggota kelas ditampilkan menggunakan kartu 3D interaktif.

Front Side

Menampilkan:

Foto

Nama

Role

Informasi singkat

Back Side

Menampilkan:

Bio

Quote

Social media

Informasi tambahan

🎬 4. Smart Media Support

Aplikasi mendukung:

JPG

JPEG

PNG

WEBP

GIF

MP4

WEBM

Sistem dapat membedakan gambar dan video berdasarkan tipe media.

Contoh:



Image
   ↓
Preview
   ↓
Click
   ↓
Image Modal


Video
   ↓
Thumbnail
   ↓
Hover
   ↓
Auto Play

🖼️ 5. Interactive Gallery

Gallery digunakan untuk menyimpan dokumentasi kelas.

Fitur:

Responsive grid

Image preview

Video preview

Modal viewer

Upload media

Delete media

Caption

Category

Timestamp

💬 6. Messages / Guest Book

Messages berfungsi sebagai buku tamu digital.

User dapat:

Menulis pesan

Melihat pesan

Membaca pesan

Melihat timestamp

Mendapatkan realtime update

Admin dapat:

Create

Read

Update

Delete

📔 7. Stories / Digital Diary

Stories digunakan untuk menyimpan cerita perjalanan kelas.

Contoh:

Hari pertama masuk kelas

Kegiatan kampus

Praktikum

Event

Perjalanan

Momen lucu

Project

Perpisahan

Kenangan kelas

🗓️ 8. Timeline

Timeline digunakan untuk mencatat perjalanan kelas berdasarkan waktu.

Contoh:



2024
 │
 ├── 🎓 Awal Perkuliahan
 │
 ├── 🧪 Praktikum Pertama
 │
 ├── 📸 Dokumentasi Kelas
 │
 └── 🏆 Event Kampus
 │
 ▼
2025
 │
 ├── 💻 Project
 │
 ├── 🎓 Semester Akhir
 │
 └── 📸 Graduation

💼 9. Projects / Class Portfolio

Projects digunakan untuk menampilkan project atau karya anggota kelas.

Informasi project:

Project title

Description

Thumbnail

Technology

Team members

GitHub URL

Live URL

Created date

🔐 10. Secure Admin Dashboard

Admin Dashboard digunakan untuk mengelola seluruh data aplikasi.

Struktur:



ADMIN DASHBOARD

├── 📊 Dashboard
├── 👥 Members
├── 🖼️ Gallery
├── 💬 Messages
├── 📔 Stories
├── 🗓️ Timeline
└── 💼 Projects

Setiap modul dapat memiliki:



CREATE
READ
UPDATE
DELETE

Upload media diarahkan ke Supabase Storage.

Keamanan admin sebaiknya menggunakan Supabase Auth dan Row Level Security (RLS), bukan hanya menyembunyikan route admin.

🛠️ Tech Stack

Frontend

TechnologyFunction



React 18

Frontend Framework

Vite

Build Tool

Tailwind CSS

Styling

Framer Motion

Animation

Lucide React

Icons

React Router DOM

Routing

Backend

TechnologyFunction



Supabase

Backend as a Service

PostgreSQL

Database

Supabase Realtime

Realtime Update

Supabase Storage

File Storage

Supabase Auth

Authentication

Deployment

TechnologyFunction



GitHub

Source Code Repository

Vercel

Hosting & Deployment

🏗️ Arsitektur Sistem



                         USER
                           │
                           ▼
                  ┌─────────────────┐
                  │     Browser     │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  React + Vite   │
                  │    Frontend     │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    Supabase     │
                  └────────┬────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        PostgreSQL      Storage      Realtime
         Database        Bucket      Channels
              │            │            │
              └────────────┼────────────┘
                           │
                           ▼
                    Admin Dashboard

📁 Struktur Project



📦 class-portfolio
│
├── 📂 public
│   ├── favicon.ico
│   └── assets
│
├── 📂 src
│   │
│   ├── 📂 components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ImageModal.jsx
│   │   └── ...
│   │
│   ├── 📂 pages
│   │   │
│   │   ├── 📂 admin
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ManageGallery.jsx
│   │   │   ├── ManageMembers.jsx
│   │   │   ├── ManageMessages.jsx
│   │   │   ├── ManageProjects.jsx
│   │   │   ├── ManageStories.jsx
│   │   │   └── ManageTimeline.jsx
│   │   │
│   │   ├── Home.jsx
│   │   ├── Gallery.jsx
│   │   ├── Members.jsx
│   │   ├── Messages.jsx
│   │   ├── Projects.jsx
│   │   ├── Stories.jsx
│   │   └── Timeline.jsx
│   │
│   ├── 📂 lib
│   │   ├── supabase.js
│   │   └── storage.js
│   │
│   ├── 📂 hooks
│   │   └── ...
│   │
│   ├── 📂 utils
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── vercel.json
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md

⚙️ Instalasi

1. Requirements

Pastikan sudah menginstall:

Node.js LTS

npm

Git

Visual Studio Code

Cek versi:



node --version
npm --version
git --version

2. Clone Repository



git clone https://github.com/mubaraqmkbs13/class-portfolio.git

Masuk ke folder:



cd class-portfolio

3. Install Dependencies



npm install

4. Environment Variables

Buat file:



.env

di root project.

Isi:



VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

Contoh:



VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

Jangan upload .env ke GitHub.

Tambahkan ke .gitignore:



node_modules
dist
.env
.env.local
.env.*.local

🗄️ Database

Database menggunakan PostgreSQL melalui Supabase.

Tabel utama:



classes
members
gallery
timeline
projects
messages
stories

👥 Table: members

Contoh struktur:



members
│
├── id
├── class_id
├── name
├── photo_url
├── role
├── bio
├── quote
├── social_url
└── created_at

🖼️ Table: gallery



gallery
│
├── id
├── class_id
├── title
├── description
├── media_url
├── media_type
└── created_at

🗓️ Table: timeline



timeline
│
├── id
├── class_id
├── title
├── description
├── event_date
├── image_url
└── created_at

💼 Table: projects



projects
│
├── id
├── class_id
├── title
├── description
├── thumbnail_url
├── github_url
├── project_url
└── created_at

💬 Table: messages



messages
│
├── id
├── class_id
├── name
├── message
└── created_at

📔 Table: stories



stories
│
├── id
├── class_id
├── title
├── content
├── cover_url
└── created_at

⚡ Supabase Realtime

Aktifkan realtime pada tabel yang membutuhkan update langsung.

Contoh implementasi:



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

Cleanup subscription:



return () => {
  supabase.removeChannel(channel)
}

📁 Supabase Storage

Buat bucket:



timeline-images
project-images
gallery-images
member-photos

Struktur:



Supabase Storage
│
├── timeline-images
├── project-images
├── gallery-images
└── member-photos

Jika file memang ditujukan untuk publik, bucket dapat dikonfigurasi sebagai public.

Untuk file privat, gunakan private bucket dan signed URLs.

🔒 Security

Environment Variables

Frontend hanya menggunakan:



VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

Jangan pernah memasukkan:



SUPABASE_SERVICE_ROLE_KEY=

ke frontend.

Jangan commit:



.env

ke repository publik.

🛡️ Row Level Security

Gunakan Supabase Row Level Security untuk mengatur permission database.

Konsep:



PUBLIC
│
└── SELECT public content


AUTHENTICATED USER
│
└── INSERT message


ADMIN
│
├── SELECT
├── INSERT
├── UPDATE
└── DELETE

Policy harus disesuaikan dengan sistem authentication dan role project.

▶️ Menjalankan Project

Development mode:



npm run dev

Buka:



http://localhost:5173

🏭 Production Build

Build:



npm run build

Preview:



npm run preview

🚀 Deployment ke Vercel

1. Push ke GitHub



git add .
git commit -m "initial project"
git push origin main

2. Deploy

Di Vercel:



Add New Project
       ↓
Import Git Repository
       ↓
class-portfolio
       ↓
Configure Project
       ↓
Deploy

🔐 Environment Variables Vercel

Tambahkan:



VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

Contoh:



VITE_SUPABASE_URL
https://your-project.supabase.co

VITE_SUPABASE_ANON_KEY
your-anon-key

🔀 Vercel SPA Routing

Karena project menggunakan React Router, buat file:



vercel.json

Isi:



{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

Konfigurasi ini diperlukan agar route seperti:



/members
/gallery
/projects
/stories
/timeline
/messages

tetap dapat diakses ketika halaman direfresh.

📱 Responsive Design

Project menggunakan pendekatan mobile-first.

Target:



📱 Mobile
   ↓
📱 Tablet
   ↓
💻 Laptop
   ↓
🖥️ Desktop

UI harus mendukung:

Touch interaction

Responsive grid

Mobile navigation

Desktop navigation

Responsive modal

Responsive typography

Responsive media

🎨 Design Direction

Style:



Modern
Minimal
Elegant
Interactive
Editorial
Youthful

UI elements:

Rounded cards

Soft shadows

Large typography

Smooth transitions

Micro-interactions

Image-focused layout

Glass effect secukupnya

🎬 Animation System

Framer Motion digunakan untuk:



Page Enter
     ↓
Fade + Slide


Card Hover
     ↓
Scale + Shadow


Member Card
     ↓
3D Flip


Gallery
     ↓
Image Reveal


Book
     ↓
Page Flip


Navigation
     ↓
Smooth Transition

Animasi digunakan untuk meningkatkan UX dan tidak hanya sebagai dekorasi.

📊 Performance Checklist

Sebelum production:



[ ] Compress images
[ ] Gunakan WebP/AVIF jika sesuai
[ ] Lazy load images
[ ] Lazy load component berat
[ ] Optimalkan realtime subscription
[ ] Cleanup realtime channel
[ ] Hindari unnecessary re-render
[ ] Test mobile
[ ] Test production build
[ ] Test koneksi lambat

Untuk gallery dengan banyak media, hindari memuat seluruh file resolusi penuh sekaligus.

🐛 Troubleshooting

npm install Error

Jalankan:



npm cache verify
npm install

Jika masih error:



rm -rf node_modules
npm install

Windows PowerShell:



Remove-Item -Recurse -Force node_modules
npm install

Supabase Tidak Terkoneksi

Periksa:



VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

Periksa konfigurasi:



const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY

Setelah mengubah .env, restart server:



npm run dev

Realtime Tidak Berjalan

Periksa:



[ ] Realtime sudah aktif
[ ] Nama table benar
[ ] Schema public benar
[ ] Channel berhasil subscribe
[ ] Tidak ada duplicate subscription
[ ] RLS tidak memblokir akses
[ ] Cleanup channel sudah dibuat

Storage Upload Error

Periksa:



[ ] Nama bucket benar
[ ] Storage policy benar
[ ] User memiliki permission
[ ] File size sesuai
[ ] MIME type sesuai
[ ] URL storage benar

🧹 Development Workflow



Create Feature
      ↓
Create Component
      ↓
Connect Supabase
      ↓
Test Local
      ↓
Fix Bug
      ↓
Git Commit
      ↓
Push GitHub
      ↓
Vercel Build
      ↓
Production

📝 Commit Convention

Gunakan format:



feat:
fix:
docs:
style:
refactor:
perf:
chore:

Contoh:



git commit -m "feat: add realtime gallery"



git commit -m "fix: fix image upload"



git commit -m "docs: update README"



git commit -m "refactor: improve member component"

🤝 Contribution

Clone repository:



git clone https://github.com/mubaraqmkbs13/class-portfolio.git

Buat branch:



git checkout -b feature/nama-feature

Lakukan perubahan:



git add .

Commit:



git commit -m "feat: add new feature"

Push:



git push origin feature/nama-feature

Kemudian buat Pull Request.

🗺️ Roadmap

Phase 1 — Core

React setup

Vite setup

Tailwind setup

Supabase setup

Database schema

Routing

Phase 2 — Public Website

Home

Members

Gallery

Projects

Stories

Timeline

Messages

Phase 3 — Animation

Page transition

3D flip cards

Book animation

Gallery animation

Scroll animation

Hover video

Phase 4 — Realtime

Realtime Messages

Realtime Gallery

Realtime Stories

Realtime Timeline

Realtime Projects

Phase 5 — Admin

Admin Authentication

Dashboard

Members CRUD

Gallery CRUD

Projects CRUD

Stories CRUD

Timeline CRUD

Messages CRUD

Phase 6 — Production

RLS

Storage policies

Error handling

Performance optimization

SEO

Responsive testing

Vercel deployment

⚖️ Analisis Project

🟢 Kelebihan

1. Modern Architecture

React + Vite memberikan struktur frontend yang modular dan development workflow yang cepat.

2. Realtime Experience

Supabase Realtime memungkinkan aplikasi menerima perubahan data tanpa refresh manual.

3. Low Infrastructure Complexity

Supabase menyediakan database, storage, authentication, dan realtime dalam satu platform.

4. Modular Frontend

Komponen React dapat digunakan kembali sehingga project lebih mudah dikembangkan.

5. Responsive

Tailwind CSS mempermudah pembuatan UI responsive.

6. Rich Interaction

Framer Motion memungkinkan implementasi:

Page transition

Flip card

Scroll animation

Modal animation

Micro-interaction

🔴 Kekurangan & Limitasi

1. Service Limits

Layanan cloud memiliki batas penggunaan berdasarkan paket yang digunakan.

2. SPA SEO

React SPA memerlukan konfigurasi tambahan jika SEO menjadi prioritas utama.

3. Internet Dependency

Fitur realtime dan cloud storage membutuhkan koneksi internet.

4. Realtime Connection Management

Subscription harus dikelola dengan benar agar tidak terjadi:

Duplicate listeners

Memory leaks

Unnecessary connections

5. Security Configuration

Supabase membutuhkan konfigurasi RLS, Authentication, Storage Policy, dan Database Policy yang benar sebelum digunakan di production.

🧪 Production Checklist

Sebelum deployment:



SECURITY
[ ] .env tidak di-commit
[ ] Service role key tidak ada di frontend
[ ] RLS sudah dikonfigurasi
[ ] Storage policy sudah dikonfigurasi
[ ] Admin authentication aktif

DATABASE
[ ] Semua table tersedia
[ ] Foreign key benar
[ ] Timestamp tersedia
[ ] Realtime dikonfigurasi

FRONTEND
[ ] Semua route bekerja
[ ] Mobile responsive
[ ] Desktop responsive
[ ] Loading state tersedia
[ ] Error state tersedia
[ ] Empty state tersedia

MEDIA
[ ] Image compression
[ ] Video size diperhatikan
[ ] Storage bucket benar
[ ] Upload berhasil
[ ] Delete file berhasil

DEPLOYMENT
[ ] npm run build berhasil
[ ] Environment Variables tersedia
[ ] vercel.json tersedia
[ ] Production URL berhasil
[ ] Refresh route tidak menghasilkan 404

🌐 Demo

Ganti URL berikut dengan URL Vercel project:



https://your-project.vercel.app

Repository:



https://github.com/mubaraqmkbs13/class-portfolio

👨‍💻 Author

Mubaraq Mkbs

GitHub:



https://github.com/mubaraqmkbs13

📄 License

Project ini dapat menggunakan license sesuai kebutuhan.

Contoh:



MIT License

Jika menggunakan MIT License, tambahkan file:



LICENSE

ke root repository.

<div align="center">

🎓 Class Portfolio & Digital Diary

Preserve The Memories. Showcase The Journey. 🚀

Made with ❤️ using React, Supabase & Vercel.

</div> ```
