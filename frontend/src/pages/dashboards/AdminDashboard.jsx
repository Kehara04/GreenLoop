// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { Users, Recycle, MapPin, TrendingUp, Activity, UserCheck, AlertTriangle, Award, Trash2, Bell } from 'lucide-react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import img3 from '../../assets/background1.png';

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalClients: 0,
//     activeUsers: 0,
//     totalRecycleRequests: 0,
//     totalWasteCollected: 0,
//     totalPointsAwarded: 0,
//     totalCollectionStores: 0,
//     pendingRequests: 0
//   });
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const [usersResponse, clientsResponse, recycleRequestsResponse] = await Promise.all([
//         axios.get('http://localhost:5000/api/users/'),
//         axios.get('http://localhost:5000/api/customers/users'),
//         // Add recycle requests endpoint when available
//         // axios.get('http://localhost:5000/api/recycle-requests/')
//         Promise.resolve({ data: [] }) // Placeholder for recycle requests
//       ]);

//       const allUsers = usersResponse.data;
//       const clients = clientsResponse.data;
//       const recycleRequests = recycleRequestsResponse.data;
      
//       setUsers(allUsers.slice(0, 5)); // Show only recent 5 users
//       setStats({
//         totalUsers: allUsers.length,
//         totalClients: clients.length,
//         activeUsers: allUsers.filter(u => u.userStatus === 'active').length,
//         // totalRecycleRequests: recycleRequests.length || 342,
//         totalWasteCollected: 2847, // kg - placeholder
//         totalPointsAwarded: 15620, // placeholder
//         totalCollectionStores: allUsers.filter(u => u.role === 'collection_store').length || 28,
//         pendingRequests: 23 // placeholder
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       setError('Failed to load dashboard data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const dashboardStats = [
//     {
//       name: 'Total Clients',
//       value: stats.totalClients,
//       icon: Users,
//       color: 'text-green-600 bg-green-100',
//       change: '+12%',
//       changeType: 'increase'
//     },
//     // {
//     //   name: 'Recycle Requests',
//     //   value: stats.totalRecycleRequests,
//     //   icon: Recycle,
//     //   color: 'text-blue-600 bg-blue-100',
//     //   change: '+25%',
//     //   changeType: 'increase'
//     // },
//     {
//       name: 'Waste Collected (kg)',
//       value: `${stats.totalWasteCollected}kg`,
//       icon: Trash2,
//       color: 'text-purple-600 bg-purple-100',
//       change: '+18%',
//       changeType: 'increase'
//     },
//     {
//       name: 'Points Awarded',
//       value: stats.totalPointsAwarded.toLocaleString(),
//       icon: Award,
//       color: 'text-yellow-600 bg-yellow-100',
//       change: '+15%',
//       changeType: 'increase'
//     },
//     {
//       name: 'Collection Stores',
//       value: stats.totalCollectionStores,
//       icon: MapPin,
//       color: 'text-red-600 bg-red-100',
//       change: '+5%',
//       changeType: 'increase'
//     },
//     {
//       name: 'Active Users',
//       value: stats.activeUsers,
//       icon: Activity,
//       color: 'text-green-600 bg-green-100',
//       change: '+8%',
//       changeType: 'increase'
//     }
//   ];

//   const getRoleColor = (role) => {
//     switch (role) {
//       case 'admin':
//         return 'bg-red-100 text-red-800';
//       case 'client':
//         return 'bg-green-100 text-green-800';
//       case 'collection_store':
//         return 'bg-blue-100 text-blue-800';
//       case 'customer':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatRoleText = (role) => {
//     return role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//   };

//   if (loading) {
//     return (
//       <div 
//         className="min-h-screen flex items-center justify-center"
//         style={{
//           backgroundImage: `url(${img3})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           backgroundAttachment: 'fixed'
//         }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400 relative z-10"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div 
//         className="min-h-screen flex items-center justify-center"
//         style={{
//           backgroundImage: `url(${img3})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           backgroundAttachment: 'fixed'
//         }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//         <div className="text-center relative z-10">
//           <AlertTriangle className="w-16 h-16 text-green-400 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-white mb-2">Error Loading Dashboard</h2>
//           <p className="text-green-200 mb-4">{error}</p>
//           <button 
//             onClick={fetchDashboardData}
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="min-h-screen relative overflow-hidden"
//       style={{
//         backgroundImage: `url(${img3})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         backgroundAttachment: 'fixed'
//       }}
//     >
//       {/* Dark overlay for better readability */}
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//       {/* Custom CSS for floating animations */}
//       <style jsx>{`
//         /* Floating eco shapes */
//         .floating { animation: float 6s ease-in-out infinite; }
//         .floating:nth-child(odd) { animation-delay: -2s; }
//         .floating:nth-child(even) { animation-delay: -4s; }
//         @keyframes float {
//           0%,100% { transform: translateY(0px); }
//           50% { transform: translateY(-12px); }
//         }
//       `}</style>

//       {/* Decorative floating elements */}
//       <div className="absolute top-4 left-4 w-16 h-16 bg-green-300 rounded-full opacity-10 floating"></div>
//       <div className="absolute top-12 right-8 w-8 h-8 bg-green-200 rounded-full opacity-15 floating"></div>
//       <div className="absolute bottom-8 left-12 w-12 h-12 bg-green-300 rounded-full opacity-10 floating"></div>
//       <div className="absolute bottom-4 right-16 w-6 h-6 bg-green-200 rounded-full opacity-20 floating"></div>

//       {/* Background SVG patterns */}
//       <svg className="absolute top-10 left-10 w-40 h-40 text-green-700 opacity-5 floating" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M12 2C8 6 2 9 2 15a10 10 0 0020 0c0-6-6-9-10-13z" />
//       </svg>
//       <svg className="absolute bottom-10 right-20 w-56 h-56 text-green-600 opacity-5 floating" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
//       </svg>

//       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-white drop-shadow-lg">
//             Admin Dashboard
//           </h1>
//           <p className="text-green-200 mt-2 drop-shadow-sm">
//             Welcome back, {user?.firstName}! Monitor your eco-friendly recycling platform.
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {dashboardStats.map((stat) => (
//             <div key={stat.name} className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 p-6 hover:shadow-2xl hover:bg-white transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.name}</p>
//                   <p className="text-2xl font-semibold text-gray-900 mt-2">
//                     {stat.value}
//                   </p>
//                   {stat.change && (
//                     <div className="flex items-center mt-2">
//                       <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
//                       <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className={`p-3 rounded-lg bg-green-500 shadow-lg`}>
//                   <stat.icon className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Recent Users - Kept as requested */}
//           <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
//               <Link
//                 to="/users"
//                 className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
//               >
//                 View all
//               </Link>
//             </div>
//             <div className="space-y-4">
//               {users.length > 0 ? users.map((userItem) => (
//                 <div key={userItem.user_id} className="flex items-center justify-between p-4 bg-gray-50/80 rounded-lg border border-gray-200">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md">
//                       <Users className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-900">
//                         {userItem.firstName} {userItem.lastName}
//                       </h3>
//                       <p className="text-sm text-gray-600">{userItem.email}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(userItem.role)}`}>
//                       {formatRoleText(userItem.role)}
//                     </span>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {new Date(userItem.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               )) : (
//                 <p className="text-gray-600 text-center py-4">No users found</p>
//               )}
//             </div>
//           </div>

//           {/* Eco System Alerts */}
//           <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">System Alerts</h2>
//             <div className="space-y-4">
//               <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//                 <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
//                 <div>
//                   <h3 className="text-sm font-medium text-yellow-800">Pending Requests</h3>
//                   <p className="text-sm text-yellow-700 mt-1">
//                     {stats.pendingRequests} recycle requests awaiting collection store assignment
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
//                 <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
//                 <div>
//                   <h3 className="text-sm font-medium text-blue-800">System Status</h3>
//                   <p className="text-sm text-blue-700 mt-1">
//                     All recycling services operational - 99.7% uptime
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
//                 <Recycle className="w-5 h-5 text-green-600 mt-0.5" />
//                 <div>
//                   <h3 className="text-sm font-medium text-green-800">Daily Impact</h3>
//                   <p className="text-sm text-green-700 mt-1">
//                     127kg of waste processed today - saving 85kg CO₂
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
//                 <Bell className="w-5 h-5 text-purple-600 mt-0.5" />
//                 <div>
//                   <h3 className="text-sm font-medium text-purple-800">Weekly Reminders</h3>
//                   <p className="text-sm text-purple-700 mt-1">
//                     156 users reminded to submit their weekly recycling data
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold text-white mb-4 drop-shadow-lg">Quick Actions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <button className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 p-4 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:scale-105">
//               <Users className="w-8 h-8 text-green-600 mb-2" />
//               <h3 className="font-medium text-gray-900">Manage Users</h3>
//               <p className="text-sm text-gray-600">Clients & collection stores</p>
//             </button>
//             <button className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 p-4 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:scale-105">
//               <Recycle className="w-8 h-8 text-green-600 mb-2" />
//               <h3 className="font-medium text-gray-900">Recycle Requests</h3>
//               <p className="text-sm text-gray-600">Monitor recycling submissions</p>
//             </button>
//             <button className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 p-4 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:scale-105">
//               <MapPin className="w-8 h-8 text-green-600 mb-2" />
//               <h3 className="font-medium text-gray-900">Collection Stores</h3>
//               <p className="text-sm text-gray-600">Manage recycling locations</p>
//             </button>
//             <button className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 p-4 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:scale-105">
//               <Award className="w-8 h-8 text-green-600 mb-2" />
//               <h3 className="font-medium text-gray-900">Points System</h3>
//               <p className="text-sm text-gray-600">Manage rewards & incentives</p>
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// src/pages/dashboards/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import img3 from '../../assets/background1.png';

import {
  Users, Recycle, MapPin, TrendingUp, Activity, AlertTriangle, Award, Trash2, Bell,
  BarChart3
} from 'lucide-react';

// Recharts
import {
  ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const API = axios.create();
API.interceptors.request.use((config) => {
  // attach token if you keep it in localStorage
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const AdminDashboard = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // KPIs + aggregations
  const [kpis, setKpis] = useState({
    totalForms: 0,
    totalKg: 0,
    totalPoints: 0,
    totalUsers: 0,
    activeUsers: 0
  });
  const [byDistrict, setByDistrict] = useState([]);     // [{_id: 'Colombo', totalKg, forms}, ...]
  const [byMonth, setByMonth] = useState([]);           // [{month:'2025-01', totalKg, totalPoints, forms}, ...]
  const [byCategory, setByCategory] = useState({});     // {metal, plastic, ...}
  const [recentForms, setRecentForms] = useState([]);   // latest forms (global)
  const [topUsers, setTopUsers] = useState([]);         // leaderboard

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const [
          overviewRes,
          monthRes,
          catRes,
          recentRes,
          topUsersRes,
          usersRes
        ] = await Promise.all([
          API.get('http://localhost:5000/api/recycle/admin/overview'),
          API.get('http://localhost:5000/api/recycle/admin/by-month'),
          API.get('http://localhost:5000/api/recycle/admin/by-category'),
          API.get('http://localhost:5000/api/recycle/admin/recent-forms?limit=10'),
          API.get('http://localhost:5000/api/recycle/admin/top-users?limit=5'),
          API.get('http://localhost:5000/api/users/')
        ]);

        setKpis(overviewRes.data.kpis);
        setByDistrict(overviewRes.data.byDistrict || []);
        setByMonth(monthRes.data || []);
        setByCategory(catRes.data || {});
        setRecentForms(recentRes.data || []);
        setTopUsers(topUsersRes.data || []);

        // (Optional) You were showing recent 5 users previously:
        // You can keep your "Recent Users" card using usersRes if desired
        setUsers(usersRes.data.slice(0, 5));
      } catch (e) {
        console.error(e);
        setErr('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Keep your older "Recent Users" section behavior
  const [users, setUsers] = useState([]);

  const dashboardStats = useMemo(() => ([
    {
      name: 'Total Forms',
      value: kpis.totalForms,
      icon: Recycle,
      color: 'text-blue-600 bg-blue-100',
      change: '',
      changeType: 'neutral'
    },
    {
      name: 'Waste Collected (kg)',
      value: `${(kpis.totalKg || 0).toFixed ? kpis.totalKg.toFixed(2) : kpis.totalKg}kg`,
      icon: Trash2,
      color: 'text-purple-600 bg-purple-100',
      change: '',
      changeType: 'neutral'
    },
    {
      name: 'Points Awarded',
      value: (kpis.totalPoints || 0).toLocaleString(),
      icon: Award,
      color: 'text-yellow-600 bg-yellow-100',
      change: '',
      changeType: 'neutral'
    },
    {
      name: 'Total Users',
      value: kpis.totalUsers,
      icon: Users,
      color: 'text-green-600 bg-green-100',
      change: '',
      changeType: 'neutral'
    },
    {
      name: 'Active Users',
      value: kpis.activeUsers,
      icon: Activity,
      color: 'text-green-600 bg-green-100',
      change: '',
      changeType: 'neutral'
    },
    {
      name: 'Top District',
      value: byDistrict?.[0]?._id || '—',
      icon: MapPin,
      color: 'text-red-600 bg-red-100',
      change: '',
      changeType: 'neutral'
    }
  ]), [kpis, byDistrict]);

  // Pie chart data from byCategory
  const categoryChartData = useMemo(() => {
    const c = byCategory || {};
    return Object.entries({
      Metal: c.metal || 0,
      Plastic: c.plastic || 0,
      Polythene: c.polythene || 0,
      'E-Waste': c.eWaste || 0,
      Clothes: c.clothes || 0,
      Paper: c.paper || 0,
      Regiform: c.regiform || 0
    }).map(([name, value]) => ({ name, value: Number(value || 0) }));
  }, [byCategory]);

  // Colors for pie cells (no custom colors requested, but provide a few)
  const PIE_COLORS = ['#34D399','#60A5FA','#FBBF24','#F87171','#C084FC','#10B981','#F59E0B'];

  // Format a date string
  const niceDateTime = (iso) =>
    new Date(iso).toLocaleString(undefined, { year:'numeric', month:'short', day:'numeric', hour:'numeric', minute:'2-digit' });

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${img3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400 relative z-10"></div>
      </div>
    );
  }

  if (err) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${img3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="text-center relative z-10">
          <AlertTriangle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Dashboard</h2>
          <p className="text-green-200 mb-4">{err}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${img3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <style jsx>{`
        .floating { animation: float 6s ease-in-out infinite; }
        .floating:nth-child(odd) { animation-delay: -2s; }
        .floating:nth-child(even) { animation-delay: -4s; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      `}</style>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">Admin Analytics</h1>
          <p className="text-green-200 mt-2 drop-shadow-sm">
            Hello {user?.firstName}, here’s the platform-wide recycling performance.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardStats.map((stat) => (
            <div key={stat.name} className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 p-6 hover:shadow-2xl hover:bg-white transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                  {stat.change && (
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                    </div>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-green-500 shadow-lg">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Line: KG by month */}
          <div className="bg-white/95 rounded-xl shadow-xl border border-white/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="text-green-600" /> KG by Month
              </h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={byMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="totalKg" name="Total KG" />
                  <Line type="monotone" dataKey="forms" name="Forms" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar: Top Districts by KG */}
          <div className="bg-white/95 rounded-xl shadow-xl border border-white/30 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Districts (KG)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byDistrict.slice(0, 7)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalKg" name="KG" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie: Category Distribution */}
          <div className="bg-white/95 rounded-xl shadow-xl border border-white/30 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {categoryChartData.map((entry, idx) => (
                      <Cell key={`c-${idx}`} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Forms (global) */}
          <div className="bg-white/95 rounded-xl shadow-xl border border-white/30 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Recycle Forms</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Form ID</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">User</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">District</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">KG</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Points</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentForms.map((f) => (
                    <tr key={f._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm font-semibold text-gray-900">#{f.form_id}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {f.user
                          ? `${f.user.firstName} ${f.user.lastName}`
                          : `User #${f.userId}`}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">{f.location?.district || '—'}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{(f.totalQuantity || 0).toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{(f.pointsEarned || 0).toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                          {f.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">{niceDateTime(f.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Users */}
          <div className="bg-white/95 rounded-xl shadow-xl border border-white/30 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Users</h2>
            <div className="space-y-3">
              {topUsers.map((u, idx) => (
                <div key={u.user_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{u.firstName} {u.lastName}</div>
                      <div className="text-xs text-gray-600">{u.email}</div>
                      <div className="text-xs text-gray-600">Level: {u.user_level}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{(u.totalKg || 0).toFixed(2)} kg</div>
                    <div className="text-xs text-gray-600">{u.forms} forms</div>
                    <div className="text-xs text-green-700 font-bold">{u.totalPoints.toFixed(2)} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Existing sections you had (Recent Users, System Alerts, Quick Actions) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Users (kept) */}
          <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
              <Link
                to="/users"
                className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {users.length > 0 ? users.map((u) => (
                <div key={u.user_id} className="flex items-center justify-between p-4 bg-gray-50/80 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {u.firstName} {u.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{u.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {u.role}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-gray-600 text-center py-4">No users found</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
