import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Menu, X, Settings } from 'lucide-react';
import img4 from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleDashboard = (role) => {
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'customer':
        return '/customer-dashboard';
      // case 'inventory_manager':
      //   return '/inventory-dashboard';
      // case 'customer_supporter':
      //   return '/support-dashboard';
      // case 'deliver':
      //   return '/deliver-dashboard';
      default:
        return '/dashboard';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'customer':
        return 'Customer';
      // case 'inventory_manager':
      //   return 'Inventory Manager';
      // case 'customer_supporter':
      //   return 'Support Agent';
      // case 'deliver':
      //   return 'Delivery Agent';
      default:
        return 'User';
    }
  };

  const handleAboutUsClick = (e) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    
    if (currentPath !== '/') {
      // Navigate to home page first
      navigate('/');
      // Use a longer timeout and retry mechanism
      const scrollToSection = () => {
        const element = document.getElementById('why-choose-green-loop');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Retry after another 100ms if element not found
          setTimeout(scrollToSection, 100);
        }
      };
      setTimeout(scrollToSection, 300);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById('why-choose-green-loop');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.log('Element with id "why-choose-green-loop" not found');
      }
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
  <img src={img4} alt="Green Loop Logo" className="h-20 w-auto" />
</Link>

          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            
            {/* Only show About Us on home page */}
            {isHomePage && (
              <a
                href="#How-It-Works"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={handleAboutUsClick}
              >
                About Us
              </a>
            )}
            
            {user && (
              <>
                <Link
                  to="/recycle-store"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Recycle Store
                </Link>

                <Link
                  to="/recycle-form"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Recycle Form
                </Link>

                <Link
                  to={getRoleDashboard(user.role)}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </>
            )}

            {user ? (
              /* Profile Dropdown for logged-in users */
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 focus:outline-none"
                >
                  {user.profilePic ? (
                    <img
                      src={`http://localhost:5000${user.profilePic}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                  )}
                  <span className="text-sm font-medium">{user.firstName}</span>
                  <span className="text-xs text-gray-500">({getRoleLabel(user.role)})</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login/Register buttons for non-logged-in users */
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Only show About Us on home page in mobile menu too */}
              {isHomePage && (
                <a
                  href="#why-choose-green-loop"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    handleAboutUsClick(e);
                  }}
                >
                  About Us
                </a>
              )}
              
              {user && (
                <>
                  <Link
                    to="/recycle-store"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Recycle Store
                  </Link>

                  <Link
                    to="/recycle-form"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Recycle Form
                  </Link>

                  <Link
                    to={getRoleDashboard(user.role)}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {user ? (
                /* User profile section for mobile */
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center px-3">
                    {user.profilePic ? (
                      <img
                        src={`http://localhost:5000${user.profilePic}`}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{user.firstName} {user.lastName}</div>
                      <div className="text-sm text-gray-500">{getRoleLabel(user.role)}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                /* Login/Register section for mobile */
                <div className="border-t border-gray-200 pt-4 space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-base font-medium bg-green-600 text-white hover:bg-green-700 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;