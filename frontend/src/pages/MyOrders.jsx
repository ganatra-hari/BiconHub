import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpen, Calendar, Clock, User, Trash2 } from 'lucide-react'; // Added Trash2 icon

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const activeUserId = userInfo?._id || userInfo?.id;

    // 1. Fetch Orders
    const fetchOrders = async () => {
        try {
            if (!activeUserId) return;
            const { data } = await axios.get(`https://biconhub.onrender.com/api/bookings/user/${activeUserId}`);
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [activeUserId]);

    // 2. Handle Cancel Booking
    const handleCancel = async (bookingId) => {
        if (window.confirm("Are you sure you want to cancel this class?")) {
            try {
                await axios.delete(`https://biconhub.onrender.com/api/bookings/${bookingId}`);
                // Remove from screen immediately without refreshing
                setOrders(orders.filter((order) => order._id !== bookingId));
                alert("Booking Cancelled");
            } catch (error) {
                alert("Failed to cancel");
            }
        }
    };

    if (loading) return <div className="p-10 text-center">Loading your bookings...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">My Bookings</h2>
                    <p className="text-gray-500 font-medium">Logged in as: {userInfo?.email}</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-16 text-center">
                    <BookOpen className="text-gray-300 mx-auto mb-4" size={40} />
                    <p className="text-gray-500 font-black text-xl">No sessions booked yet!</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                            
                            {/* Tutor & Subject */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <User size={32} />
                                </div>
                                <div>
                                    <h3 className="font-black text-2xl text-gray-900">{order.tutorName}</h3>
                                    <p className="text-sm font-bold text-blue-500 uppercase tracking-widest">{order.subject}</p>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-gray-500 mb-6">
                                <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2">
                                    <Calendar size={14} /> {order.date}
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2">
                                    <Clock size={14} /> {order.time}
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2 uppercase">
                                    {order.paymentMethod}
                                </div>
                                <div className={`p-3 rounded-xl flex items-center gap-2 uppercase ${order.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                    ● {order.status}
                                </div>
                            </div>

                            {/* Price & Cancel Button */}
                            <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                <p className="text-3xl font-black text-gray-900">₹{order.totalPrice}</p>
                                
                                <button 
                                    onClick={() => handleCancel(order._id)}
                                    className="flex items-center gap-2 text-red-400 hover:text-red-600 font-bold text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors"
                                >
                                    <Trash2 size={16} /> Cancel
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;