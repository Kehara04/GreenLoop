// import React from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { ShoppingBag, Package, Star, TrendingUp, Award } from 'lucide-react';

// const CustomerDashboard = () => {
//   const { user } = useAuth();

//   const getUserLevelColor = (level) => {
//     switch (level) {
//       case 'Bronze':
//         return 'text-orange-600 bg-orange-100';
//       case 'Silver':
//         return 'text-gray-600 bg-gray-100';
//       case 'Gold':
//         return 'text-yellow-600 bg-yellow-100';
//       case 'Platinum':
//         return 'text-purple-600 bg-purple-100';
//       default:
//         return 'text-gray-600 bg-gray-100';
//     }
//   };

//   const stats = [
//     {
//       name: 'Total Orders',
//       value: '12',
//       icon: ShoppingBag,
//       color: 'text-blue-600 bg-blue-100',
//       change: '+2.5%',
//       changeType: 'increase'
//     },
//     {
//       name: 'Delivered Orders',
//       value: '8',
//       icon: Package,
//       color: 'text-green-600 bg-green-100',
//       change: '+12%',
//       changeType: 'increase'
//     },
//     {
//       name: 'Loyalty Points',
//       value: user?.points || 0,
//       icon: Star,
//       color: 'text-yellow-600 bg-yellow-100',
//       change: '+25',
//       changeType: 'increase'
//     },
//     {
//       name: 'User Level',
//       value: user?.user_level || 'Bronze',
//       icon: Award,
//       color: getUserLevelColor(user?.user_level),
//       change: '',
//       changeType: 'neutral'
//     }
//   ];

//   const recentOrders = [
//     {
//       id: 'ORD-001',
//       product: 'Wireless Headphones',
//       status: 'Delivered',
//       date: '2024-08-20',
//       amount: '$199.99'
//     },
//     {
//       id: 'ORD-002',
//       product: 'Smart Watch',
//       status: 'In Transit',
//       date: '2024-08-22',
//       amount: '$299.99'
//     },
//     {
//       id: 'ORD-003',
//       product: 'Bluetooth Speaker',
//       status: 'Processing',
//       date: '2024-08-23',
//       amount: '$79.99'
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Delivered':
//         return 'bg-green-100 text-green-800';
//       case 'In Transit':
//         return 'bg-blue-100 text-blue-800';
//       case 'Processing':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Welcome back, {user?.firstName}!
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Here's what's happening with your account today.
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat) => (
//             <div key={stat.name} className="card p-6">
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
//           {/* Recent Orders */}
//           <div className="card p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
//               <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
//                 View all
//               </button>
//             </div>
//             <div className="space-y-4">
//               {recentOrders.map((order) => (
//                 <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex-1">
//                     <h3 className="font-medium text-gray-900">{order.product}</h3>
//                     <p className="text-sm text-gray-600">Order #{order.id}</p>
//                     <p className="text-sm text-gray-500">{order.date}</p>
//                   </div>
//                   <div className="text-right">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                     <p className="text-sm font-medium text-gray-900 mt-1">{order.amount}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Account Overview */}
//           <div className="card p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Overview</h2>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Account Status</span>
//                 <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                   user?.userStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                 }`}>
//                   {user?.userStatus || 'Active'}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Member Since</span>
//                 <span className="font-medium text-gray-900">
//                   {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Email</span>
//                 <span className="font-medium text-gray-900">{user?.email}</span>
//               </div>
//               <div className="flex items-center justify-between py-3">
//                 <span className="text-gray-600">Phone</span>
//                 <span className="font-medium text-gray-900">{user?.phone || 'Not provided'}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <button className="card p-4 text-left hover:shadow-md transition-shadow">
//               <ShoppingBag className="w-8 h-8 text-primary-600 mb-2" />
//               <h3 className="font-medium text-gray-900">Browse Products</h3>
//               <p className="text-sm text-gray-600">Discover our latest products and deals</p>
//             </button>
//             <button className="card p-4 text-left hover:shadow-md transition-shadow">
//               <Package className="w-8 h-8 text-green-600 mb-2" />
//               <h3 className="font-medium text-gray-900">Track Orders</h3>
//               <p className="text-sm text-gray-600">Check the status of your recent orders</p>
//             </button>
//             <button className="card p-4 text-left hover:shadow-md transition-shadow">
//               <Star className="w-8 h-8 text-yellow-600 mb-2" />
//               <h3 className="font-medium text-gray-900">Redeem Points</h3>
//               <p className="text-sm text-gray-600">Use your loyalty points for discounts</p>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingBag, Package, Star, TrendingUp, Award } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();

  const getUserLevelColor = (level) => {
    switch (level) {
      case 'Bronze':
        return 'text-orange-600 bg-orange-100';
      case 'Silver':
        return 'text-gray-600 bg-gray-100';
      case 'Gold':
        return 'text-yellow-600 bg-yellow-100';
      case 'Platinum':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const stats = [
    {
      name: 'Total Orders',
      value: '12',
      icon: ShoppingBag,
      color: 'text-blue-600 bg-blue-100',
      change: '+2.5%',
      changeType: 'increase'
    },
    {
      name: 'Delivered Orders',
      value: '8',
      icon: Package,
      color: 'text-green-600 bg-green-100',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Loyalty Points',
      value: user?.points || 0,
      icon: Star,
      color: 'text-yellow-600 bg-yellow-100',
      change: '+25',
      changeType: 'increase'
    },
    {
      name: 'User Level',
      value: user?.user_level || 'Bronze',
      icon: Award,
      color: getUserLevelColor(user?.user_level),
      change: '',
      changeType: 'neutral'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      product: 'Wireless Headphones',
      status: 'Delivered',
      date: '2024-08-20',
      amount: '$199.99'
    },
    {
      id: 'ORD-002',
      product: 'Smart Watch',
      status: 'In Transit',
      date: '2024-08-22',
      amount: '$299.99'
    },
    {
      id: 'ORD-003',
      product: 'Bluetooth Speaker',
      status: 'Processing',
      date: '2024-08-23',
      amount: '$79.99'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="card p-6">
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
          {/* Recent Orders */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{order.product}</h3>
                    <p className="text-sm text-gray-600">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Overview */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Account Status</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user?.userStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user?.userStatus || 'Active'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium text-gray-900">{user?.phone || 'Not provided'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="card p-4 text-left hover:shadow-md transition-shadow">
              <ShoppingBag className="w-8 h-8 text-primary-600 mb-2" />
              <h3 className="font-medium text-gray-900">Browse Products</h3>
              <p className="text-sm text-gray-600">Discover our latest products and deals</p>
            </button>
            <button className="card p-4 text-left hover:shadow-md transition-shadow">
              <Package className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Track Orders</h3>
              <p className="text-sm text-gray-600">Check the status of your recent orders</p>
            </button>
            <button className="card p-4 text-left hover:shadow-md transition-shadow">
              <Star className="w-8 h-8 text-yellow-600 mb-2" />
              <h3 className="font-medium text-gray-900">Redeem Points</h3>
              <p className="text-sm text-gray-600">Use your loyalty points for discounts</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;