// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Award, Code, Users, Camera } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [stats, setStats] = useState({ members: 0, projects: 0, gallery: 0 });

  // 3D Physics Setup (Framer Motion) untuk Foto
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Varian Animasi ala Modern Portfolio (Staggered Children)
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
    <div className="min-h-screen text-white overflow-hidden relative flex items-center pt-20 pb-20">
      
      {/* ANIMATED BACKGROUND GLOW ORBS (Modern Portfolio Vibe) */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-cyan-600/30 rounded-full filter blur-[150px] pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 -right-32 w-[600px] h-[600px] bg-indigo-600/20 rounded-full filter blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full relative z-10">
        
        {/* KOLOM KIRI: TEKS & TOMBOL (Dengan Staggered Animation) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-slate-300 font-medium text-sm tracking-wide">Welcome to our digital space class of IPA 2020</span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              We Are <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 animate-gradient-x">
                The Future Warrior
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg mt-6 font-light">
              Membangun kenangan, menciptakan karya, dan meninggalkan jejak digital sebagai satu keluarga kelas yang solid.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <Link 
              to="/projects" 
              className="group flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold px-8 py-4 rounded-full shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] transition-all hover:scale-105"
            >
              Explore Projects 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/gallery" 
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-full backdrop-blur-md transition-all hover:scale-105"
            >
              View Gallery
            </Link>
          </motion.div>

          {/* Bento-style Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <Users size={24} className="text-cyan-400 mb-2" />
              <h3 className="text-3xl font-black text-white">{stats.members || '30+'}</h3>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Anggota</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <Code size={24} className="text-blue-400 mb-2" />
              <h3 className="text-3xl font-black text-white">{stats.projects || '15+'}</h3>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Projects</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <Camera size={24} className="text-indigo-400 mb-2" />
              <h3 className="text-3xl font-black text-white">{stats.gallery || '100+'}</h3>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Memories</p>
            </div>
          </motion.div>
        </motion.div>

        {/* KOLOM KANAN: 3D INTERACTIVE TILT HERO CARD DENGAN FOTO */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:col-span-6 flex justify-center items-center perspective-1000 mt-10 lg:mt-0"
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateY,
              rotateX,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-lg aspect-[4/3] rounded-[2rem] p-4 bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 backdrop-blur-xl shadow-2xl cursor-pointer group"
          >
            {/* Frame & Foto Latar.jpg */}
            <div 
              style={{ transform: "translateZ(30px)" }}
              className="w-full h-full rounded-[1.5rem] overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border border-white/10 bg-slate-900"
            >
              {/* Overlay Pattern Dot Opsional untuk Estetika Tech */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px] z-10 pointer-events-none opacity-30"></div>
              
              <img 
                src="/cc.jpg" 
                alt="Class Showcase" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent z-10"></div>
              
              {/* Teks di dalam gambar */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <span className="inline-block px-3 py-1 mb-3 text-[10px] font-extrabold text-cyan-900 bg-cyan-400 rounded-full tracking-widest uppercase">
                  Class Showcase
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight">Kebersamaan Tanpa Batas</h3>
              </div>
            </div>

            {/* FLOATING 3D GLASS BADGES */}
            <motion.div 
              style={{ transform: "translateZ(80px)" }}
              className="absolute -top-6 -right-6 bg-navy-900/80 border border-cyan-500/30 backdrop-blur-xl p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 z-30"
            >
              <div className="p-2.5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl text-white shadow-inner">
                <Award size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Solidaritas</p>
                <p className="text-sm font-extrabold text-white">Angkatan Terbaik</p>
              </div>
            </motion.div>

            <motion.div 
              style={{ transform: "translateZ(100px)" }}
              className="absolute -bottom-8 -left-8 bg-navy-900/80 border border-indigo-500/30 backdrop-blur-xl p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 z-30"
            >
              <div className="p-2.5 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl text-white shadow-inner">
                <Heart size={20} className="fill-white" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Momen Abadi</p>
                <p className="text-sm font-extrabold text-white">Selalu Bersama</p>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}