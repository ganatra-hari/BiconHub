import React from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { dummyTutors } from '../data'; // Import data
import TutorCard from '../components/TutorCard';

const ServiceDetails = () => {
    <h1 className="text-center mt-10">Service Details</h1>;
  const { id } = useParams(); // This is the Category Name (e.g., "Academic Subjects")
  const navigate = useNavigate();

  // Filter tutors based on the category URL
  // (In a real app, we would fetch this from the database)
  const filteredTutors = dummyTutors; 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm py-6 px-8 sticky top-0 z-30">
        <div className="container mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{id} Tutors</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters (Visual Only for now) */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
            <div className="flex items-center gap-2 mb-6 text-gray-800 font-bold text-lg">
              <Filter size={20} /> Filters
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>₹200</span>
                <span>₹2000</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded text-blue-500" /> 5+ Years
                </label>
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded text-blue-500" /> Top Rated
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Tutors List */}
        <div className="w-full lg:w-3/4 space-y-6">
          {filteredTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
          
          {filteredTutors.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No tutors found in this category yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ServiceDetails;