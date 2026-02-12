import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Music, Palette, Dumbbell, Lightbulb, 
  ChevronDown, ArrowRight, PlayCircle, Package, LogOut, Heart 
} from 'lucide-react';

import HowItWorks from '../components/HowItWorksSection';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // --- SPLASH SCREEN STATE ---
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Load User
    const stored = localStorage.getItem('userInfo');
    if (stored) setUser(JSON.parse(stored));

    // 2. Splash Screen Timers
    const timer1 = setTimeout(() => setFadeOut(true), 2000); // Start fading out at 2s
    const timer2 = setTimeout(() => setShowSplash(false), 2500); // Remove from DOM at 2.5s

    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  // --- RENDER SPLASH SCREEN (The Bulb Intro) ---
  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <div className="animate-bounce mb-6">
           {/* BIG ORANGE BULB */}
           <Lightbulb size={100} className="text-orange-500 fill-orange-100 drop-shadow-xl" />
        </div>
        <h1 className="text-6xl font-black text-gray-900 tracking-tighter animate-pulse">
          Bicon<span className="text-orange-500">Hub</span>
        </h1>
        <p className="mt-4 text-gray-400 font-bold tracking-[0.3em] text-sm uppercase">Unlock Your Potential</p>
      </div>
    );
  }

  // --- MAIN WEBSITE (The Animated Home Page) ---
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* INJECT ANIMATION STYLES */}
      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        @keyframes float-delayed { 0% { transform: translateY(0px); } 50% { transform: translateY(20px); } 100% { transform: translateY(0px); } }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in-up 1s ease-out forwards; }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
      `}</style>

      {/* 1. NAVBAR */}
      {/* <nav className="border-b bg-white sticky top-0 z-[100] bg-opacity-90 backdrop-blur-md">
        <div className="px-6 md:px-12 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <h1 onClick={() => navigate('/')} className="text-2xl font-black cursor-pointer tracking-tighter">
            Bicon<span className="text-orange-500">Hub</span>
          </h1>
          
          <div className="hidden md:flex gap-8 font-bold text-gray-600">
            <button onClick={() => navigate('/find-tutors')} className="hover:text-orange-500 transition">Find Tutors</button>
            <a href="#how-it-works" className="hover:text-orange-500 transition">How It Works</a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2">
                  <img src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} className="w-9 h-9 rounded-full border-2 border-orange-500" alt="profile" />
                  <ChevronDown size={16} />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl border rounded-xl py-2 z-50 animate-fade-in">
                    <button onClick={() => navigate('/my-orders')} className="w-full text-left px-4 py-3 hover:bg-orange-50 font-bold flex items-center gap-2">
                      <Package size={18} className="text-orange-500"/> My Orders
                    </button>
                    <button onClick={() => navigate('/favorites')} className="w-full text-left px-4 py-3 hover:bg-orange-50 font-bold flex items-center gap-2">
                      <Heart size={18} className="text-red-500"/> Liked Tutors
                    </button>
                    <button onClick={() => { localStorage.removeItem('userInfo'); setUser(null); navigate('/login'); }} className="w-full text-left px-4 py-3 text-red-500 border-t font-bold flex items-center gap-2">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => navigate('/login')} className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-orange-200 hover:scale-105 transition-transform">Login</button>
            )}
          </div>
        </div>
      </nav> */}

      {/* 2. ANIMATED HERO SECTION */}
      <div className="relative w-full bg-orange-50 overflow-hidden border-b border-orange-100">
        
        {/* --- ANIMATION BLOBS (Background) --- */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-300 rounded-full blur-[100px] opacity-40 animate-float pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-300 rounded-full blur-[100px] opacity-30 animate-float-delayed pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10 flex flex-col md:flex-row items-center gap-16">
          
          {/* TEXT SIDE (Animated Entry) */}
          <div className="flex-1 text-center md:text-left animate-fade-in">
            <div className="inline-block px-4 py-1.5 bg-white border border-orange-200 text-orange-600 rounded-full font-bold text-xs uppercase tracking-wider mb-6 shadow-sm">
              🚀 #1 Learning Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Unlock Your <br />
              <span className="text-orange-500 inline-block animate-float">True Potential</span>
            </h1>
            
            <p className="text-xl text-gray-600 font-medium mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed delay-100 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
              Connect with verified experts in <strong>Coding, Music, Sports,</strong> and <strong>Academics</strong>. Start your journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start delay-200 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
              <button 
                onClick={() => navigate('/find-tutors')} 
                className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-black hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Find a Tutor <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigate('/find-tutors')} 
                className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-orange-500 hover:text-orange-500 transition-all flex items-center justify-center gap-2"
              >
                <PlayCircle size={20} /> Watch Demo
              </button>
            </div>
          </div>

          {/* IMAGE SIDE (Floating Effect) */}
          <div className="flex-1 w-full relative animate-float-delayed">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-all duration-700">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="Students" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3 animate-pulse">
                 <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                 <p className="font-bold text-gray-800 text-sm">50+ Tutors Online</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. CATEGORIES (Staggered Entry) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-black text-gray-900">Browse by <span className="text-orange-500">Category</span></h2>
          <p className="text-gray-500 mt-2">Pick a subject to get started</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { name: 'Music', icon: <Music size={32} />, color: 'bg-purple-100 text-purple-600' },
            { name: 'Academics', icon: <BookOpen size={32} />, color: 'bg-blue-100 text-blue-600' },
            { name: 'Sports', icon: <Dumbbell size={32} />, color: 'bg-green-100 text-green-600' },
            { name: 'Arts', icon: <Palette size={32} />, color: 'bg-pink-100 text-pink-600' },
            { name: 'Coding', icon: <Lightbulb size={32} />, color: 'bg-yellow-100 text-yellow-600' },
          ].map((cat, index) => (
            <div 
              key={cat.name} 
              onClick={() => navigate(`/find-tutors?subject=${cat.name}`)} 
              className="cursor-pointer bg-white border border-gray-100 p-8 rounded-[2rem] text-center hover:shadow-xl hover:border-orange-300 hover:-translate-y-2 transition-all duration-300 animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${cat.color} transition-transform group-hover:scale-110`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-gray-800">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <div id="how-it-works"><HowItWorks /></div>
      <WhyChooseUs />
    </div>
  );
};

export default Home;