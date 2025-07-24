import React from 'react';
import LoginForm from '../components/LoginForm.tsx';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🎓</div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">Sign in to continue your learning journey</p>
        </div>
        <LoginForm />
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-purple-600 font-semibold hover:text-purple-700">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;