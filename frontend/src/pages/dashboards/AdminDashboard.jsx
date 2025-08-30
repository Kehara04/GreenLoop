// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { Users, ShoppingCart, Package, TrendingUp, Activity, UserCheck, AlertTriangle } from 'lucide-react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalCustomers: 0,
//     activeUsers: 0,
//     totalOrders: 0
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
      
//       const [usersResponse, customersResponse, ordersResponse] = await Promise.all([
//         axios.get('http://localhost:5000/api/users/'),
//         axios.get('http://localhost:5000/api/customers/users'),
//         // Add orders endpoint when available
//         // axios.get('http://localhost:5000/api/orders/')
//         Promise.resolve({ data: [] }) // Placeholder for orders
//       ]);

//       const allUsers = usersResponse.data;
//       const customers = customersResponse.data;
//       const orders = ordersResponse.data;
      
//       setUsers(allUsers.slice(0, 5)); // Show only recent 5 users
//       setStats({
//         totalUsers: allUsers.length,
//         totalCustomers: customers.length,
//         activeUsers: allUsers.filter(u => u.userStatus === 'active').length,
//         totalOrders: orders.length || 156 // Fallback to hardcoded value
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
//       name: 'Total Users',
//       value: stats.totalUsers,
//       icon: Users,
//       color: 'text-blue-600 bg-blue-100',
//       change: '+12%',
//       changeType: 'increase'
//     },
//     {
//       name: 'Customers',
//       value: stats.totalCustomers,
//       icon: UserCheck,
//       color: 'text-green-600 bg-green-100',
//       change: '+8%',
//       changeType: 'increase'
//     },
//     {
//       name: 'Active Users',
//       value: stats.activeUsers,
//       icon: Activity,
//       color: 'text-purple-600 bg-purple-100',
//       change: '+5%',
//       changeType: 'increase'
//     },
//     {
//       name: 'Total Orders',
//       value: stats.totalOrders,
//       icon: ShoppingCart,
//       color: 'text-orange-600 bg-orange-100',
//       change: '+18%',
//       changeType: 'increase'
//     }
//   ];

//   const getRoleColor = (role) => {
//     switch (role) {
//       case 'admin':
//         return 'bg-red-100 text-red-800';
//       case 'customer':
//         return 'bg-blue-100 text-blue-800';
//       case 'inventory_manager':
//         return 'bg-green-100 text-green-800';
//       case 'customer_supporter':
//         return 'bg-purple-100 text-purple-800';
//       case 'deliver':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatRoleText = (role) => {
//     return role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button 
//             onClick={fetchDashboardData}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Admin Dashboard
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Welcome back, {user?.firstName}! Here's your system overview.
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {dashboardStats.map((stat) => (
//             <div key={stat.name} className="bg-white rounded-lg shadow-sm border p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">{stat.name}</p>
//                   <p className="text-2xl font-semibold text-gray-900 mt-2">
//                     {stat.value}
//                   </p>
//                   {stat.change && (
//                     <div className="flex items-center mt-2">
//                       <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//                       <span className="text-sm text-green-600">{stat.change}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className={`p-3 rounded-lg ${stat.color}`}>
//                   <stat.icon className="w-6 h-6" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Recent Users */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
//               <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                 View all
//               </button>
//             </div>
//             <div className="space-y-4">
//               {users.length > 0 ? users.map((userItem) => (
//                 <div key={userItem.user_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                       <Users className="w-5 h-5 text-blue-600" />
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
//                 <p className="text-gray-500 text-center py-4">No users found</p>
//               )}
//             </div>
//           </div>

//           {/* System Alerts */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">System Alerts</h2>
//             <div className="space-y-4">
//               <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//                 <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
//                 <div>
//                   <h3 className="text-sm font-medium text-yellow-800">Low Stock Alert</h3>
//                   <p className="text-sm text-yellow-700 mt-1">
//                     5 products are running low on inventory
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
//                 <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
//                 <div>
//                   <h3 className="text-sm font-medium text-blue-800">Server Status</h3>
//                   <p className="text-sm text-blue-700 mt-1">
//                     All systems operational - 99.9% uptime
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
//                 <Package className="w-5 h-5 text-green-600 mt-0.5" />
//                 <div>
//                   <h3 className="text-sm font-medium text-green-800">Orders</h3>
//                   <p className="text-sm text-green-700 mt-1">
//                     23 new orders processed today
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <button className="bg-white rounded-lg shadow-sm border p-4 text-left hover:shadow-md transition-shadow">
//               <Users className="w-8 h-8 text-blue-600 mb-2" />
//               <h3 className="font-medium text-gray-900">Manage Users</h3>
//               <p className="text-sm text-gray-600">Add, edit, or remove users</p>
//             </button>
//             <button className="bg-white rounded-lg shadow-sm border p-4 text-left hover:shadow-md transition-shadow">
//               <Package className="w-8 h-8 text-green-600 mb-2" />
//               <h3 className="font-medium text-gray-900">Inventory</h3>
//               <p className="text-sm text-gray-600">Manage product inventory</p>
//             </button>
//             <button className="bg-white rounded-lg shadow-sm border p-4 text-left hover:shadow-md transition-shadow">
//               <ShoppingCart className="w-8 h-8 text-purple-600 mb-2" />
//               <h3 className="font-medium text-gray-900">Orders</h3>
//               <p className="text-sm text-gray-600">View and manage orders</p>
//             </button>
//             <button className="bg-white rounded-lg shadow-sm border p-4 text-left hover:shadow-md transition-shadow">
//               <Activity className="w-8 h-8 text-orange-600 mb-2" />
//               <h3 className="font-medium text-gray-900">Reports</h3>
//               <p className="text-sm text-gray-600">Generate system reports</p>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, ShoppingCart, Package, TrendingUp, Activity, UserCheck, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    activeUsers: 0,
    totalOrders: 0
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [usersResponse, customersResponse, ordersResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/users/'),
        axios.get('http://localhost:5000/api/customers/users'),
        // Add orders endpoint when available
        // axios.get('http://localhost:5000/api/orders/')
        Promise.resolve({ data: [] }) // Placeholder for orders
      ]);

      const allUsers = usersResponse.data;
      const customers = customersResponse.data;
      const orders = ordersResponse.data;
      
      setUsers(allUsers.slice(0, 5)); // Show only recent 5 users
      setStats({
        totalUsers: allUsers.length,
        totalCustomers: customers.length,
        activeUsers: allUsers.filter(u => u.userStatus === 'active').length,
        totalOrders: orders.length || 156 // Fallback to hardcoded value
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600 bg-blue-100',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Customers',
      value: stats.totalCustomers,
      icon: UserCheck,
      color: 'text-green-600 bg-green-100',
      change: '+8%',
      changeType: 'increase'
    },
    {
      name: 'Active Users',
      value: stats.activeUsers,
      icon: Activity,
      color: 'text-purple-600 bg-purple-100',
      change: '+5%',
      changeType: 'increase'
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'text-orange-600 bg-orange-100',
      change: '+18%',
      changeType: 'increase'
    }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'customer':
        return 'bg-blue-100 text-blue-800';
      case 'inventory_manager':
        return 'bg-green-100 text-green-800';
      case 'customer_supporter':
        return 'bg-purple-100 text-purple-800';
      case 'deliver':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatRoleText = (role) => {
    return role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.firstName}! Here's your system overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{stat.change}</span>
                    </div>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
              <Link
                to="/users"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
              View all
             </Link>

            </div>
            <div className="space-y-4">
              {users.length > 0 ? users.map((userItem) => (
                <div key={userItem.user_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {userItem.firstName} {userItem.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{userItem.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(userItem.role)}`}>
                      {formatRoleText(userItem.role)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(userItem.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">No users found</p>
              )}
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Alerts</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Low Stock Alert</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    5 products are running low on inventory
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Server Status</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    All systems operational - 99.9% uptime
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Package className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Orders</h3>
                  <p className="text-sm text-green-700 mt-1">
                    23 new orders processed today
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-white rounded-lg shadow-sm border p-4 text-left hover:shadow-md transition-shadow">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">Manage Users</h3>
              <p className="text-sm text-gray-600">Add, edit, or remove users</p>
            </button>
            <button className="bg-white rounded-lg shadow-sm border p-4 text-left hover:shadow-md transition-shadow">
              <Package className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Inventory</h3>
              <p className="text-sm text-gray-600">Manage product inventory</p>
            </button>
            <button className="bg-white rounded-lg shadow-sm border p-4 text-left hover:shadow-md transition-shadow">
              <ShoppingCart className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">Orders</h3>
              <p className="text-sm text-gray-600">View and manage orders</p>
            </button>
            <button className="bg-white rounded-lg shadow-sm border p-4 text-left hover:shadow-md transition-shadow">
              <Activity className="w-8 h-8 text-orange-600 mb-2" />
              <h3 className="font-medium text-gray-900">Reports</h3>
              <p className="text-sm text-gray-600">Generate system reports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;