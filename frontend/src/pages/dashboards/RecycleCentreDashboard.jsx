// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import {
//   BuildingStorefrontIcon,
//   MapPinIcon,
//   PhoneIcon,
//   ChartBarIcon,
//   PlusIcon,
//   EyeIcon
// } from '@heroicons/react/24/outline';
// import { Link } from 'react-router-dom';

// const RecycleCentreDashboard = () => {
//   const [centres, setCentres] = useState([]);
//   const [stats, setStats] = useState({
//     totalCentres: 0,
//     activeToday: 0,
//     totalItems: 0,
//     recentAdditions: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [recentCentres, setRecentCentres] = useState([]);

//   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

//   // Fetch all recycle centres and calculate stats
//   const fetchDashboardData = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/recycleCentre/`);
//       if (response.ok) {
//         const data = await response.json();
//         setCentres(data);
        
//         // Calculate statistics
//         const totalItems = data.reduce((sum, centre) => sum + (centre.acceptedItems?.length || 0), 0);
//         const recentAdditions = data.filter(centre => {
//           const createdDate = new Date(centre.createdAt);
//           const weekAgo = new Date();
//           weekAgo.setDate(weekAgo.getDate() - 7);
//           return createdDate >= weekAgo;
//         }).length;

//         setStats({
//           totalCentres: data.length,
//           activeToday: data.length, // Assuming all centres are active
//           totalItems,
//           recentAdditions
//         });

//         // Get recent centres (last 5)
//         const recent = data
//           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//           .slice(0, 5);
//         setRecentCentres(recent);
//       } else {
//         toast.error('Failed to fetch dashboard data');
//       }
//     } catch (error) {
//       toast.error('Error connecting to server');
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const StatCard = ({ title, value, icon: Icon, change, changeType, color = "green" }) => (
//     <div className="bg-white overflow-hidden shadow-sm rounded-lg">
//       <div className="p-5">
//         <div className="flex items-center">
//           <div className="flex-shrink-0">
//             <Icon className={`h-6 w-6 text-${color}-600`} />
//           </div>
//           <div className="ml-5 w-0 flex-1">
//             <dl>
//               <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
//               <dd>
//                 <div className="flex items-baseline">
//                   <div className="text-2xl font-semibold text-gray-900">{value}</div>
//                   {change && (
//                     <div className={`ml-2 flex items-baseline text-sm font-semibold ${
//                       changeType === 'increase' ? 'text-green-600' : 'text-red-600'
//                     }`}>
//                       {changeType === 'increase' ? '+' : '-'}{change}
//                     </div>
//                   )}
//                 </div>
//               </dd>
//             </dl>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Recycle Centre Dashboard</h1>
//               <p className="text-gray-600 mt-1">Monitor and manage recycling centres</p>
//             </div>
//             <div className="flex space-x-3">
//               <Link
//                 to="/recycle-centres/map"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
//               >
//                 <MapPinIcon className="h-5 w-5" />
//                 <span>View Map</span>
//               </Link>
//               <Link
//                 to="/recycle-centres/list"
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
//               >
//                 <EyeIcon className="h-5 w-5" />
//                 <span>Manage Centres</span>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Centres"
//             value={stats.totalCentres}
//             icon={BuildingStorefrontIcon}
//             change={stats.recentAdditions}
//             changeType="increase"
//             color="green"
//           />
//           <StatCard
//             title="Active Today"
//             value={stats.activeToday}
//             icon={ChartBarIcon}
//             color="blue"
//           />
//           <StatCard
//             title="Total Items Accepted"
//             value={stats.totalItems}
//             icon={MapPinIcon}
//             color="purple"
//           />
//           <StatCard
//             title="Added This Week"
//             value={stats.recentAdditions}
//             icon={PlusIcon}
//             color="orange"
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Recent Centres */}
//           <div className="lg:col-span-2">
//             <div className="bg-white shadow-sm rounded-lg">
//               <div className="px-6 py-4 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold text-gray-900">Recent Centres</h3>
//                   <Link
//                     to="/recycle-centres/list"
//                     className="text-sm text-green-600 hover:text-green-700"
//                   >
//                     View all
//                   </Link>
//                 </div>
//               </div>
//               <div className="divide-y divide-gray-200">
//                 {recentCentres.length === 0 ? (
//                   <div className="p-6 text-center">
//                     <BuildingStorefrontIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-600">No centres added yet</p>
//                     <Link
//                       to="/recycle-centres/list"
//                       className="mt-2 inline-flex items-center text-sm text-green-600 hover:text-green-700"
//                     >
//                       <PlusIcon className="h-4 w-4 mr-1" />
//                       Add your first centre
//                     </Link>
//                   </div>
//                 ) : (
//                   recentCentres.map((centre) => (
//                     <div key={centre._id} className="p-6 hover:bg-gray-50">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                           <div className="bg-green-100 p-2 rounded-full">
//                             <BuildingStorefrontIcon className="h-6 w-6 text-green-600" />
//                           </div>
//                           <div>
//                             <h4 className="text-sm font-semibold text-gray-900">{centre.name}</h4>
//                             <div className="flex items-center text-sm text-gray-600 mt-1">
//                               <MapPinIcon className="h-4 w-4 mr-1" />
//                               {centre.address.length > 50 
//                                 ? `${centre.address.substring(0, 50)}...` 
//                                 : centre.address}
//                             </div>
//                             <div className="flex items-center text-sm text-gray-600 mt-1">
//                               <PhoneIcon className="h-4 w-4 mr-1" />
//                               {centre.contactNumber}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//                             ID: {centre.recycleCentre_id}
//                           </span>
//                           <p className="text-xs text-gray-500 mt-1">
//                             {new Date(centre.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
//                       {centre.acceptedItems && centre.acceptedItems.length > 0 && (
//                         <div className="mt-3 flex flex-wrap gap-1">
//                           {centre.acceptedItems.slice(0, 4).map((item, index) => (
//                             <span
//                               key={index}
//                               className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
//                             >
//                               {item}
//                             </span>
//                           ))}
//                           {centre.acceptedItems.length > 4 && (
//                             <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
//                               +{centre.acceptedItems.length - 4} more
//                             </span>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions & Summary */}
//           <div className="space-y-6">
//             {/* Quick Actions */}
//             <div className="bg-white shadow-sm rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//               <div className="space-y-3">
//                 <Link
//                   to="/recycle-centres/list?action=add"
//                   className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
//                 >
//                   <PlusIcon className="h-5 w-5" />
//                   <span>Add New Centre</span>
//                 </Link>
//                 <Link
//                   to="/recycle-centres/map"
//                   className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
//                 >
//                   <MapPinIcon className="h-5 w-5" />
//                   <span>View on Map</span>
//                 </Link>
//                 <Link
//                   to="/recycle-centres/list"
//                   className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
//                 >
//                   <EyeIcon className="h-5 w-5" />
//                   <span>Manage All</span>
//                 </Link>
//               </div>
//             </div>

//             {/* Popular Items */}
//             <div className="bg-white shadow-sm rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Items</h3>
//               <div className="space-y-2">
//                 {(() => {
//                   // Calculate item frequency
//                   const itemCount = {};
//                   centres.forEach(centre => {
//                     centre.acceptedItems?.forEach(item => {
//                       itemCount[item] = (itemCount[item] || 0) + 1;
//                     });
//                   });
                  
//                   const sortedItems = Object.entries(itemCount)
//                     .sort(([,a], [,b]) => b - a)
//                     .slice(0, 6);
                  
//                   if (sortedItems.length === 0) {
//                     return (
//                       <p className="text-gray-600 text-sm">No items data available</p>
//                     );
//                   }
                  
//                   return sortedItems.map(([item, count]) => (
//                     <div key={item} className="flex justify-between items-center">
//                       <span className="text-sm text-gray-700">{item}</span>
//                       <div className="flex items-center space-x-2">
//                         <div className="bg-gray-200 rounded-full h-2 w-16">
//                           <div
//                             className="bg-green-600 h-2 rounded-full"
//                             style={{
//                               width: `${(count / Math.max(...Object.values(itemCount))) * 100}%`
//                             }}
//                           ></div>
//                         </div>
//                         <span className="text-xs text-gray-500">{count}</span>
//                       </div>
//                     </div>
//                   ));
//                 })()}
//               </div>
//             </div>

//             {/* System Status */}
//             <div className="bg-white shadow-sm rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-700">API Status</span>
//                   <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//                     Online
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-700">Database</span>
//                   <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//                     Connected
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-700">Last Sync</span>
//                   <span className="text-xs text-gray-500">
//                     {new Date().toLocaleTimeString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecycleCentreDashboard;

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Building, MapPin, Phone, Mail, Globe, Package } from 'lucide-react';
import img8 from '../../assets/background1.png';

const RecycleCentreDashboard = () => {
  const { user } = useAuth();

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${img8})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Custom CSS for floating animations */}
      <style jsx>{`
        /* Floating eco shapes */
        .floating { animation: float 6s ease-in-out infinite; }
        .floating:nth-child(odd) { animation-delay: -2s; }
        .floating:nth-child(even) { animation-delay: -4s; }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      {/* Decorative floating elements */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-green-300 rounded-full opacity-10 floating"></div>
      <div className="absolute top-12 right-8 w-8 h-8 bg-green-200 rounded-full opacity-15 floating"></div>
      <div className="absolute bottom-8 left-12 w-12 h-12 bg-green-300 rounded-full opacity-10 floating"></div>
      <div className="absolute bottom-4 right-16 w-6 h-6 bg-green-200 rounded-full opacity-20 floating"></div>

      {/* Background SVG patterns */}
      <svg className="absolute top-10 left-10 w-40 h-40 text-green-700 opacity-5 floating" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8 6 2 9 2 15a10 10 0 0020 0c0-6-6-9-10-13z" />
      </svg>
      <svg className="absolute bottom-10 right-20 w-56 h-56 text-green-600 opacity-5 floating" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>

      {/* Main content with relative positioning to appear above overlay */}
      <div className="relative z-10 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Recycle Centre Dashboard</h1>
            <p className="text-gray-200 mt-2">Welcome back, {user?.name || 'Recycle Centre'}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Centre Information Card */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <div className="flex items-center mb-6">
                  <Building className="h-8 w-8 text-green-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800">Centre Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Centre Name</p>
                      <p className="text-gray-600">{user?.name || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Email</p>
                      <p className="text-gray-600">{user?.email || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Contact Number</p>
                      <p className="text-gray-600">{user?.contactNumber || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Address</p>
                      <p className="text-gray-600">{user?.address || 'N/A'}</p>
                    </div>
                  </div>
                  
                  {user?.website && (
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-gray-700">Website</p>
                        <a 
                          href={user.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {user.website}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <Package className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Accepted Items</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {user?.acceptedItems && user.acceptedItems.length > 0 ? (
                          user.acceptedItems.map((item, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                            >
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No items specified</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="lg:col-span-1">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary" style={{ backgroundColor: '#184325' }}>
                    Update Centre Info
                  </button>
                  <button className="w-full btn-secondary" style={{ color: '#184325', borderColor: '#184325' }}>
                    View Requests
                  </button>
                  <button className="w-full btn-secondary" style={{ color: '#184325', borderColor: '#184325' }}>
                    Manage Inventory
                  </button>
                  <button className="w-full btn-secondary" style={{ color: '#184325', borderColor: '#184325' }}>
                    Generate Reports
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="card p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Location</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Latitude:</span> {user?.location?.lat || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Longitude:</span> {user?.location?.lng || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-gray-600 mt-2">Active Requests</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-gray-600 mt-2">Completed Today</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-orange-600">0</div>
              <div className="text-gray-600 mt-2">Total Collections</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">0</div>
              <div className="text-gray-600 mt-2">Items Processed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecycleCentreDashboard;