import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, ArrowLeft, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TutorCard from '../components/TutorCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // LOCAL TEACHER DATA FOR LOOKUP (Matches SearchTutors)
  const localTeachers = [
    { _id: 't1', name: 'Dr. Anjali Sharma', subject: 'Academics', price: 800, rating: 4.9, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200', description: 'Ph.D. in Mathematics.' },
    { _id: 't2', name: 'Vikram Rathore', subject: 'Coding', price: 1200, rating: 5.0, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', description: 'Senior Full-Stack Developer.' },
    { _id: 't3', name: 'Sarah Jenkins', subject: 'Music', price: 600, rating: 4.7, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200', description: 'Professional pianist.' },
    { _id: 't4', name: 'Coach Kabir', subject: 'Sports', price: 500, rating: 4.8, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', description: 'Certified fitness trainer.' },
    { _id: 't5', name: 'Ishita Rao', subject: 'Arts', price: 450, rating: 4.6, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200', description: 'Contemporary artist.' },
    { _id: 't6', name: 'Rahul Mehta', subject: 'Academics', price: 700, rating: 4.9, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200', description: 'Expert History tutor.' }
  ];

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const saved = localStorage.getItem('userInfo');
        const user = saved ? JSON.parse(saved) : null;
        const favIds = user?.favorites || [];
        
        // Combine local and remote data to find matches
        // In a real app, you'd fetch from backend. Here we use localTeachers as the source of truth for "All Tutors"
        const matchedTutors = localTeachers.filter(t => favIds.includes(t._id));
        setFavorites(matchedTutors);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchFavs();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader className="animate-spin text-orange-500"/></div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop { animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; opacity: 0; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 font-bold text-gray-500 hover:text-black transition">
          <ArrowLeft size={20}/> Back
        </button>
        
        <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-full"><Heart className="fill-red-500 text-red-500" size={24}/></div>
          Liked Tutors
        </h1>
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {favorites.map((t, index) => (
              <div key={t._id} className="animate-pop" style={{ animationDelay: `${index * 0.1}s` }}>
                <TutorCard tutor={t} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium text-lg">You haven't liked any tutors yet.</p>
            <button onClick={() => navigate('/find-tutors')} className="mt-4 text-orange-500 font-bold hover:underline">Browse Tutors</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;