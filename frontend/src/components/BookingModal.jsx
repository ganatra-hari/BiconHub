import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, Calendar, Clock, CheckCircle, Loader, AlertTriangle, Smartphone, CreditCard, Receipt, FileText } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ isOpen, onClose, tutor, user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // --- Form States ---
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hours, setHours] = useState(1);
  const [plan, setPlan] = useState('single'); 
  const [selectedDays, setSelectedDays] = useState([]);
  
  // --- Payment States ---
  const [paymentMethod, setPaymentMethod] = useState('cash'); 
  const [onlineType, setOnlineType] = useState('qr'); 

  if (!isOpen) return null;

  // --- 1. DATE & TIME LOGIC (NO PAST DATES) ---
  const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD
  const currentTime = new Date();

  const isTimeValid = (timeStr) => {
    if (date !== today) return true; // Future dates are always valid
    if (!timeStr) return false;

    // Convert "09:00 AM" to Date object
    const [timePart, modifier] = timeStr.split(' ');
    let [hours, minutes] = timePart.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);

    return selectedTime > currentTime; // Must be in future
  };

  // --- GET TUTOR RULES ---
  const rules = tutor.tutorProfile || {
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    availableTimeStart: "08:00",
    availableTimeEnd: "22:00",
    allowedPlans: ["single", "monthly", "6months", "yearly"]
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) setSelectedDays(selectedDays.filter(d => d !== day));
    else setSelectedDays([...selectedDays, day]);
  };

  const selectAvailableWeek = () => {
    if (selectedDays.length === rules.availableDays.length) setSelectedDays([]); 
    else setSelectedDays(rules.availableDays);
  };

  // --- 2. PRICING & RECEIPT LOGIC ---
  const getBillDetails = () => {
    const hourlyRate = tutor.price || 500;
    const daysFactor = selectedDays.length || 2; 
    let subtotal = 0;
    let lectureCount = 0;
    let label = "";

    switch (plan) {
      case 'single': 
        subtotal = hourlyRate * hours;
        lectureCount = 1;
        label = "Single Session";
        break;
      case 'monthly': 
        lectureCount = daysFactor * 4; // 4 weeks
        subtotal = hourlyRate * lectureCount; 
        label = "Monthly Plan";
        break;
      case '6months': 
        lectureCount = daysFactor * 4 * 6;
        subtotal = (hourlyRate * lectureCount) * 0.9; // 10% Discount
        label = "6 Months Bundle";
        break;
      case 'yearly': 
        lectureCount = daysFactor * 4 * 12;
        subtotal = (hourlyRate * lectureCount) * 0.8; // 20% Discount
        label = "Yearly Bundle";
        break;
      default: break;
    }

    const gst = subtotal * 0.18; // 18% GST
    const total = subtotal + gst;

    return { label, lectureCount, subtotal, gst, total };
  };

  const bill = getBillDetails();

  // --- TIME SLOTS GENERATOR ---
  const timeOptions = [];
  let startHour = parseInt(rules.availableTimeStart.split(':')[0]);
  let endHour = parseInt(rules.availableTimeEnd.split(':')[0]);
  for(let i = startHour; i < endHour; i++) {
    const ampm = i >= 12 ? 'PM' : 'AM';
    const hour12 = i % 12 || 12;
    const timeStr = `${hour12 < 10 ? '0' + hour12 : hour12}:00 ${ampm}`;
    timeOptions.push(timeStr);
  }

const handleConfirm = async () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const activeUserId = userInfo?._id; 

  const bookingData = {
    // ✅ MUST BE 'user' (This is what MyOrders.jsx searches for)
    user: activeUserId, 
    
    // ✅ MUST BE 'tutor' 
    tutor: tutor._id,
    
    // These strings allow display without a Tutor database
    tutorName: tutor.name,
    subject: tutor.subject,
    amount: tutor.price,
    date: selectedDate,
    time: selectedTime,
    status: 'Confirmed'
  };

  await axios.post('http://localhost:5000/api/bookings/create', bookingData);
  navigate('/my-orders');
};
  // --- SUBMIT BOOKING ---
 // --- SUBMIT BOOKING (DEBUG VERSION) ---
// Inside BookingModal.jsx
const handleBooking = async () => {
    // --- 1. GET USER DATA ---
    const saved = localStorage.getItem('userInfo');
    const currentUser = saved ? JSON.parse(saved) : null;

    // 🔍 DEBUG: Check if we actually found a user
    console.log("👤 Logged in User:", currentUser);

    // --- 2. VALIDATE USER ID ---
    // Try both '_id' (MongoDB) and 'id' (Standard) to be safe
    const activeUserId = currentUser?._id || currentUser?.id;

    if (!activeUserId) {
        alert("❌ Error: User ID not found. Please log out and log in again.");
        console.error("CRITICAL: No User ID found in localStorage!");
        return; // 🛑 STOP HERE (Don't crash the server)
    }

    // --- 3. PREPARE DATA ---
    setLoading(true);

    // 🛡️ TUTOR ID FALLBACK:
    // If tutor._id is missing (because it's hardcoded), use a random string so the backend doesn't crash.
    const validTutorId = tutor._id || tutor.id || "HARDCODED_TUTOR_ID";

    const payload = {
        // ✅ The User ID (Solved your "Path user is required" error)
        user: activeUserId,  

        // ✅ The Tutor ID (Solved your "Path tutor is required" error)
        tutor: validTutorId,

        // String Fields
        userEmail: currentUser.email,
        userName: currentUser.name,
        tutorName: tutor.name,
        subject: tutor.subject,
        date: date,          
        time: time,          
        totalPrice: bill.total,
        paymentMethod: paymentMethod, 
        status: 'Pending'
    };

    // 🔍 DEBUG: See exactly what we are sending
    console.log("🚀 Sending Payload:", payload);

    const config = {
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser.token}` 
        }
    };

    // --- 4. SEND TO SERVER ---
    try {
        // Ensure this URL matches your Server (try with or without /create if 404)
        const { data } = await axios.post('http://localhost:5000/api/bookings', payload, config);
        
        if (data) { 
            console.log("✅ Server Response:", data);
            alert("✅ Booking Confirmed!"); 
            onClose(); 
            navigate('/my-orders'); 
        }
    } catch (error) {
        console.error("❌ BOOKING ERROR:", error.response?.data || error.message);
        alert(`Booking Failed: ${error.response?.data?.message || "Server Error"}`);
    } finally { 
        setLoading(false); 
    }
};

  const upiId = import.meta.env.VITE_UPI_ID || "paytmqr2810050501011@paytm"; 
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${upiId}&pn=BiconHub&am=${bill.total}&cu=INR`)}`;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99999] p-4">
      <div className="bg-white rounded-[2rem] p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition"><X size={24} /></button>

        <div className="mb-6">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Book Session</p>
          <h2 className="text-3xl font-black text-gray-900">{tutor.name}</h2>
          <p className="text-sm font-medium text-gray-500">{tutor.subject} Expert • ₹{tutor.price}/hr</p>
        </div>

        {/* --- PLAN SELECTION --- */}
        <div className="bg-gray-50 p-1.5 rounded-xl flex font-bold text-sm mb-6">
           <button onClick={() => setPlan('single')} className={`flex-1 py-2.5 rounded-lg transition-all ${plan === 'single' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>Single Session</button>
           <button onClick={() => setPlan('monthly')} className={`flex-1 py-2.5 rounded-lg transition-all ${plan !== 'single' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>Membership Bundle</button>
        </div>

        {/* --- DATE & TIME (Protected) --- */}
        <div className="grid grid-cols-2 gap-4 mb-6">
           <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <label className="text-[10px] font-black text-gray-400 uppercase">Date</label>
              <input type="date" min={today} className="w-full bg-transparent font-bold text-sm outline-none mt-1" onChange={(e) => setDate(e.target.value)} />
           </div>
           <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <label className="text-[10px] font-black text-gray-400 uppercase">Time</label>
              <select className="w-full bg-transparent font-bold text-sm outline-none mt-1" onChange={(e) => setTime(e.target.value)}>
                 <option value="">Select</option>
                 {timeOptions.map(t => (
                   <option key={t} value={t} disabled={!isTimeValid(t)} className={!isTimeValid(t) ? "text-gray-300" : ""}>{t}</option>
                 ))}
              </select>
           </div>
        </div>

        {/* --- MEMBERSHIP CONFIG --- */}
        {plan !== 'single' && (
           <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-bold text-gray-400 uppercase">Select Days</label>
                 <button onClick={selectAvailableWeek} className="text-xs font-bold text-blue-500">Select All</button>
              </div>
              <div className="flex justify-between gap-1">
                 {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                    <button key={d} onClick={() => rules.availableDays.includes(d) && toggleDay(d)} disabled={!rules.availableDays.includes(d)} 
                    className={`w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center ${selectedDays.includes(d) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{d[0]}</button>
                 ))}
              </div>
              <select className="w-full mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl font-bold text-sm text-blue-800 outline-none" value={plan} onChange={(e) => setPlan(e.target.value)}>
                  <option value="monthly">Monthly Plan</option>
                  <option value="6months">6 Months (10% Off)</option>
                  <option value="yearly">1 Year (20% Off)</option>
              </select>
           </div>
        )}

        {/* --- 🧾 THE RECEIPT CARD --- */}
        <div className="bg-white border-2 border-dashed border-gray-200 p-5 rounded-2xl mb-6 relative">
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1">
              <FileText size={10} /> Bill Summary
           </div>
           
           <div className="space-y-2 text-sm mt-2">
              <div className="flex justify-between text-gray-600">
                 <span>Plan Type</span>
                 <span className="font-bold text-gray-900">{bill.label}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                 <span>Total Lectures</span>
                 <span className="font-bold text-gray-900">{bill.lectureCount} Sessions</span>
              </div>
              <div className="border-t border-dashed border-gray-200 my-2"></div>
              <div className="flex justify-between text-gray-600">
                 <span>Subtotal</span>
                 <span>₹{bill.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                 <span>GST (18%)</span>
                 <span>₹{bill.gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900 pt-2 border-t border-gray-900 mt-2">
                 <span>Total Pay</span>
                 <span>₹{bill.total.toFixed(2)}</span>
              </div>
           </div>
        </div>

        {/* --- CANCELLATION POLICY --- */}
        <div className="bg-red-50 p-3 rounded-xl flex gap-3 items-start mb-6">
           <AlertTriangle size={16} className="text-red-500 mt-0.5" />
           <div>
              <p className="text-xs font-bold text-red-700">Cancellation Policy</p>
              <p className="text-[10px] text-red-600">100% refund if cancelled 24hrs prior. No refund for last-minute cancellations.</p>
           </div>
        </div>

        {/* --- PAYMENT METHOD --- */}
        <div className="grid grid-cols-2 gap-3 mb-6">
           <button onClick={() => setPaymentMethod('cash')} className={`p-3 rounded-xl border-2 font-bold text-xs flex flex-col items-center gap-1 ${paymentMethod === 'cash' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 text-gray-400'}`}>💵 Cash Payment</button>
           <button onClick={() => setPaymentMethod('online')} className={`p-3 rounded-xl border-2 font-bold text-xs flex flex-col items-center gap-1 ${paymentMethod === 'online' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 text-gray-400'}`}>💳 Online (UPI/Card)</button>
        </div>

        {/* ONLINE QR DISPLAY */}
        {paymentMethod === 'online' && (
           <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center mb-6 animate-[fade-in_0.3s]">
              <p className="text-xs text-gray-500 mb-2">Scan to pay <span className="font-bold text-black">₹{bill.total.toFixed(0)}</span></p>
              <img src={qrCodeUrl} className="w-32 h-32 mx-auto rounded-lg border" alt="QR" />
           </div>
        )}

        {/* --- CONFIRM BUTTON --- */}
        <button onClick={handleBooking} disabled={loading} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition flex justify-center items-center gap-2">
           {loading ? <Loader className="animate-spin" /> : `Confirm & Pay ₹${bill.total.toFixed(0)}`}
        </button>

      </div>
    </div>,
    document.body
  );
};

export default BookingModal;