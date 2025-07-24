import React, { useState } from 'react';
import MentorshipRequest from '../components/MentorshipRequest.tsx';

const Mentorship = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mentors = [
    {
      id: 1,
      name: 'Sarah Babalola',
      role: 'Senior Software Engineer',
      company: 'Google',
      expertise: ['React', 'Node.js', 'System Design', 'Career Growth'],
      experience: '8 years',
      rating: 4.9,
      sessions: 120,
      image: '👩‍💻',
      bio: 'Passionate about helping women break into tech and advance their careers in software engineering.',
      availability: 'Available',
      price: 'Free'
    },
    {
      id: 2,
      name: 'Grace Adewusi',
      role: 'Data Science Manager',
      company: 'Microsoft',
      expertise: ['Python', 'Machine Learning', 'Data Analysis', 'Leadership'],
      experience: '10 years',
      rating: 4.8,
      sessions: 95,
      image: '👩‍🔬',
      bio: 'Former researcher turned industry leader, specializing in ML applications and team management.',
      availability: 'Available',
      price: '$50/hour'
    },
    {
      id: 3,
      name: 'Ayotunde Adebayo',
      role: 'UX Design Director',
      company: 'Apple',
      expertise: ['UI/UX Design', 'Product Strategy', 'User Research', 'Design Systems'],
      experience: '12 years',
      rating: 4.9,
      sessions: 180,
      image: '👩‍🎨',
      bio: 'Award-winning designer passionate about creating inclusive and accessible digital experiences.',
      availability: 'Busy',
      price: '$75/hour'
    },
    {
      id: 4,
      name: 'Dr. Ndineleo',
      role: 'AI Research Scientist',
      company: 'OpenAI',
      expertise: ['Artificial Intelligence', 'Deep Learning', 'Research', 'Publications'],
      experience: '15 years',
      rating: 5.0,
      sessions: 67,
      image: '👩‍🔬',
      bio: 'Leading researcher in AI ethics and natural language processing with 50+ publications.',
      availability: 'Available',
      price: '$100/hour'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Mentors', icon: '👥' },
    { id: 'engineering', name: 'Engineering', icon: '⚙️' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'data', name: 'Data Science', icon: '📊' },
    { id: 'ai', name: 'AI/ML', icon: '🤖' },
    { id: 'leadership', name: 'Leadership', icon: '👑' }
  ];

  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 ? '' : '');
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Mentor 
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with experienced professionals who can guide your tech career journey
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600">Expert Mentors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
            <div className="text-gray-600">Mentorship Hours</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.8⭐</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Mentor Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white text-center">
                <div className="text-4xl mb-3">{mentor.image}</div>
                <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
                <p className="text-purple-100">{mentor.role}</p>
                <p className="text-purple-200 text-sm">{mentor.company}</p>
              </div>

              <div className="p-6">
                {/* Rating and Stats */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-1">
                    <span>{renderStars(mentor.rating)}</span>
                    <span className="text-sm text-gray-600">({mentor.rating})</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-purple-600">{mentor.sessions} sessions</div>
                    <div className="text-xs text-gray-500">{mentor.experience} experience</div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {mentor.bio}
                </p>

                {/* Expertise Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        +{mentor.expertise.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Availability and Price */}
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(mentor.availability)}`}>
                    {mentor.availability}
                  </span>
                  <span className="font-semibold text-purple-600">{mentor.price}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
                    Book Session 
                  </button>
                  <button className="w-full border border-purple-200 text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors text-sm">
                    View Profile 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mentorship Request Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Request a Mentor 
            </h2>
            <MentorshipRequest />
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-8 text-center">How Mentorship Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4"></div>
              <h4 className="font-semibold mb-2">1. Find Your Mentor</h4>
              <p className="text-purple-100 text-sm">
                Browse our curated list of experienced professionals and find the perfect match for your goals.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4"></div>
              <h4 className="font-semibold mb-2">2. Schedule Sessions</h4>
              <p className="text-purple-100 text-sm">
                Book one-on-one sessions at your convenience and get personalized guidance.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4"></div>
              <h4 className="font-semibold mb-2">3. Accelerate Growth</h4>
              <p className="text-purple-100 text-sm">
                Apply insights, build your network, and advance your career with expert guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;