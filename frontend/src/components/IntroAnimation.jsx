import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CHANGED: Importing .jpeg now ---
import bulbLogo from '../assets/bulb-logo.jpeg'; 

const IntroAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600); 
    }, 3800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.8 }}
        >
          {/* --- BACKGROUND: Colorful Animated Blobs --- */}
          <div className="absolute inset-0 z-0">
            {/* 1. Yellow Blob */}
            <motion.div 
              className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-yellow-300 rounded-full blur-[100px] opacity-40"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                rotate: [0, 90, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* 2. Blue Blob */}
            <motion.div 
              className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px] opacity-30"
              animate={{ 
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* 3. Purple Blob */}
            <motion.div 
              className="absolute top-[30%] right-[20%] w-72 h-72 bg-purple-400 rounded-full blur-[80px] opacity-30"
              animate={{ 
                y: [0, -40, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* --- FOREGROUND: Logo & Text --- */}
          <div className="relative z-10 flex items-center">
            
            {/* Logo Image */}
            <motion.img
              src={bulbLogo}
              alt="BiconHub Logo"
              // Added 'mix-blend-multiply' to help the JPEG white background blend in
              className="w-32 h-32 md:w-48 md:h-48 z-20 object-contain drop-shadow-2xl mix-blend-multiply"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                duration: 1.5 
              }}
            />

            {/* Sliding Text Reveal */}
            <motion.div 
              className="overflow-hidden flex items-center z-10 -ml-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "circOut" }}
            >
              <div className="pl-6 pr-8 whitespace-nowrap">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-800 leading-none">
                  Bicon<span className="text-yellow-500">Hub</span>
                </h1>
                <p className="text-sm md:text-lg text-gray-600 font-medium tracking-wide mt-2">
                  Personalized Learning at Your Doorstep
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;