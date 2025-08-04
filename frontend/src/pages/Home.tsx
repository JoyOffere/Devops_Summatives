import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const Home = () => {
  const features = [
    {
      icon: '🎓',
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with hands-on projects and real-world applications.'
    },
    {
      icon: '👩‍🏫',
      title: 'Personal Mentorship',
      description: 'Get paired with experienced mentors who guide your learning journey.'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your confidence levels and skill development with detailed analytics.'
    },
    {
      icon: '🌟',
      title: 'Community Support',
      description: 'Join a supportive community of women in tech, sharing experiences and knowledge.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Students Empowered' },
    { number: '50+', label: 'Expert Mentors' },
    { number: '25+', label: 'Courses Available' },
    { number: '95%', label: 'Success Rate' }
  ];

  const testimonials = [
    {
      name: 'Ines Igabire',
      role: 'Software Developer at ALU',
      image: '👩‍💻',
      quote: 'Scholar-Dorm gave me the confidence and skills I needed to land my dream job in tech!'
    },
    {
      name: 'Goodness Edim',
      role: 'Project Manager at Shenovate',
      image: '👩‍🔬',
      quote: 'The mentorship program was incredible. Having a mentor made all the difference in my journey.'
    },
    {
      name: 'Sharon Ujah',
      role: 'UX Designer at 525system',
      image: '👩‍🎨',
      quote: 'The supportive community and practical projects helped me build a portfolio that stood out.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-6xl block mb-4"></span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Empowering Women in
                <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent"> Tech</span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
                Join Scholar-Dorm and unlock your potential with expert mentorship, 
                comprehensive courses, and a supportive community.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {isAuthenticated() ? (
                <Link
                  to="/dashboard"
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Go to Dashboard 📊
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Start Your Journey 🎯
                  </Link>
                  <Link
                    to="/courses"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Explore Courses 📚
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">{stat.number}</div>
                  <div className="text-purple-200 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Scholar-Dorm?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed in your tech career journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from our amazing community members</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{testimonial.image}</div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-purple-600 text-sm">{testimonial.role}</p>
                </div>
                <blockquote className="text-gray-600 italic text-center">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of women who have already started their journey in tech with Scholar-Dorm
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated() && (
              <>
                <Link
                  to="/register"
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Get Started Free 🚀
                </Link>
                <Link
                  to="/mentorship"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200 transform hover:scale-105"
                >
                  Find a Mentor 👩‍🏫
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;