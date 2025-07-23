import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isAuthenticated, logout, getCurrentUser } from '../services/auth.ts';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const user = getCurrentUser();
  const authenticated = isAuthenticated();

  const navItems = [
    { path: '/', label: 'Home', icon: '' },
    { path: '/courses', label: 'Courses', icon: '' },
    { path: '/mentorship', label: 'Mentorship', icon: '' },
    { path: '/dashboard', label: 'Dashboard', icon: '' },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-purple-200 transition-colors">
            <span className="text-2xl">🎓</span>
            <span>Scholar-Dorm</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-white/20 text-white shadow-md'
                    : 'hover:bg-white/10 hover:text-purple-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {authenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white hover:text-purple-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  isActivePath(item.path)
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            
            {authenticated ? (
              <div className="border-t border-white/20 pt-4 mt-4">
                <div className="flex items-center space-x-2 px-4 py-2 text-sm">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                  </div>
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 bg-white text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;