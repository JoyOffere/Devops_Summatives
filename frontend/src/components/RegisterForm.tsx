import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth.ts';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await register(name, email, password);
      console.log('Registration successful:', response);
      // Navigate to dashboard using React Router
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { score: 0, text: '', color: '' };
    if (password.length < 6) return { score: 1, text: 'Weak', color: 'text-red-500' };
    if (password.length < 10) return { score: 2, text: 'Medium', color: 'text-yellow-500' };
    return { score: 3, text: 'Strong', color: 'text-green-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <div className="flex items-center space-x-2">
              <span></span>
              <span>{error}</span>
            </div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">👤</span>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">📧</span>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔒</span>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Create a password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? '' : '👁️'}
            </button>
          </div>
          {password && (
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    passwordStrength.score === 1 ? 'bg-red-500 w-1/3' :
                    passwordStrength.score === 2 ? 'bg-yellow-500 w-2/3' :
                    passwordStrength.score === 3 ? 'bg-green-500 w-full' : 'w-0'
                  }`}
                ></div>
              </div>
              <span className={`text-xs font-medium ${passwordStrength.color}`}>
                {passwordStrength.text}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔒</span>
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                confirmPassword && password !== confirmPassword 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? '' : '👁️'}
            </button>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
          )}
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            required
            className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <label className="ml-2 text-sm text-gray-600">
            I agree to the{' '}
            <button 
              type="button"
              onClick={() => {/* TODO: Implement terms modal */}}
              className="text-purple-600 hover:text-purple-700 font-medium bg-transparent border-none cursor-pointer p-0 underline"
            >
              Terms of Service
            </button>
            {' '}and{' '}
            <button 
              type="button"
              onClick={() => {/* TODO: Implement privacy modal */}}
              className="text-purple-600 hover:text-purple-700 font-medium bg-transparent border-none cursor-pointer p-0 underline"
            >
              Privacy Policy
            </button>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={loading || password !== confirmPassword}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating account...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="mr-2">📱</span>
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="mr-2">💼</span>
            <span className="text-sm font-medium text-gray-700">LinkedIn</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;