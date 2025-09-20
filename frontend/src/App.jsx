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

// NEW: Recycle System Pages
import RecycleForm from './components/wasteManagement/pages/RecycleForm';
import Reuse from './components/wasteManagement/pages/reuse';

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

// Main content component
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

// In your Routes section, replace the recycle-form route with:
<Route path="/recycle-form" element={
  <ProtectedRoute roles={['customer', 'admin']}>
    <RecycleForm />
  </ProtectedRoute>
} />

<Route path="/recycle-form/summary" element={
  <ProtectedRoute roles={['customer', 'admin']}>
    <RecycleForm />
  </ProtectedRoute>
} />

        

        <Route path="/reuse" element={
          <protectedROute roles={['customer', 'admin']}>
            <Reuse />
         
          </protectedROute>
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