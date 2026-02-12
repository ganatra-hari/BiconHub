import React from 'react';
import { ShieldCheck, MapPin, Clock, IndianRupee, Layers, CheckCircle } from 'lucide-react';

const features = [
  {
    title: 'Verified Trainers',
    desc: 'All trainers are background-verified with proven expertise and certifications.',
    icon: <ShieldCheck size={32} />,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Doorstep Learning',
    desc: 'Learn in the comfort of your home with personalized attention.',
    icon: <MapPin size={32} />,
    bg: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    title: 'Flexible Schedule',
    desc: 'Book sessions at your convenience - mornings, evenings, or weekends.',
    icon: <Clock size={32} />,
    bg: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  },
  {
    title: 'Affordable Pricing',
    desc: 'Pay per hour with transparent pricing and no hidden charges.',
    icon: <IndianRupee size={32} />,
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600'
  },
  {
    title: 'Multi-Skill Platform',
    desc: 'Access 50+ subjects and activities all in one convenient platform.',
    icon: <Layers size={32} />,
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Satisfaction Guaranteed',
    desc: 'Rate your experience after every session to ensure high quality.',
    icon: <CheckCircle size={32} />,
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-600">BiconHub?</span>
          </h2>
          <p className="text-gray-500 text-lg">We make learning accessible, safe, and enjoyable.</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 bg-white"
            >
              <div className={`w-16 h-16 rounded-xl ${feature.bg} ${feature.iconColor} flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;