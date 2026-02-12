import React, { useState, useEffect } from 'react';
import { Star, Heart } from 'lucide-react';
import BookingModal from './BookingModal';
import axios from 'axios'; 

const TutorCard = ({ tutor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);

  // 1. Identify the Tutor ID (Handle both DB _id and hardcoded id)
  const tutorId = tutor._id || tutor.id;

  // 2. Load User & Check if already favorite
  useEffect(() => {
    try {
      const saved = localStorage.getItem('userInfo');
      if (saved) {
        const currentUser = JSON.parse(saved);
        setUser(currentUser);
        // Check if this specific tutor ID is in the user's favorites list
        if (currentUser.favorites && currentUser.favorites.includes(tutorId)) {
          setIsFavorite(true);
        }
      }
    } catch (e) { 
      console.error("Error loading user info:", e); 
    }
  }, [tutorId]);

  // 3. The Fixed Toggle Function
  const toggleFavorite = async (e) => {
    e.stopPropagation(); // Stop the click from bubbling up
    
    const savedUser = localStorage.getItem('userInfo');
    if (!savedUser) return alert("Please login to save favorites!");

    const userInfo = JSON.parse(savedUser);
    const userId = userInfo._id || userInfo.id;

    // A. Optimistic Update (Turn Red Immediately)
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);

    try {
        // B. Send to Backend
        const { data } = await axios.put(`http://localhost:5000/api/users/favorites/${userId}`, {
            tutorId: tutorId // Send the actual ID
        });

        // C. CRITICAL: Update LocalStorage so it remembers on Refresh
        // The backend returns { message: "...", favorites: [...] }
        if (data.favorites) {
            userInfo.favorites = data.favorites;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            setUser(userInfo); // Update local state
            console.log("✅ Favorites synced:", data.favorites);
        }
        
    } catch (error) {
        console.error("Error updating favorites:", error);
        setIsFavorite(!newStatus); // Revert color if server failed
        alert("Failed to save favorite.");
    }
  };

  if (!tutor) return null;

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 relative hover:shadow-xl transition-all group flex flex-col h-full">
      
      {/* Heart Button (Fixed onClick) */}
      <button 
        onClick={toggleFavorite} 
        className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow-sm hover:scale-110 transition"
      >
        <Heart 
          size={20} 
          className={`transition-colors duration-300 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-300"}`} 
        />
      </button>

      {/* Top Section: Photo and Title */}
      <div className="flex items-center gap-5 mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-500 bg-gray-50 flex-shrink-0">
          <img 
            src={tutor.image || `https://api.dicebear.com/7.x/initials/svg?seed=${tutor.name}`} 
            className="w-full h-full object-cover" 
            alt={tutor.name} 
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-black text-gray-900 truncate">{tutor.name}</h3>
          <p className="text-orange-600 text-[10px] font-black uppercase tracking-widest">{tutor.subject}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-gray-500">{tutor.rating || "5.0"}</span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-6 flex-1">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {tutor.description || "Expert tutor specialized in providing personalized learning experiences to help students excel."}
        </p>
      </div>

      {/* Bottom Section: Price and Button */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
        <div>
          <p className="text--[10px] text-gray-400 font-bold uppercase">Rate</p>
          <p className="text-2xl font-black text-gray-900">₹{tutor.price}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 text-white px-7 py-3 rounded-2xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-100"
        >
          Book Now
        </button>
      </div>

      {isModalOpen && (
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          tutor={tutor} 
          user={user} 
        />
      )}
    </div>
  );
};

export default TutorCard;