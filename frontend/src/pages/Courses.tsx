import React, { useState } from 'react';
import CourseCard from '../components/CourseCard.tsx';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'frontend', name: 'Frontend', icon: '🎨' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'data', name: 'Data Science', icon: '📊' },
    { id: 'mobile', name: 'Mobile Dev', icon: '📱' },
    { id: 'ai', name: 'AI/ML', icon: '🤖' }
  ];

  const courses = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Master the fundamentals of React including components, hooks, and state management.',
      category: 'frontend',
      level: 'Beginner',
      duration: '6 weeks',
      lessons: 24,
      students: 1200,
      rating: 4.9,
      instructor: 'Amy',
      image: '⚛️',
      price: 'Free',
      skills: ['React', 'JSX', 'Hooks', 'State Management']
    },
    {
      id: 2,
      title: 'JavaScript Advanced',
      description: 'Deep dive into advanced JavaScript concepts, async programming, and modern ES6+ features.',
      category: 'frontend',
      level: 'Advanced',
      duration: '8 weeks',
      lessons: 32,
      students: 890,
      rating: 4.8,
      instructor: 'Maryam',
      image: '🟨',
      price: '$49',
      skills: ['JavaScript', 'ES6+', 'Async/Await', 'Promises']
    },
    {
      id: 3,
      title: 'Node.js & Express',
      description: 'Build powerful backend applications with Node.js, Express, and database integration.',
      category: 'backend',
      level: 'Intermediate',
      duration: '10 weeks',
      lessons: 40,
      students: 756,
      rating: 4.7,
      instructor: 'Emma Odey',
      image: '🟢',
      price: '$79',
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs']
    },
    {
      id: 4,
      title: 'Python Data Science',
      description: 'Learn data analysis, visualization, and machine learning with Python and popular libraries.',
      category: 'data',
      level: 'Beginner',
      duration: '12 weeks',
      lessons: 48,
      students: 2100,
      rating: 4.9,
      instructor: 'Pelin',
      image: '🐍',
      price: '$99',
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib']
    },
    {
      id: 5,
      title: 'React Native Mobile',
      description: 'Create cross-platform mobile apps using React Native and native device features.',
      category: 'mobile',
      level: 'Intermediate',
      duration: '8 weeks',
      lessons: 36,
      students: 420,
      rating: 4.6,
      instructor: 'Joy Offere',
      image: '📱',
      price: '$89',
      skills: ['React Native', 'Mobile UI', 'Navigation', 'APIs']
    },
    {
      id: 6,
      title: 'Machine Learning Basics',
      description: 'Introduction to machine learning algorithms, model training, and practical applications.',
      category: 'ai',
      level: 'Beginner',
      duration: '14 weeks',
      lessons: 56,
      students: 1580,
      rating: 4.8,
      instructor: 'Marvin',
      image: '🤖',
      price: '$129',
      skills: ['ML Algorithms', 'Scikit-learn', 'TensorFlow', 'Model Evaluation']
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Our Courses 
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover expert-led courses designed to accelerate your tech career
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-lg">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search courses, skills, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
            />
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

        {/* Results Info */}
        <div className="mb-8">
          <p className="text-gray-600 text-center">
            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                level={course.level}
                duration={course.duration}
                lessons={course.lessons}
                students={course.students}
                rating={course.rating}
                instructor={course.instructor}
                image={course.image}
                price={course.price}
                skills={course.skills}
                levelColor={getLevelColor(course.level)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4"></div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or category filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
          <p className="text-purple-100 mb-6">
            Suggest a new course or get personalized recommendations from our mentors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Suggest a Course 
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Get Recommendations 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;