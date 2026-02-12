import React, { useState } from 'react'; // Added useState
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase'; 
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 🛡️ Prevent double clicks

 const handleGoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("🔥 [FIREBASE] Success:", result.user.email);

        // Line 32: We add a log before the call
        console.log("📡 [AXIOS] Sending sync to backend...");
        const { data } = await axios.post('http://localhost:5000/api/users/sync', {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
            googleId: result.user.uid,
        });

        console.log("💾 [BACKEND] Received user from DB:", data);
        
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/');
        window.location.reload(); 
    } catch (error) {
        // This prints the real reason Login fails in your browser console
        console.error("❌ [LOGIN ERROR]:", error.response?.data || error.message);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md mx-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back</h2>
        
        <button 
          onClick={handleGoogleLogin}
          disabled={loading} // Disable button while processing
          className={`w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
        >
          {loading ? (
            "Connecting..."
          ) : (
            <>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="G" />
              Sign in with Google
            </>
          )}
        </button>

        <button onClick={() => navigate('/')} className="mt-6 text-sm text-gray-500 hover:text-black">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Login;