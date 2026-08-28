// src/data/dummyData.js

// Catatan: Ganti URL foto gedung dengan foto sekolah asli dari User.
export const classInfo = {
  name: "IPA 1 2023",
  department: "IPA",
  institution: "SMA Negeri 1 (Demo)",
  period: "2020 — 2023",
  motto: "Grow Together",
  tagline: "One Class. One Story. One Journey.",
  heroImage: "https:/     /images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop", // GANTI FOTO SEKOLAH DISINI
  stats: {
    members: 32,
    projects: 18,
    achievements: 12
  }
};

export const members = [
  {
    id: "1",
    name: "Budi Santoso",
    role: "Class President / Mechanic",
    bio: "Passionate about automotive engines and leadership.",
    skills: ["Mechanical Design", "AutoCAD", "Leadership"],
    photo: "https://i.pravatar.cc/300?img=11"
  },
  {
    id: "2",
    name: "Siti Aminah",
    role: "Lead Designer",
    bio: "Merging engineering with aesthetic design.",
    skills: ["Design", "SolidWorks", "UI/UX"],
    photo: "https://i.pravatar.cc/300?img=5"
  }
];

export const projects = [
  {
    id: "1",
    title: "Eco-Friendly Go-Kart",
    category: "Automotive",
    year: 2025,
    cover: "https://images.unsplash.com/photo-1518134346374-184f9d21cea2?q=80&w=800&auto=format&fit=crop",
    description: "Merancang Go-Kart bertenaga listrik ringan."
  }
];

// src/data/dummyData.js (Tambahkan di bagian paling bawah)

export const skillCategories = [
  "All",
  "Mechanical Design",
  "Automotive",
  "Programming",
  "Design",
  "Data",
  "Entrepreneurship"
];

export const extendedMembers = [
  {
    id: "1",
    name: "Budi Santoso",
    role: "Class President / Mechanic",
    bio: "Passionate about automotive engines and leadership.",
    skills: ["Mechanical Design", "Automotive", "Leadership"],
    photo: "https://i.pravatar.cc/300?img=11"
  },
  {
    id: "2",
    name: "Siti Aminah",
    role: "Lead Designer",
    bio: "Merging engineering with aesthetic design.",
    skills: ["Design", "Mechanical Design", "UI/UX"],
    photo: "https://i.pravatar.cc/300?img=5"
  },
  {
    id: "3",
    name: "Ahmad Fauzi",
    role: "Programmer",
    bio: "Automating mechanical systems with code.",
    skills: ["Programming", "Data", "Python"],
    photo: "https://i.pravatar.cc/300?img=15"
  },
  {
    id: "4",
    name: "Diana Putri",
    role: "Entrepreneur",
    bio: "Building business out of mechanical innovations.",
    skills: ["Entrepreneurship", "Management"],
    photo: "https://i.pravatar.cc/300?img=9"
  }
];

// src/data/dummyData.js (Tambahkan di bagian paling bawah)

export const galleryCategories = [
  "All",
  "Activities",
  "Projects",
  "Competition",
  "Study Tour",
  "Memories"
];

export const galleryData = [
  {
    id: "g1",
    title: "Praktek Mesin Bubut",
    category: "Activities",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    date: "12 Aug 2024",
    description: "Praktek pertama pengoperasian mesin bubut di bengkel utama sekolah."
  },
  {
    id: "g2",
    title: "Juara 1 Lomba CAD/CAM",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    date: "05 Nov 2024",
    description: "Perwakilan kelas memenangkan lomba desain teknik tingkat provinsi."
  },
  {
    id: "g3",
    title: "Perakitan Go-Kart",
    category: "Projects",
    image: "https://images.unsplash.com/photo-1563452675059-efa1e2e7a787?q=80&w=800&auto=format&fit=crop",
    date: "20 Jan 2025",
    description: "Proses perakitan rangka dan mesin untuk project akhir semester."
  },
  {
    id: "g4",
    title: "Study Tour Industri",
    category: "Study Tour",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
    date: "15 Mar 2025",
    description: "Kunjungan industri ke pabrik perakitan mobil Astra."
  },
  {
    id: "g5",
    title: "Momen Nongkrong Kantin",
    category: "Memories",
    image: "https://images.unsplash.com/photo-1523580494112-7498e81f51db?q=80&w=800&auto=format&fit=crop",
    date: "Setiap Hari",
    description: "Briefing santai (baca: makan gorengan) sebelum masuk jam bengkel."
  },
  {
    id: "g6",
    title: "Ujian Kompetensi",
    category: "Activities",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
    date: "10 Jun 2025",
    description: "Fokus maksimal saat ujian kompetensi keahlian (UKK)."
  }
];

// src/data/dummyData.js (Tambahkan di bagian paling bawah)

export const timelineData = [
  {
    id: "t1",
    year: "2024",
    date: "15 Juli 2024",
    title: "Hari Pertama Masuk (MPLS)",
    description: "Awal mula berkumpulnya 32 siswa dengan mimpi yang sama di jurusan Teknik Mesin. Masa Pengenalan Lingkungan Sekolah yang penuh canda dan kecanggungan.",
    icon: "flag", // Kita akan mapping ini ke icon Lucide
  },
  {
    id: "t2",
    year: "2024",
    date: "17 Agustus 2024",
    title: "Juara 2 Tarik Tambang",
    description: "Prestasi pertama kelas kita! Walau baru kenal sebulan, kekompakan anak mesin langsung teruji di lapangan saat 17-an.",
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop",
    icon: "award"
  },
  {
    id: "t3",
    year: "2025",
    date: "10 Januari 2025",
    title: "Project: Mesin Pemotong Sederhana",
    description: "Project kolaborasi pertama di bengkel. Bau oli, percikan las, dan presentasi yang bikin deg-degan di depan kepala bengkel.",
    icon: "wrench"
  },
  {
    id: "t4",
    year: "2025",
    date: "15 Maret 2025",
    title: "Kunjungan Industri ke Jakarta",
    description: "Tour edukasi melihat langsung proses perakitan mobil skala besar. Momen paling seru saat nginap di villa bareng satu kelas.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
    icon: "map"
  },
  {
    id: "t5",
    year: "2026",
    date: "Mei 2026 (Mendatang)",
    title: "Ujian Kompetensi Keahlian (UKK)",
    description: "Ujian pembuktian skill selama 3 tahun. Target: Lulus 100% dengan nilai kompeten!",
    icon: "target"
  },
  {
    id: "t6",
    year: "2026",
    date: "Juni 2026 (Mendatang)",
    title: "Graduation Day",
    description: "Satu kelas, satu cerita, satu perjalanan. Siap melangkah ke dunia profesional atau kampus impian.",
    icon: "graduation"
  }
];

// src/data/dummyData.js (Tambahkan di bagian paling bawah)

export const projectCategories = [
  "All",
  "Automotive",
  "Robotics",
  "Eco-Tech",
  "Manufacturing"
];

export const extendedProjects = [
  {
    id: "p1",
    title: "Eco-Friendly Go-Kart",
    category: "Automotive",
    year: 2025,
    cover: "https://images.unsplash.com/photo-1518134346374-184f9d21cea2?q=80&w=800&auto=format&fit=crop",
    description: "Merancang Go-Kart bertenaga listrik ringan dari rangka pipa bekas. Kecepatan maksimal 40km/jam dengan jarak tempuh 20km.",
    technologies: ["Welding", "EV Battery", "CAD"],
    team: ["Budi S.", "Siti A.", "Ahmad F."]
  },
  {
    id: "p2",
    title: "Smart CNC Router",
    category: "Manufacturing",
    year: 2025,
    cover: "https://images.unsplash.com/photo-1620021481545-207d510fffc1?q=80&w=800&auto=format&fit=crop",
    description: "Modifikasi mesin CNC konvensional menjadi otomatis berbasis Arduino untuk pemotongan kayu presisi tinggi.",
    technologies: ["Arduino", "G-Code", "Machining"],
    team: ["Ahmad F.", "Diana P."]
  },
  {
    id: "p3",
    title: "Hydraulic Robot Arm",
    category: "Robotics",
    year: 2026,
    cover: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=800&auto=format&fit=crop",
    description: "Lengan robot hidrolik sederhana untuk simulasi pemindahan barang berat di area pabrik.",
    technologies: ["Hydraulics", "Mechanics", "SolidWorks"],
    team: ["Siti A.", "Budi S."]
  },
  {
    id: "p4",
    title: "Mesin Pencacah Plastik",
    category: "Eco-Tech",
    year: 2024,
    cover: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop",
    description: "Inovasi mesin pencacah botol plastik untuk mendukung bank sampah sekolah. Menggunakan motor 1.5 HP.",
    technologies: ["Fabrication", "Motor AC", "Safety"],
    team: ["Seluruh Kelas"]
  }
];