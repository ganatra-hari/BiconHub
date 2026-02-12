import React from 'react';
import { Search, UserCheck, Home, CreditCard, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Choose Subject',
    desc: 'Browse through 50+ subjects and activities to find what you want to learn',
    icon: <Search size={32} />,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-500'
  },
  {
    id: 2,
    title: 'Select Trainer',
    desc: 'Pick from verified trainers and book a convenient time slot that works for you',
    icon: <UserCheck size={32} />,
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-500'
  },
  {
    id: 3,
    title: 'Trainer Visits Home',
    desc: 'Your expert trainer arrives at your doorstep ready to teach',
    icon: <Home size={32} />,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-500'
  },
  {
    id: 4,
    title: 'Pay Hourly Fee',
    desc: 'Pay affordable hourly rates in INR after each session',
    icon: <CreditCard size={32} />,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-500'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How <span className="text-yellow-500">BiconHub</span> Works
          </h2>
          <p className="text-gray-500 text-lg">Get started in just 4 simple steps</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center">
              
              {/* Card */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow relative z-10 w-full h-full flex flex-col items-center text-center border border-gray-100">
                
                {/* Floating Number Badge */}
                <div className={`absolute -top-6 -left-4 w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center text-xl font-bold shadow-md`}>
                  {step.id}
                </div>

                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl ${step.lightColor} ${step.textColor} flex items-center justify-center mb-6`}>
                  {step.icon}
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Connecting Arrow (Only show between items, hide on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-0 text-gray-300">
                  <ArrowRight size={32} />
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;