import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔍 DEBUG: Sync user data on every page change
  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 px-8 py-4 flex justify-between items-center border-b border-gray-100">
      {/* Logo */}
      <Link to="/" className="text-2xl font-black text-orange-500 tracking-tighter">
        BiconHub
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/find-tutors" className="font-bold text-gray-600 hover:text-orange-500 transition">Find Tutors</Link>
        <Link to="/my-orders" className="font-bold text-gray-600 hover:text-orange-500 transition">My Orders</Link>
        <Link to="/favorites" className="font-bold text-gray-600 hover:text-orange-500 transition">Liked Tutors</Link>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3 bg-gray-50 p-1 pr-4 rounded-full border border-gray-100">
            <img 
              src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} 
              className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover" 
              alt="profile" 
            />
            <div className="flex flex-col">
              <span className="text-xs font-black text-gray-900 leading-none">{user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className="text-[10px] font-bold text-red-500 hover:text-red-700 text-left">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="bg-orange-500 text-white px-6 py-2.5 rounded-2xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-100">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;