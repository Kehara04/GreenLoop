import React, { useState } from 'react';
import { Recycle, MapPin, FileText, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecycleSystem = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState('form'); // 'form' | 'summary'
  const [formData, setFormData] = useState({
    categories: {
      metal: 0,
      plastic: 0,
      polythene: 0,
      eWaste: 0,
      clothes: 0,
      paper: 0,
      regiform: 0,
    },
    location: { district: '', city: '' },
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
    'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
    'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
    'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
    'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ];

  const categoryDetails = {
    metal: { label: 'Metal', icon: '🔧', color: 'bg-gray-100' },
    plastic: { label: 'Plastic', icon: '🥤', color: 'bg-blue-100' },
    polythene: { label: 'Polythene', icon: '🛍️', color: 'bg-purple-100' },
    eWaste: { label: 'E-Waste', icon: '📱', color: 'bg-red-100' },
    clothes: { label: 'Clothes', icon: '👕', color: 'bg-pink-100' },
    paper: { label: 'Paper', icon: '📄', color: 'bg-yellow-100' },
    regiform: { label: 'Regiform', icon: '🧊', color: 'bg-cyan-100' }
  };

  const handleLocationChange = (field, value) => {
    setFormData(prev => ({ ...prev, location: { ...prev.location, [field]: value } }));
  };

  const getTotalQuantity = () => Object.values(formData.categories).reduce((s, q) => s + q, 0);
  const getPointsEarned = () => getTotalQuantity();

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
      const res = await fetch('http://localhost:5000/api/recycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });

      let result = {};
      try { result = await res.json(); } catch {}

      if (res.ok && result.success) {
        setSubmittedData(result.data);
        setCurrentPage('summary');
      } else {
        // fallback demo mode
        const simulated = {
          ...formData,
          totalQuantity: getTotalQuantity(),
          pointsEarned: getPointsEarned(),
          form_id: Math.floor(Math.random() * 10000),
          status: 'pending',
          submittedAt: new Date().toISOString()
        };
        setSubmittedData(simulated);
        setCurrentPage('summary');
      }
    } catch (e) {
      console.error(e);
      const simulated = {
        ...formData,
        totalQuantity: getTotalQuantity(),
        pointsEarned: getPointsEarned(),
        form_id: Math.floor(Math.random() * 10000),
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      setSubmittedData(simulated);
      setCurrentPage('summary');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      categories: { metal: 0, plastic: 0, polythene: 0, eWaste: 0, clothes: 0, paper: 0, regiform: 0 },
      location: { district: '', city: '' },
      notes: ''
    });
    setSubmittedData(null);
    setCurrentPage('form');
    setError('');
  };

  const navigateToRecycleCenters = () => {
    // Build accepts list (labels only, for query-string fallback)
    const accepts = Object.entries(submittedData.categories)
      .filter(([, qty]) => qty > 0)
      .map(([k]) => categoryDetails[k].label)
      .join(',');

    const params = new URLSearchParams({
      district: submittedData.location.district,
      city: submittedData.location.city,
      accepts
    });

    // Pass BOTH state and query so refresh/deep-link still works
    navigate(`/recycle-centers?${params.toString()}`, {
      state: { formData: submittedData, showSuggested: true }
    });
  };

  // ---------------- FORM PAGE ----------------
  const RecycleForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
            <Recycle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Recycle Form</h1>
          <p className="text-gray-600">Help us track your recycling efforts and earn points!</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">⚠️ {error}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Categories */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Recycling Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {Object.entries(categoryDetails).map(([key, details]) => (
                <div key={key} className={`${details.color} rounded-lg p-4 border-2 border-transparent hover:border-green-300 transition-all duration-200`}>
                  <div className="text-center">
                    <div className="text-2xl mb-2">{details.icon}</div>
                    <h3 className="font-medium text-gray-800 text-sm mb-2">{details.label}</h3>
                    <input
                      type="number"
                      value={formData.categories[key] || ''}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          categories: { ...prev.categories, [key]: Math.max(0, parseFloat(e.target.value) || 0) }
                        }))
                      }
                      className="w-full border rounded p-2 text-center text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="0"
                      step="0.1"
                      placeholder="0"
                    />
                    <div className="text-xs text-gray-500 mt-1">kg</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
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
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => handleLocationChange('city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your city"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows="4"
              maxLength="500"
              placeholder="Any additional information about your recyclable items..."
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.notes.length}/500 characters
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading || getTotalQuantity() === 0}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
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
          </div>
        </div>
      </div>
    </div>
  );

  // ---------------- SUMMARY PAGE ----------------
  const SummaryPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Form Submitted Successfully!</h1>
          <p className="text-gray-600">Thank you for contributing to a sustainable future</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Submission Details</h2>
            <div className="text-right">
              <p className="text-sm text-gray-600">Form ID</p>
              <p className="font-semibold">#{submittedData?.form_id}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Items to Recycle</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(submittedData?.categories || {}).map(([key, qty]) => {
                if (qty === 0) return null;
                const details = categoryDetails[key];
                return (
                  <div key={key} className={`${details.color} rounded-lg p-4`}>
                    <div className="text-center">
                      <div className="text-2xl mb-1">{details.icon}</div>
                      <h4 className="font-medium text-gray-800 text-sm">{details.label}</h4>
                      <p className="text-sm font-bold">{qty} kg</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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
                <Award className="w-4 h-4 mr-1 text-green-600" />
                Points Earned
              </h3>
              <p className="text-2xl font-bold text-green-600">{submittedData?.pointsEarned}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">What would you like to do next?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={navigateToRecycleCenters}
              className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">🏪</div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-600">Find Recycle Centers</h3>
                <p className="text-gray-600 text-sm">We’ll show nearby centres that accept your items</p>
              </div>
            </button>

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
          </div>

          <div className="text-center">
            <button
              onClick={resetForm}
              className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 mr-4"
            >
              Submit Another Form
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return currentPage === 'form' ? <RecycleForm /> : <SummaryPage />;
};

export default RecycleSystem;
