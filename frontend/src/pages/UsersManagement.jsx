// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Users, Search, Plus, Edit, Trash2, Filter } from 'lucide-react';

// const UsersManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const [showModal, setShowModal] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     let filtered = users;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(user => 
//         user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by role
//     if (filterRole !== 'all') {
//       filtered = filtered.filter(user => user.role === filterRole);
//     }

//     setFilteredUsers(filtered);
//   }, [users, searchTerm, filterRole]);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:5000/api/users/');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       toast.error('Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:5000/api/users/deleteuser?id=${userId}`);
//         toast.success('User deleted successfully');
//         fetchUsers();
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         toast.error('Failed to delete user');
//       }
//     }
//   };

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

//   const getStatusColor = (status) => {
//     return status === 'active' 
//       ? 'bg-green-100 text-green-800' 
//       : 'bg-red-100 text-red-800';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center">
//                 <Users className="w-8 h-8 mr-3 text-primary-600" />
//                 Users Management
//               </h1>
//               <p className="text-gray-600 mt-2">Manage system users and their roles</p>
//             </div>
//             <button 
//               onClick={() => setShowModal(true)}
//               className="btn-primary flex items-center"
//             >
//               <Plus className="w-5 h-5 mr-2" />
//               Add User
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="card p-6 mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                 />
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <Filter className="w-5 h-5 text-gray-400" />
//                 <select
//                   value={filterRole}
//                   onChange={(e) => setFilterRole(e.target.value)}
//                   className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                 >
//                   <option value="all">All Roles</option>
//                   <option value="admin">Admin</option>
//                   <option value="customer">Customer</option>
//                   <option value="inventory_manager">Inventory Manager</option>
//                   <option value="customer_supporter">Customer Support</option>
//                   <option value="deliver">Delivery</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="text-sm text-gray-500">
//               Showing {filteredUsers.length} of {users.length} users
//             </div>
//           </div>
//         </div>

//         {/* Users Table */}
//         <div className="card overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     User
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Joined
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredUsers.map((user) => (
//                   <tr key={user.user_id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
//                           <Users className="w-5 h-5 text-primary-600" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {user.firstName} {user.lastName}
//                           </div>
//                           <div className="text-sm text-gray-500">ID: {user.user_id}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{user.email}</div>
//                       <div className="text-sm text-gray-500">{user.phone || 'N/A'}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
//                         {user.role.replace('_', ' ')}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.userStatus)}`}>
//                         {user.userStatus}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => {
//                             setEditingUser(user);
//                             setShowModal(true);
//                           }}
//                           className="text-primary-600 hover:text-primary-900"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteUser(user.user_id)}
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {filteredUsers.length === 0 && (
//             <div className="text-center py-12">
//               <Users className="mx-auto h-12 w-12 text-gray-400" />
//               <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 {searchTerm || filterRole !== 'all' 
//                   ? 'Try adjusting your search or filters' 
//                   : 'Get started by adding a new user'
//                 }
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Statistics */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="card p-4">
//             <div className="text-2xl font-bold text-primary-600">
//               {users.filter(u => u.role === 'admin').length}
//             </div>
//             <div className="text-sm text-gray-600">Admins</div>
//           </div>
//           <div className="card p-4">
//             <div className="text-2xl font-bold text-blue-600">
//               {users.filter(u => u.role === 'customer').length}
//             </div>
//             <div className="text-sm text-gray-600">Customers</div>
//           </div>
//           <div className="card p-4">
//             <div className="text-2xl font-bold text-green-600">
//               {users.filter(u => u.userStatus === 'active').length}
//             </div>
//             <div className="text-sm text-gray-600">Active Users</div>
//           </div>
//           <div className="card p-4">
//             <div className="text-2xl font-bold text-gray-600">
//               {users.length}
//             </div>
//             <div className="text-sm text-gray-600">Total Users</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersManagement;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Users, Search, Plus, Edit, Trash2, Filter } from 'lucide-react';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by role
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/deleteuser?id=${userId}`);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

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

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="w-8 h-8 mr-3 text-primary-600" />
                Users Management
              </h1>
              <p className="text-gray-600 mt-2">Manage system users and their roles</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                  <option value="inventory_manager">Inventory Manager</option>
                  <option value="customer_supporter">Customer Support</option>
                  <option value="deliver">Delivery</option>
                </select>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">ID: {user.user_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.userStatus)}`}>
                        {user.userStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowModal(true);
                          }}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.user_id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterRole !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Get started by adding a new user'
                }
              </p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-4">
            <div className="text-2xl font-bold text-primary-600">
              {users.filter(u => u.role === 'admin').length}
            </div>
            <div className="text-sm text-gray-600">Admins</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-bold text-blue-600">
              {users.filter(u => u.role === 'customer').length}
            </div>
            <div className="text-sm text-gray-600">Customers</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.userStatus === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-bold text-gray-600">
              {users.length}
            </div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;