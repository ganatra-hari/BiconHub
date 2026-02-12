import React, { useState, useEffect } from 'react';
import { Search, Loader, Lightbulb } from 'lucide-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import TutorCard from '../components/TutorCard';

const SearchTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState("default");
  const { search } = useLocation();

  // --- SPLASH SCREEN STATE ---
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // --- LOCAL DATA FALLBACK ---
  const localTeachers = [
    { _id: 't1', name: 'Dr. Anjali Sharma', subject: 'Academics', price: 800, rating: 4.9, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200', description: 'Ph.D. in Mathematics with 10+ years of experience.' },
    { _id: 't2', name: 'Vikram Rathore', subject: 'Coding', price: 1200, rating: 5.0, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', description: 'Senior Full-Stack Developer specializing in React.' },
    { _id: 't3', name: 'Sarah Jenkins', subject: 'Music', price: 600, rating: 4.7, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200', description: 'Professional pianist and vocal coach.' },
    { _id: 't4', name: 'Coach Kabir', subject: 'Sports', price: 500, rating: 4.8, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', description: 'Certified fitness trainer and former athlete.' },
    { _id: 't5', name: 'Ishita Rao', subject: 'Arts', price: 450, rating: 4.6, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200', description: 'Contemporary artist specializing in oil painting.' },
    { _id: 't6', name: 'Rahul Mehta', subject: 'Academics', price: 700, rating: 4.9, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200', description: 'Expert History and Geography tutor.' }
  ];

  // 1. Handle Splash Screen Timer & URL Params
  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1500); 
    const timer2 = setTimeout(() => setShowSplash(false), 2000); 

    const params = new URLSearchParams(search);
    const subjectParam = params.get('subject');
    if (subjectParam) setFilterSubject(subjectParam);

    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [search]);

  // 2. Fetch Tutors
  useEffect(() => {
  // const fetchTutors = async () => { ... } 👈 Comment this out
  setTutors(localTeachers); // ✅ Only use your hardcoded data
  setLoading(false);
}, []);

  // 3. Filtering Logic
  const filteredTutors = tutors
    .filter(t => 
      (filterSubject === "All" || t.subject === filterSubject) &&
      (t.name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (t.price <= maxPrice)
    )
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "topRated") return b.rating - a.rating;
      return 0;
    });

  // --- RENDER SPLASH SCREEN ---
  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <div className="animate-bounce mb-6">
           <Lightbulb size={80} className="text-orange-500 fill-orange-100 drop-shadow-lg" />
        </div>
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter animate-pulse">
          Find<span className="text-orange-500">Tutors</span>
        </h1>
      </div>
    );
  }

  // --- LOADING STATE ---
  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader className="animate-spin text-orange-500" size={40} />
    </div>
  );

  // --- MAIN UI ---
  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-[fade-in_0.5s]">
      {/* CSS Styles */}
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-card { animation: fade-up 0.6s ease-out forwards; opacity: 0; }
      `}</style>

      {/* HEADER & FILTERS */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-black mb-6 animate-[fade-up_0.5s_ease-out]">Find Your <span className="text-orange-500">Teacher</span></h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
              <input 
                type="text" placeholder="Search teacher..." 
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} className="bg-gray-50 px-6 py-3.5 rounded-2xl font-bold outline-none cursor-pointer hover:bg-gray-100 transition">
                {["All", "Academics", "Coding", "Music", "Sports", "Arts"].map(s => <option key={s} value={s}>{s === "All" ? "All Subjects" : s}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-gray-50 px-6 py-3.5 rounded-2xl font-bold outline-none cursor-pointer hover:bg-gray-100 transition">
                <option value="default">Sort By</option>
                <option value="priceLow">Price: Low</option>
                <option value="priceHigh">Price: High</option>
                <option value="topRated">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Price Slider */}
          <div className="flex items-center gap-6 bg-orange-50 p-4 rounded-2xl border border-orange-100">
            <div className="flex flex-col w-48">
              <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Max Price: ₹{maxPrice}</label>
              <input type="range" min="300" max="2000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="accent-orange-500 h-1.5 cursor-pointer" />
            </div>
            <p className="text-xs text-gray-400 font-medium">Showing {filteredTutors.length} results</p>
          </div>
        </div>
      </div>

      {/* TUTOR GRID */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTutors.map((t, index) => (
          <div key={t._id} className="animate-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <TutorCard tutor={t} />
          </div>
        ))}
      </div>
      
      {filteredTutors.length === 0 && (
        <div className="text-center py-20 animate-[fade-up_0.5s]">
           <p className="text-gray-400 font-bold text-xl">No teachers found matching your criteria.</p>
           <button onClick={() => {setFilterSubject("All"); setSearchTerm(""); setMaxPrice(2000)}} className="mt-4 text-orange-500 font-bold hover:underline">Clear Filters</button>
        </div>
      )}
    </div>
  );
};

export default SearchTutors;