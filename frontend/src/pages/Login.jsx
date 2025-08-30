import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import img2 from '../assets/background.jpg'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Login successful!');
        
        // Navigate based on role
        switch (result.role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'customer':
            navigate('/customer-dashboard');
            break;
          case 'recycleCentre':
            navigate('/recycle-centre-dashboard');
            break;
          default:
            navigate(from, { replace: true });
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-start py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${img2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10 ml-8 sm:ml-12 lg:ml-16">
        <div className="text-left">
          <h1 
            className="text-5xl font-bold mb-4 text-shadow-lg" 
            style={{ 
              color: '#184325',
              textShadow: '2px 2px 4px rgba(255, 255, 255, 0.9), 0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          >
            Greeen Loop
          </h1>
          <h2 
            className="text-3xl font-bold text-white mb-3 text-shadow-md" 
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}
          >
            Welcome back
          </h2>
          <p 
            className="text-lg text-white font-medium"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
            }}
          >
            Please sign in to your account
          </p>
        </div>

        <div className="card p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-start">
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium hover:opacity-80"
                  style={{ color: '#184325' }}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ 
                backgroundColor: '#184325',
                borderColor: '#184325'
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-start text-sm">
                <span className="pr-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                to="/register"
                className="w-full btn-secondary flex justify-center"
                style={{
                  color: '#184325',
                  borderColor: '#184325'
                }}
              >
                Register as Customer
              </Link>
              <Link
                to="/register-recycle-centre"
                className="w-full btn-secondary flex justify-center"
                style={{
                  color: '#184325',
                  borderColor: '#184325',
                  
                }}
              >
                Register as Recycle Centre
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;