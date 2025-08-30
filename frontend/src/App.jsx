// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Home from './components/home'

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}
//           <Route path="/" element={<Home />} /> {/* Added root path */}
//           {/* <Route path="/home" element={<Home />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Navbar from './components/NavBar';

// // Auth Pages
// import Login from './pages/Login';
// import Register from './pages/Register';

// // Dashboard Pages
// import AdminDashboard from './pages/dashboards/AdminDashboard';
// import CustomerDashboard from './pages/dashboards/CustomerDashboard';
// import RecycleCentreDashboard from './pages/dashboards/RecycleCentreDashboard';


// // Other Pages
// import Profile from './pages/Profile';
// import UsersManagement from './pages/UsersManagement';

// //Home page
// import Home from './components/home';

// // Utility Pages
// const Unauthorized = () => (
//   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//     <div className="text-center">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
//       <p className="text-xl text-gray-600 mb-8">You don't have permission to access this page.</p>
//       <button 
//         onClick={() => window.history.back()} 
//         className="btn-primary"
//       >
//         Go Back
//       </button>
//     </div>
//   </div>
// );

// const NotFound = () => (
//   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//     <div className="text-center">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
//       <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
//       <button 
//         onClick={() => window.history.back()} 
//         className="btn-primary"
//       >
//         Go Back
//       </button>
//     </div>
//   </div>
// );

// // Create other dashboard components
// const InventoryDashboard = () => (
//   <div className="min-h-screen bg-gray-50 py-8">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Inventory Management Dashboard</h1>
//       <div className="card p-8 text-center">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Welcome to Inventory Management</h2>
//         <p className="text-gray-600">Manage your inventory, track stock levels, and monitor products.</p>
//       </div>
//     </div>
//   </div>
// );

// const SupportDashboard = () => (
//   <div className="min-h-screen bg-gray-50 py-8">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Support Dashboard</h1>
//       <div className="card p-8 text-center">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Welcome to Customer Support</h2>
//         <p className="text-gray-600">Handle customer inquiries, manage tickets, and provide assistance.</p>
//       </div>
//     </div>
//   </div>
// );

// const DeliveryDashboard = () => (
//   <div className="min-h-screen bg-gray-50 py-8">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Delivery Dashboard</h1>
//       <div className="card p-8 text-center">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Welcome to Delivery Management</h2>
//         <p className="text-gray-600">Track deliveries, update delivery status, and manage routes.</p>
//       </div>
//     </div>
//   </div>
// );

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <Navbar />
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/unauthorized" element={<Unauthorized />} />

//             {/* Protected Routes */}
//             <Route path="/" element={
//               <ProtectedRoute>
//                 <Navigate to="/dashboard" replace />
//               </ProtectedRoute>
//             } />

//             {/* Generic Dashboard Route */}
//             <Route path="/dashboard" element={
//               <ProtectedRoute>
//                 <DashboardRedirect />
//               </ProtectedRoute>
//             } />

//             {/* Role-specific Dashboards */}
//             <Route path="/admin-dashboard" element={
//               <ProtectedRoute roles={['admin']}>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } />

//             <Route path="/customer-dashboard" element={
//               <ProtectedRoute roles={['customer']}>
//                 <CustomerDashboard />
//               </ProtectedRoute>
//             } />

//             <Route path="/inventory-dashboard" element={
//               <ProtectedRoute roles={['inventory_manager']}>
//                 <InventoryDashboard />
//               </ProtectedRoute>
//             } />

//             <Route path="/support-dashboard" element={
//               <ProtectedRoute roles={['customer_supporter']}>
//                 <SupportDashboard />
//               </ProtectedRoute>
//             } />

//             <Route path="/deliver-dashboard" element={
//               <ProtectedRoute roles={['deliver']}>
//                 <DeliveryDashboard />
//               </ProtectedRoute>
//             } />

// <Route path="/recycle-centre-dashboard" element={
//   <ProtectedRoute roles={['recycleCentre']}>
//     <RecycleCentreDashboard />
//   </ProtectedRoute>
// } />

            
//             {/* Other Protected Routes */}
//             <Route path="/profile" element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             } />

//             <Route path="/users" element={
//               <ProtectedRoute roles={['admin']}>
//                 <UsersManagement />
//               </ProtectedRoute>
//             } />

//             <Route path="/customers" element={
//               <ProtectedRoute roles={['admin']}>
//                 <UsersManagement />
//               </ProtectedRoute>
//             } />

//             {/* Catch all route */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>

//           {/* Toast Notifications */}
//           <ToastContainer
//             position="top-right"
//             autoClose={5000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="light"
//           />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// // Component to redirect to appropriate dashboard based on user role
// const DashboardRedirect = () => {
//   const { user } = useAuth();
  
//   if (!user) return <Navigate to="/login" replace />;
  
//   switch (user.role) {
//     case 'admin':
//       return <Navigate to="/admin-dashboard" replace />;
//     case 'customer':
//       return <Navigate to="/customer-dashboard" replace />;
//     case 'inventory_manager':
//       return <Navigate to="/inventory-dashboard" replace />;
//     case 'customer_supporter':
//       return <Navigate to="/support-dashboard" replace />;
//     case 'deliver':
//       return <Navigate to="/deliver-dashboard" replace />;
//     case 'recycleCentre':   // ✅ new role
//       return <Navigate to="/recycle-centre-dashboard" replace />;
//     default:
//       return <Navigate to="/customer-dashboard" replace />;
//   }
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/NavBar';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import RecycleCentreRegister from './pages/RecycleCentreRegister';

// Dashboard Pages
import AdminDashboard from './pages/dashboards/AdminDashboard';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import RecycleCentreDashboard from './pages/dashboards/RecycleCentreDashboard';

// Other Pages
import Profile from './pages/Profile';
import UsersManagement from './pages/UsersManagement';

// Home Page
import Home from './components/home';

// Utility Pages
const Unauthorized = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
      <p className="text-xl text-gray-600 mb-8">You don't have permission to access this page.</p>
      <button 
        onClick={() => window.history.back()} 
        className="btn-primary"
      >
        Go Back
      </button>
    </div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <button 
        onClick={() => window.history.back()} 
        className="btn-primary"
      >
        Go Back
      </button>
    </div>
  </div>
);

// Component to redirect to appropriate dashboard based on user role
const DashboardRedirect = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin-dashboard" replace />;
    case 'customer':
      return <Navigate to="/customer-dashboard" replace />;
    case 'recycleCentre':
      return <Navigate to="/recycle-centre-dashboard" replace />;
    default:
      return <Navigate to="/customer-dashboard" replace />;
  }
};

// Main content component to enable using hooks like useLocation
const AppContent = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/register-recycle-centre'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-recycle-centre" element={<RecycleCentreRegister />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        } />

        {/* Generic Dashboard Route */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardRedirect />
          </ProtectedRoute>
        } />

        {/* Role-specific Dashboards */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/customer-dashboard" element={
          <ProtectedRoute roles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        } />

        <Route path="/recycle-centre-dashboard" element={
          <ProtectedRoute roles={['recycleCentre']}>
            <RecycleCentreDashboard />
          </ProtectedRoute>
        } />

        {/* Other Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/users" element={
          <ProtectedRoute roles={['admin']}>
            <UsersManagement />
          </ProtectedRoute>
        } />

        <Route path="/customers" element={
          <ProtectedRoute roles={['admin']}>
            <UsersManagement />
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

