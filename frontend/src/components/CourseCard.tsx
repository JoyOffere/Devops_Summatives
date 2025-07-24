import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  level?: string;
  duration?: string;
  lessons?: number;
  students?: number;
  rating?: number;
  instructor?: string;
  image?: string;
  price?: string;
  skills?: string[];
  levelColor?: string;
}

const CourseCard = ({ 
  title, 
  description, 
  level = 'Beginner',
  duration = '4 weeks',
  lessons = 12,
  students = 0,
  rating = 4.5,
  instructor = 'Instructor',
  image = '📚',
  price = 'Free',
  skills = [],
  levelColor = 'bg-green-100 text-green-800'
}: CourseCardProps) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars: string[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    return stars.join('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Course Image/Icon */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-center">
        <div className="text-4xl mb-2">{image}</div>
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${levelColor}`}>
          {level}
        </div>
      </div>

      <div className="p-6">
        {/* Price Badge */}
        <div className="flex justify-between items-start mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            price === 'Free' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-purple-100 text-purple-800'
          }`}>
            {price}
          </span>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>{renderStars(rating)}</span>
            <span>({rating})</span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Course Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-600">{lessons}</div>
            <div className="text-xs text-gray-500">Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-600">{duration}</div>
            <div className="text-xs text-gray-500">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-600">
              {students > 999 ? `${(students/1000).toFixed(1)}k` : students}
            </div>
            <div className="text-xs text-gray-500">Students</div>
          </div>
        </div>

        {/* Skills Tags */}
        {skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                  +{skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Instructor */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {instructor.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">{instructor}</div>
              <div className="text-xs text-gray-500">Instructor</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
            Enroll Now 🚀
          </button>
          <button className="w-full border border-purple-200 text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors text-sm">
            View Details 👁️
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;