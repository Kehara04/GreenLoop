//RecycleForm.jsx

import React, { useState, useEffect } from 'react';
import { Recycle, MapPin, Plus, Minus, FileText, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img6 from '../../../assets/background1.png';

const RecycleSystem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine current page based on URL
  const [currentPage, setCurrentPage] = useState(() => {
    return location.pathname.includes('/summary') ? 'summary' : 'form';
  });
  
  const [formData, setFormData] = useState({
    categories: {
      metal: 0,
      plastic: 0,
      polythene: 0,
      eWaste: 0,
      clothes: 0,
      paper: 0,
      regiform: 0
    },
    location: {
      district: '',
      city: ''
    },
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  // Load data from location state if navigating to summary
  useEffect(() => {
    if (currentPage === 'summary' && location.state?.formData) {
      setSubmittedData(location.state.formData);
    }
  }, [currentPage, location.state]);

  // Update currentPage when URL changes
  useEffect(() => {
    const newPage = location.pathname.includes('/summary') ? 'summary' : 'form';
    setCurrentPage(newPage);
  }, [location.pathname]);

  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
    'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
    'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
    'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
    'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ];

  const categoryDetails = {
    metal: { label: 'Metal', icon: '🔧', color: 'bg-gray-100', description: 'Cans, metal scraps' },
    plastic: { label: 'Plastic', icon: '🥤', color: 'bg-blue-100', description: 'Bottles, containers' },
    polythene: { label: 'Polythene', icon: '🛍️', color: 'bg-purple-100', description: 'Shopping bags, covers' },
    eWaste: { label: 'E-Waste', icon: '📱', color: 'bg-red-100', description: 'Electronics, gadgets' },
    clothes: { label: 'Clothes', icon: '👕', color: 'bg-pink-100', description: 'Old garments, fabric' },
    paper: { label: 'Paper', icon: '📄', color: 'bg-yellow-100', description: 'Newspapers, documents' },
    regiform: { label: 'Regiform', icon: '🧊', color: 'bg-cyan-100', description: 'Foam materials' }
  };

  const updateQuantity = (category, change) => {
    setFormData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: Math.max(0, prev.categories[category] + change)
      }
    }));
  };

  const handleLocationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  const getTotalQuantity = () => {
    return Object.values(formData.categories).reduce((sum, qty) => sum + qty, 0);
  };

  const getPointsEarned = () => {
    return getTotalQuantity(); // 1 point per unit as per backend logic
  };

  const handleSubmit = async () => {
    if (!formData.location.district || !formData.location.city) {
      setError('Please select district and city');
      return;
    }
    
    if (getTotalQuantity() === 0) {
      setError('Please enter quantity for at least one category');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch("http://localhost:5000/api/recycle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        // ignore if no JSON
      }

      if (response.ok && result.success) {
        setSubmittedData(result.data);
        setCurrentPage('summary');
        navigate('/recycle-form/summary', { 
          state: { formData: result.data },
          replace: true 
        });
      } else {
        setError(result.message || 'Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      categories: {
        metal: 0,
        plastic: 0,
        polythene: 0,
        eWaste: 0,
        clothes: 0,
        paper: 0,
        regiform: 0
      },
      location: {
        district: '',
        city: ''
      },
      notes: ''
    });
    setSubmittedData(null);
    setCurrentPage('form');
    setError('');
    navigate('/recycle-form');
  };

  // Recycle Form Component with Background
  const RecycleForm = () => (
    <div 
      className="min-h-screen p-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${img6})`,
      }}
    >
      {/* Background Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
              <Recycle className="w-8 h-8" style={{ color: '#5AD670' }} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Recycle Form</h1>
            <p className="text-gray-100 drop-shadow">Help us track your recycling efforts and earn points!</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium">⚠️ {error}</p>
            </div>
          )}

          <div className="space-y-8">
            {/* Categories Grid */}
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2" style={{ color: '#5AD670' }} />
                Recycling Categories
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {Object.entries(categoryDetails).map(([key, details]) => (
                  <div key={key} className={`${details.color} rounded-lg p-3 border-2 border-transparent hover:border-green-300 transition-all duration-200`}>
                    <div className="text-center mb-2">
                      <div className="text-lg mb-1">{details.icon}</div>
                      <h3 className="font-medium text-gray-800 text-sm">{details.label}</h3>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-2">
                      <input
                        type="number"
                        value={formData.categories[key] || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          categories: {
                            ...prev.categories,
                            [key]: Math.max(0, parseFloat(e.target.value) || 0)
                          }
                        }))}
                        placeholder="0"
                        className="w-16 h-8 text-center text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-transparent"
                        step="0.1"
                        min="0"
                      />
                      <div className="text-xs text-gray-500">kg</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2" style={{ color: '#5AD670' }} />
                Location Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                  <select
                    value={formData.location.district}
                    onChange={(e) => handleLocationChange('district', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) => handleLocationChange('city', e.target.value)}
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Notes</h2>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional information about your recyclable items..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows="4"
                maxLength="500"
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.notes.length}/500 characters
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={loading || getTotalQuantity() === 0}
                  className="px-8 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                  style={{ backgroundColor: '#5AD670' }}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Form
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
                
                {/* Connection Status Indicator */}
                <p className="text-xs text-gray-500 mt-2">
                  {loading ? 'Connecting to server...' : 'Ready to submit'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Summary Page Component with Background
  const SummaryPage = () => (
    <div 
      className="min-h-screen p-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${img6})`,
      }}
    >
      {/* Background Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
              <CheckCircle className="w-10 h-10" style={{ color: '#5AD670' }} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Form Submitted Successfully!</h1>
            <p className="text-gray-100 drop-shadow">Thank you for contributing to a sustainable future</p>
          </div>

          {/* Form Details */}
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Submission Details</h2>
              <div className="text-right">
                <p className="text-sm text-gray-600">Form ID</p>
                <p className="font-semibold">#{submittedData?.form_id}</p>
              </div>
            </div>
            
            {/* Categories Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
              {Object.entries(submittedData?.categories || {}).map(([key, quantity]) => {
                if (quantity === 0) return null;
                const details = categoryDetails[key];
                return (
                  <div key={key} className={`${details.color} rounded-lg p-3`}>
                    <div className="text-center">
                      <div className="text-lg mb-1">{details.icon}</div>
                      <h3 className="font-medium text-gray-800 text-sm">{details.label}</h3>
                      <p className="text-sm font-bold">{quantity} kg</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Location & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </h3>
                <p className="text-gray-600">{submittedData?.location.city}, {submittedData?.location.district}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-1" style={{ color: '#5AD670' }} />
                  Points Earned
                </h3>
                <p className="text-2xl font-bold" style={{ color: '#5AD670' }}>{submittedData?.pointsEarned}</p>
              </div>
            </div>

            {submittedData?.notes && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
                <p className="text-gray-600">{submittedData.notes}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">What would you like to do next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button 
                onClick={() => navigate('/reuse')}
                className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">♻️</div>
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-600">Reuse Ideas</h3>
                  <p className="text-gray-600 text-sm">Discover creative ways to reuse your items</p>
                </div>
              </button>
              
              <button className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 group">
                <div className="text-center">
                  <div className="text-4xl mb-3">🏪</div>
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-600">Find Recycle Centers</h3>
                  <p className="text-gray-600 text-sm">Locate nearby recycling facilities</p>
                </div>
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={resetForm}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 mr-4"
              >
                Submit Another Form
              </button>
              <button
                className="px-6 py-3 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                style={{ backgroundColor: '#5AD670' }}
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return currentPage === 'form' ? <RecycleForm /> : <SummaryPage />;
};

export default RecycleSystem;