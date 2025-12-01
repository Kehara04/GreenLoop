// import React, { useState, useEffect } from 'react';
// import { MapPin, Phone, Globe, Mail, Search, Filter, Star, ArrowLeft, Building, Recycle, CheckCircle } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const RecycleCentersPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Get form data from navigation state
//   const formData = location.state?.formData || null;
//   const showSuggestedInitially = location.state?.showSuggested || false;

//   const [centers, setCenters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showAll, setShowAll] = useState(!showSuggestedInitially);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
  
//   // Get form data passed as props
//   const userLocation = formData?.location || {};
//   const userCategories = formData?.categories || {};

//   const districts = [
//     'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
//     'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
//     'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
//     'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
//     'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
//   ];

//   // Fetch suggested centers based on form data
//   useEffect(() => {
//     const fetchCenters = async () => {
//       setLoading(true);
//       setError('');
      
//       try {
//         let url, options;
        
//         if (showAll) {
//           // Fetch all centers
//           url = 'http://localhost:5000/api/recycleCentre/';
//           options = { method: 'GET' };
//         } else if (formData) {
//           // Fetch suggested centers based on form data
//           url = 'http://localhost:5000/api/recycleCentre/suggest';
//           options = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               district: userLocation.district,
//               city: userLocation.city,
//               categories: userCategories
//             })
//           };
//         } else {
//           // Fallback to all centers if no form data
//           url = 'http://localhost:5000/api/recycleCentre/';
//           options = { method: 'GET' };
//         }

//         const response = await fetch(url, options);
//         const result = await response.json();

//         if (response.ok) {
//           setCenters(showAll ? result : (result.centres || []));
//         } else {
//           setError(result.message || 'Failed to fetch centers');
//           // Fallback to mock data for demo
//           setCenters(getMockCenters());
//         }
//       } catch (error) {
//         console.error('Error fetching centers:', error);
//         setError('Failed to connect to server');
//         // Fallback to mock data for demo
//         setCenters(getMockCenters());
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCenters();
//   }, [showAll, formData]);

//   // Mock data for fallback
//   const getMockCenters = () => {
//     const mockCenters = [
//       {
//         recycleCentre_id: 1,
//         name: "Green Recycle Hub",
//         address: "123 Main Street, Colombo 03",
//         contactNumber: "+94112345678",
//         email: "info@greenrecyclehub.lk",
//         website: "www.greenrecyclehub.lk",
//         location: { city: "colombo", district: "colombo" },
//         acceptedItems: ["plastic", "paper", "metal", "electronic"],
//         matchPercentage: formData ? 85 : undefined,
//         matchScore: formData ? 4 : undefined
//       },
//       {
//         recycleCentre_id: 2,
//         name: "EcoWaste Solutions",
//         address: "456 Kandy Road, Kandy",
//         contactNumber: "+94812345678",
//         email: "contact@ecowaste.lk",
//         website: "www.ecowaste.lk",
//         location: { city: "kandy", district: "kandy" },
//         acceptedItems: ["clothes", "textile", "paper", "cardboard"],
//         matchPercentage: formData ? 60 : undefined,
//         matchScore: formData ? 3 : undefined
//       },
//       {
//         recycleCentre_id: 3,
//         name: "Metro Recycling Center",
//         address: "789 Galle Road, Mount Lavinia",
//         contactNumber: "+94112789012",
//         email: "service@metrorecycle.lk",
//         location: { city: "mount lavinia", district: "colombo" },
//         acceptedItems: ["metal", "aluminum", "steel", "electronic", "ewaste"],
//         matchPercentage: formData ? 70 : undefined,
//         matchScore: formData ? 3 : undefined
//       }
//     ];

//     // Filter mock data based on form data if available
//     if (formData && !showAll) {
//       return mockCenters.filter(center => 
//         center.location.district.toLowerCase() === userLocation.district?.toLowerCase()
//       );
//     }

//     return mockCenters;
//   };

//   // Filter centers based on search and district
//   const filteredCenters = centers.filter(center => {
//     const matchesSearch = !searchTerm || 
//       center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       center.location?.city?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesDistrict = !selectedDistrict || 
//       center.location?.district?.toLowerCase() === selectedDistrict.toLowerCase();
    
//     return matchesSearch && matchesDistrict;
//   });

//   const CenterCard = ({ center }) => (
//     <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
//       <div className="p-6">
//         {/* Header with match score */}
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center">
//             <div className="bg-green-100 p-2 rounded-lg mr-3">
//               <Building className="w-5 h-5 text-green-600" />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800">{center.name}</h3>
//               <div className="flex items-center text-sm text-gray-600">
//                 <MapPin className="w-4 h-4 mr-1" />
//                 {center.location?.city && center.location?.district 
//                   ? `${center.location.city.charAt(0).toUpperCase() + center.location.city.slice(1)}, ${center.location.district.charAt(0).toUpperCase() + center.location.district.slice(1)}`
//                   : 'Location not specified'
//                 }
//               </div>
//             </div>
//           </div>
          
//           {center.matchPercentage !== undefined && (
//             <div className="text-right">
//               <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                 center.matchPercentage >= 80 ? 'bg-green-100 text-green-800' :
//                 center.matchPercentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
//                 'bg-gray-100 text-gray-800'
//               }`}>
//                 <Star className="w-3 h-3 mr-1" />
//                 {center.matchPercentage}% Match
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Address */}
//         <div className="mb-4">
//           <p className="text-gray-600 text-sm flex items-start">
//             <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
//             {center.address}
//           </p>
//         </div>

//         {/* Contact Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           {center.contactNumber && (
//             <div className="flex items-center text-sm text-gray-600">
//               <Phone className="w-4 h-4 mr-2 text-green-600" />
//               <a 
//                 href={`tel:${center.contactNumber}`}
//                 className="hover:text-green-600 transition-colors"
//               >
//                 {center.contactNumber}
//               </a>
//             </div>
//           )}
          
//           {center.email && (
//             <div className="flex items-center text-sm text-gray-600">
//               <Mail className="w-4 h-4 mr-2 text-green-600" />
//               <a 
//                 href={`mailto:${center.email}`}
//                 className="hover:text-green-600 transition-colors truncate"
//               >
//                 {center.email}
//               </a>
//             </div>
//           )}
          
//           {center.website && (
//             <div className="flex items-center text-sm text-gray-600 md:col-span-2">
//               <Globe className="w-4 h-4 mr-2 text-green-600" />
//               <a 
//                 href={center.website.startsWith('http') ? center.website : `https://${center.website}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-green-600 transition-colors truncate"
//               >
//                 {center.website}
//               </a>
//             </div>
//           )}
//         </div>

//         {/* Accepted Items */}
//         {center.acceptedItems && center.acceptedItems.length > 0 && (
//           <div>
//             <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
//               <Recycle className="w-4 h-4 mr-1 text-green-600" />
//               Accepted Items
//             </h4>
//             <div className="flex flex-wrap gap-1">
//               {center.acceptedItems.slice(0, 6).map((item, index) => (
//                 <span
//                   key={index}
//                   className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200"
//                 >
//                   {item}
//                 </span>
//               ))}
//               {center.acceptedItems.length > 6 && (
//                 <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200">
//                   +{center.acceptedItems.length - 6} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
//           {center.contactNumber && (
//             <button
//               onClick={() => window.open(`tel:${center.contactNumber}`, '_self')}
//               className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium flex items-center justify-center"
//             >
//               <Phone className="w-3 h-3 mr-1" />
//               Call
//             </button>
//           )}
//           {center.email && (
//             <button
//               onClick={() => window.open(`mailto:${center.email}`, '_self')}
//               className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium flex items-center justify-center"
//             >
//               <Mail className="w-3 h-3 mr-1" />
//               Email
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800 flex items-center">
//                   <Building className="w-6 h-6 mr-2 text-green-600" />
//                   Recycle Centers
//                 </h1>
//                 {formData && !showAll && (
//                   <p className="text-sm text-gray-600 mt-1">
//                     Suggested centers for {userLocation.city && userLocation.district 
//                       ? `${userLocation.city.charAt(0).toUpperCase() + userLocation.city.slice(1)}, ${userLocation.district.charAt(0).toUpperCase() + userLocation.district.slice(1)}`
//                       : 'your location'
//                     }
//                   </p>
//                 )}
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={() => setShowAll(!showAll)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                   showAll 
//                     ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
//                     : 'bg-green-600 text-white hover:bg-green-700'
//                 }`}
//               >
//                 {showAll ? 'Show Suggested' : 'View All Centers'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search centers..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>
            
//             <div className="relative">
//               <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <select
//                 value={selectedDistrict}
//                 onChange={(e) => setSelectedDistrict(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
//               >
//                 <option value="">All Districts</option>
//                 {districts.map(district => (
//                   <option key={district} value={district}>{district}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="flex items-center text-sm text-gray-600">
//               <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
//               {filteredCenters.length} centers found
//             </div>
//           </div>
//         </div>

//         {/* Form Data Summary (if available) */}
//         {formData && !showAll && (
//           <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//             <h3 className="text-sm font-medium text-gray-800 mb-2">Your Recyclable Items:</h3>
//             <div className="flex flex-wrap gap-2">
//               {Object.entries(userCategories).map(([key, qty]) => {
//                 if (qty === 0) return null;
//                 return (
//                   <span key={key} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
//                     {key.charAt(0).toUpperCase() + key.slice(1)}: {qty}kg
//                   </span>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
//             <span className="ml-3 text-gray-600">Loading centers...</span>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center">
//               <div className="bg-yellow-100 rounded-full p-2 mr-3">
//                 <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-yellow-800 font-medium">Connection Issue</h3>
//                 <p className="text-yellow-600 text-sm">{error}. Showing sample data instead.</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Centers Grid */}
//         {!loading && (
//           <>
//             {filteredCenters.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                   <Building className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-800 mb-2">No Centers Found</h3>
//                 <p className="text-gray-600 mb-4">
//                   {searchTerm || selectedDistrict 
//                     ? 'Try adjusting your search or filter criteria'
//                     : 'No recycle centers available for your location'
//                   }
//                 </p>
//                 {(searchTerm || selectedDistrict) && (
//                   <button
//                     onClick={() => {
//                       setSearchTerm('');
//                       setSelectedDistrict('');
//                     }}
//                     className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                   >
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {filteredCenters.map((center) => (
//                   <CenterCard key={center.recycleCentre_id || center._id || Math.random()} center={center} />
//                 ))}
//               </div>
//             )}
//           </>
//         )}

//         {/* Summary Info */}
//         {!loading && filteredCenters.length > 0 && (
//           <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
//             <div className="text-center">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 Found {filteredCenters.length} Recycle Centers
//               </h3>
//               {formData && !showAll && (
//                 <p className="text-gray-600">
//                   Centers suggested based on your location and recyclable items
//                 </p>
//               )}
//               {showAll && (
//                 <p className="text-gray-600">
//                   All available recycle centers in Sri Lanka
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecycleCentersPage;

import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Phone, Globe, Mail, ArrowLeft, Building, Recycle, Star } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import img9 from '../../../assets/background1.png';

const RecycleCentersPage = () => {
  const navigate = useNavigate();
  const { state, search } = useLocation();

  // Prefer state from RecycleForm navigate, else fall back to query params
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const formData = state?.formData || null;

  const fallbackDistrict = query.get('district') || '';
  const fallbackCity = query.get('city') || '';
  const fallbackAccepts = (query.get('accepts') || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const usingStatePayload = Boolean(formData?.location?.district);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        let res, data;

        if (usingStatePayload) {
          // Best suggestion: send categories so backend can score centres
          res = await fetch('http://localhost:5000/api/recycleCentre/suggest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              district: formData.location.district,
              city: formData.location.city,
              categories: formData.categories
            })
          });
          data = await res.json();
          if (!res.ok || data.success === false) throw new Error(data.message || 'Failed to load centres');
          setCenters(data.centres || []);
        } else if (fallbackDistrict) {
          // On refresh/direct link: use by-area with accepted items (labels)
          const params = new URLSearchParams({
            district: fallbackDistrict,
            city: fallbackCity,
            acceptedItems: fallbackAccepts.join(',')
          });
          res = await fetch(`http://localhost:5000/api/recycleCentre/by-area?${params.toString()}`);
          data = await res.json();
          if (!res.ok || data.success === false) throw new Error(data.message || 'Failed to load centres');
          setCenters(data.centres || []);
        } else {
          // No inputs – show ALL centres (still useful)
          res = await fetch('http://localhost:5000/api/recycleCentre/');
          data = await res.json();
          if (!res.ok) throw new Error('Failed to load centres');
          setCenters(data || []);
        }
      } catch (e) {
        console.error(e);
        setError(e.message || 'Failed to load centres');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usingStatePayload, search]);

  const title = usingStatePayload || fallbackDistrict
    ? `Suggested centres near ${formData?.location?.city || fallbackCity}, ${formData?.location?.district || fallbackDistrict}`
    : 'All Recycle Centers';

  return (
    <div
      className="min-h-screen py-8 relative"
      style={{
        backgroundImage: `url(${img9})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content container with relative positioning to appear above overlay */}
      <div className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 px-3 py-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">{title}</h1>
          </div>

          {loading && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mr-3"></div>
                <span>Loading centres…</span>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-red-700 shadow-lg">
              {error}
            </div>
          )}

          {!loading && !error && centers.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-700 mb-3">
                No centres found for this area. Try checking all centres.
              </p>
              <button
                onClick={() => navigate('/recycle-centers')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                View All Centres
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {centers.map((c) => (
              <div key={c.recycleCentre_id || c._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden backdrop-blur-sm">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        <Building className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {c.location?.city && c.location?.district
                            ? `${c.location.city.charAt(0).toUpperCase() + c.location.city.slice(1)}, ${c.location.district.charAt(0).toUpperCase() + c.location.district.slice(1)}`
                            : 'Location not specified'}
                        </div>
                      </div>
                    </div>

                    {typeof c.matchPercentage === 'number' && (
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        c.matchPercentage >= 80 ? 'bg-green-100 text-green-800'
                        : c.matchPercentage >= 60 ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'}`}>
                        <Star className="w-3 h-3 mr-1" />
                        {c.matchPercentage}% Match
                      </div>
                    )}
                  </div>

                  {c.address && (
                    <p className="text-gray-600 text-sm mb-3">{c.address}</p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
                    {c.contactNumber && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-green-600" />
                        <a href={`tel:${c.contactNumber}`} className="hover:text-green-600 transition-colors">{c.contactNumber}</a>
                      </div>
                    )}
                    {c.email && (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-green-600" />
                        <a href={`mailto:${c.email}`} className="hover:text-green-600 transition-colors">{c.email}</a>
                      </div>
                    )}
                    {c.website && (
                      <div className="md:col-span-2 flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-green-600" />
                        <a
                          href={c.website.startsWith('http') ? c.website : `https://${c.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-green-600 transition-colors truncate"
                        >
                          {c.website}
                        </a>
                      </div>
                    )}
                  </div>

                  {Array.isArray(c.acceptedItems) && c.acceptedItems.length > 0 && (
                    <>
                      <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
                        <Recycle className="w-4 h-4 mr-1 text-green-600" />
                        Accepted Items
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {c.acceptedItems.slice(0, 8).map((item, i) => (
                          <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                            {item}
                          </span>
                        ))}
                        {c.acceptedItems.length > 8 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200">
                            +{c.acceptedItems.length - 8} more
                          </span>
                        )}
                        {c.acceptedItems.length > 8 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200">
                            +{c.acceptedItems.length - 8} more
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecycleCentersPage;


