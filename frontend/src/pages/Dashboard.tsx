import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard.tsx';
import { getCurrentUser, isAuthenticated } from '../services/auth.ts';
import { fetchConfidenceDashboards, fetchLearningProgress, fetchPortfolioProjects } from '../services/api.ts';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    confidenceScore: 0,
    coursesCompleted: 0,
    projectsSubmitted: 0,
    learningStreak: 0,
    mentorshipHours: 0,
    skillsGained: 0
  });
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    if (isAuthenticated() && user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      // Simulate API calls - replace with actual data fetching
      const [confidenceData, learningData, projectsData] = await Promise.all([
        fetchConfidenceDashboards().catch(() => []),
        fetchLearningProgress().catch(() => []),
        fetchPortfolioProjects().catch(() => [])
      ]);

      setDashboardData({
        confidenceScore: 85,
        coursesCompleted: learningData.length || 3,
        projectsSubmitted: projectsData.length || 2,
        learningStreak: 12,
        mentorshipHours: 24,
        skillsGained: 8
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { title: 'Start Learning', icon: '🚀', action: '/courses', color: 'from-blue-500 to-purple-600' },
    { title: 'Find Mentor', icon: '👩‍🏫', action: '/mentorship', color: 'from-green-500 to-teal-600' },
    { title: 'Submit Project', icon: '💼', action: '/projects', color: 'from-orange-500 to-red-600' },
    { title: 'Take Assessment', icon: '📝', action: '/assessment', color: 'from-pink-500 to-purple-600' }
  ];

  const recentActivities = [
    { icon: '✅', text: 'Completed React Fundamentals', time: '2 hours ago', type: 'success' },
    { icon: '📚', text: 'Started JavaScript Advanced', time: '1 day ago', type: 'info' },
    { icon: '👥', text: 'Mentorship session with Sarah', time: '2 days ago', type: 'mentor' },
    { icon: '🎯', text: 'Confidence score improved by 5%', time: '3 days ago', type: 'achievement' }
  ];

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="text-6xl mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to view your dashboard</p>
          <a href="/login" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {user?.name}! 
              </h1>
              <p className="text-gray-600">Ready to continue your learning journey?</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.action}
                className={`p-4 rounded-xl bg-gradient-to-r ${action.color} text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl`}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="font-semibold text-sm">{action.title}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Confidence Score"
              value={`${dashboardData.confidenceScore}%`}
              icon="📈"
              trend="+5%"
              trendDirection="up"
              color="from-purple-500 to-pink-500"
            />
            <DashboardCard
              title="Courses Completed"
              value={dashboardData.coursesCompleted}
              icon="🎓"
              trend="+2 this month"
              trendDirection="up"
              color="from-blue-500 to-purple-500"
            />
            <DashboardCard
              title="Projects Submitted"
              value={dashboardData.projectsSubmitted}
              icon="💼"
              trend="+1 this week"
              trendDirection="up"
              color="from-green-500 to-teal-500"
            />
            <DashboardCard
              title="Learning Streak"
              value={`${dashboardData.learningStreak} days`}
              icon="🔥"
              trend="Keep it up!"
              trendDirection="neutral"
              color="from-orange-500 to-red-500"
            />
            <DashboardCard
              title="Mentorship Hours"
              value={`${dashboardData.mentorshipHours}h`}
              icon="⏰"
              trend="+4h this week"
              trendDirection="up"
              color="from-pink-500 to-purple-500"
            />
            <DashboardCard
              title="Skills Gained"
              value={dashboardData.skillsGained}
              icon="⭐"
              trend="+2 this month"
              trendDirection="up"
              color="from-indigo-500 to-blue-500"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{activity.text}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'info' ? 'bg-blue-400' :
                    activity.type === 'mentor' ? 'bg-purple-400' :
                    'bg-yellow-400'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Learning Goals</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-800 mb-2">Complete JavaScript Course</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">75% complete</p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-800 mb-2">Build 3 Portfolio Projects</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '66%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">2 of 3 completed</p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-800 mb-2">Find a Mentor</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">✅ Completed!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;