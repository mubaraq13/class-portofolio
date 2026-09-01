// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLayout from './components/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Members from './pages/Members';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Timeline from './pages/Timeline';
import Messages from './pages/Messages';
import Stories from './pages/Stories';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageMembers from './pages/admin/ManageMembers';
import ManageProjects from './pages/admin/ManageProjects';
import ManageGallery from './pages/admin/ManageGallery';
import ManageTimeline from './pages/admin/ManageTimeline';
import ManageMessages from './pages/admin/ManageMessages';
import ManageStories from './pages/admin/ManageStories';

export default function App() {
  return (
    <Router>
      {/* === JURUS PAMUNGKAS: BACKGROUND MOBILE ANTI LOMPAT === */}
      {/* Kita pakai fixed inset-0 dan tag <img> asli, bukan CSS background */}
      <div className="fixed inset-0 w-full h-full -z-20 pointer-events-none bg-navy-900">
        
        {/* Gambar Latar Asli */}
        <img 
          src="/latar.jpg" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* OVERLAY GLASSMORPHISM: Gelap & Blur */}
        <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-[4px]"></div>
      </div>

      {/* === KONTEN UTAMA === */}
      <div className="relative min-h-screen overflow-x-hidden flex flex-col">
        <Navbar />
        
        <div className="flex-grow">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/members" element={<Members />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/stories" element={<Stories />} />

            {/* ADMIN LOGIN */}
            <Route path="/admin/login" element={<Login />} />

            {/* ADMIN ROUTES */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/members" element={<ManageMembers />} />
              <Route path="/admin/projects" element={<ManageProjects />} />
              <Route path="/admin/gallery" element={<ManageGallery />} />
              <Route path="/admin/timeline" element={<ManageTimeline />} />
              <Route path="/admin/messages" element={<ManageMessages />} />
              <Route path="/admin/stories" element={<ManageStories />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}