// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Award, Users, Code, Camera, AtSign } from 'lucide-react'; 
import { supabase } from '../lib/supabase';

export default function Home() {
  const [stats, setStats] = useState({ members: 0, projects: 0, gallery: 0 });

  // Setup 3D Physics Tilt Effect untuk Foto
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: membersCount } = await supabase.from('members').select('*', { count: 'exact', head: true });
      const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      const { count: galleryCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true });

      setStats({
        members: membersCount || 0,
        projects: projectsCount || 0,
        gallery: galleryCount || 0,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Varian Animasi Masuk Beruntun (Staggered)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative flex items-center pt-24 pb-20">
      
      {/* Background Animated Glow Orbs (OPTIMASI: Disembunyikan di HP dengan hidden md:block biar enteng) */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-1/4 -left-32 w-[500px] h-[500px] bg-cyan-600/20 rounded-full filter blur-[150px] pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden md:block absolute bottom-0 -right-32 w-[600px] h-[600px] bg-indigo-600/20 rounded-full filter blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
        
        {/* KOLOM KIRI: TEKS & STATISTIK BENTO */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-slate-300 font-medium text-sm tracking-wide">Welcome to our MIPA 1 2020</span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              We Are <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                The Future Warrior
              </span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg font-light">
              Membangun kenangan, menciptakan karya, dan meninggalkan jejak digital sebagai satu keluarga kelas yang solid.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <Link 
              to="/projects" 
              className="group flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold px-8 py-3.5 rounded-full shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] transition-all hover:scale-105"
            >
              Explore Projects 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/gallery" 
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3.5 rounded-full backdrop-blur-md transition-all hover:scale-105"
            >
              View Gallery
            </Link>
          </motion.div>

          {/* Bento-style Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            
            <Link to="/members" className="block bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/50 transition-all hover:-translate-y-1 group">
              <Users size={22} className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black text-white">{stats.members || '0'}</h3>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">Anggota</p>
            </Link>
            
            <Link to="/projects" className="block bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-1 group">
              <Code size={22} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black text-white">{stats.projects || '0'}</h3>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">Projects</p>
            </Link>
            
            <Link to="/gallery" className="block bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/10 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
              <Camera size={22} className="text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black text-white">{stats.gallery || '0'}</h3>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">Memories</p>
            </Link>

          </motion.div>
        </motion.div>

        {/* KOLOM KANAN: 3D TILT FOTO UTUH */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:col-span-6 flex justify-center items-center perspective-1000 mt-6 lg:mt-0"
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateY,
              rotateX,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-lg aspect-[16/10] rounded-[2rem] p-3 bg-gradient-to-br from-white/15 via-white/5 to-transparent border border-white/20 backdrop-blur-xl shadow-2xl cursor-pointer group"
          >
            {/* Frame & Foto Latar Tampil Utuh */}
            <div 
              style={{ transform: "translateZ(25px)" }}
              className="w-full h-full rounded-[1.3rem] overflow-hidden relative shadow-inner border border-white/10 bg-slate-900 flex items-center justify-center"
            >
              <img 
                src="/photo2.jpg" 
                alt="Class Showcase" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="inline-block px-3 py-1 mb-1 text-[10px] font-extrabold text-cyan-900 bg-cyan-400 rounded-full tracking-widest uppercase">
                  family class 
                </span>
                <h3 className="text-lg font-bold text-white leading-tight">Kebersamaan Tanpa Batas</h3>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 🌟 TOMBOL INSTAGRAM KELAS DI PALING BAWAH TENGAH 🌟 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
      >
        <a 
          href="https://instagram.com/comfas_one" // <-- JANGAN LUPA GANTI USERNAME DISINI!
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md rounded-full shadow-lg transition-all hover:-translate-y-1 group"
        >
          <div className="bg-gradient-to-tr from-yellow-500 via-red-500 to-pink-500 p-1.5 rounded-full flex items-center justify-center shadow-md">
            <AtSign size={14} className="text-white group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors tracking-wide pr-1">
            Follow <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 group-hover:from-pink-300 group-hover:to-yellow-300">@comfas_one</span>
          </span>
        </a>
      </motion.div>

    </div>
  );
}