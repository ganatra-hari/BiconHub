import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Text */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full font-bold text-sm mb-2">
            🚀 #1 Trusted Tutoring Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
            Master Any Skill, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Unlock Potential.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed">
            Connect with verified experts in <span className="text-gray-900 font-bold">Coding, Music, Sports,</span> and <span className="text-gray-900 font-bold">Academics</span>. Personalized 1-on-1 learning starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={() => navigate('/find-tutors')} 
              className="group bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-gray-200 hover:bg-black hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Find a Tutor <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </button>
            <button 
              onClick={() => navigate('/find-tutors')} 
              className="px-8 py-4 rounded-2xl font-bold text-lg text-gray-700 border-2 border-gray-100 hover:border-orange-500 hover:text-orange-500 transition-all duration-300 flex items-center gap-2 bg-white"
            >
              <PlayCircle size={20} /> Watch Demo
            </button>
          </div>

          {/* Stats Section */}
          <div className="pt-8 flex items-center justify-center md:justify-start gap-8 border-t border-gray-100 mt-8">
            <div>
              <p className="text-3xl font-black text-gray-900">5k+</p>
              <p className="text-sm text-gray-500 font-bold">Active Tutors</p>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div>
              <p className="text-3xl font-black text-gray-900">12k+</p>
              <p className="text-sm text-gray-500 font-bold">Students</p>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div>
              <p className="text-3xl font-black text-gray-900">4.9</p>
              <p className="text-sm text-gray-500 font-bold">Rating</p>
            </div>
          </div>
        </div>

        {/* Right Side: Image with Floating Cards */}
        <div className="flex-1 relative w-full max-w-lg md:max-w-none">
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-700">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
              alt="Students Learning" 
              className="w-full h-full object-cover"
            />
            {/* Floating Badge 1 */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 animate-bounce-slow">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Rated</p>
              <div className="flex text-yellow-400 gap-1 mt-1">
                {'★★★★★'.split('').map((s,i) => <span key={i}>{s}</span>)}
              </div>
            </div>
            {/* Floating Badge 2 */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="font-bold text-gray-800">Tutors Online Now</p>
            </div>
          </div>
          
          {/* Decorative Pattern Dots */}
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-orange-200 rounded-full opacity-20 blur-xl"></div>
        </div>

      </div>
    </div>
  );
};

export default Intro;