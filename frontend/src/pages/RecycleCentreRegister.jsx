// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-toastify';
// import { Eye, EyeOff, Building, Mail, Lock, Phone, MapPin, Globe, Package } from 'lucide-react';
// import img3 from '../assets/background.jpg';

// const RecycleCentreRegister = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     contactNumber: '',
//     address: '',
//     website: '',
//     lat: '',
//     lng: '',
//     acceptedItems: []
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);

//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const recycleItems = [
//     'Plastic', 'Paper', 'Glass', 'Metal', 'Electronics', 
//     'Batteries', 'Textiles', 'Organic Waste', 'Cardboard', 
//     'Aluminum Cans', 'Newspapers', 'Books'
//   ];

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleItemToggle = (item) => {
//     const updatedItems = selectedItems.includes(item)
//       ? selectedItems.filter(i => i !== item)
//       : [...selectedItems, item];
    
//     setSelectedItems(updatedItems);
//     setFormData({
//       ...formData,
//       acceptedItems: updatedItems
//     });
//   };

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters long');
//       return false;
//     }
//     if (!formData.lat || !formData.lng) {
//       toast.error('Please provide location coordinates');
//       return false;
//     }
//     if (isNaN(formData.lat) || isNaN(formData.lng)) {
//       toast.error('Location coordinates must be valid numbers');
//       return false;
//     }
//     if (selectedItems.length === 0) {
//       toast.error('Please select at least one accepted item type');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setLoading(true);

//     try {
//       const result = await register(formData, 'recycleCentre');
      
//       if (result.success) {
//         toast.success(result.message);
//         navigate('/login', { 
//           state: { message: 'Registration successful! Please log in.' }
//         });
//       } else {
//         toast.error(result.message);
//       }
//     } catch (error) {
//       toast.error('An unexpected error occurred');
//       console.error('Registration error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div 
//       className="min-h-screen flex items-center justify-start py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: `url(${img3})`,
//       }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
//       <div className="relative z-10 max-w-2xl w-full ml-8 lg:ml-16">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg" style={{ color: '#184325', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Green Loop</h1>
//           <h2 className="text-2xl font-semibold text-white mb-2 drop-shadow-lg">Register Your Recycle Centre</h2>
//           <p className="text-gray-100 drop-shadow-lg">Join our recycling network today</p>
//         </div>

//         <div className="card p-8 bg-white bg-opacity-95 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Centre Name */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Centre Name *
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Building className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="input-field pl-10"
//                   placeholder="Recycle centre name"
//                 />
//               </div>
//             </div>

//             {/* Email and Contact Number */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="input-field pl-10"
//                     placeholder="centre@email.com"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
//                   Contact Number *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Phone className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="contactNumber"
//                     name="contactNumber"
//                     type="tel"
//                     required
//                     value={formData.contactNumber}
//                     onChange={handleChange}
//                     className="input-field pl-10"
//                     placeholder="Phone number"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Address */}
//             <div>
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//                 Address *
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <MapPin className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="address"
//                   name="address"
//                   type="text"
//                   required
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="input-field pl-10"
//                   placeholder="Full address"
//                 />
//               </div>
//             </div>

//             {/* Website */}
//             <div>
//               <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
//                 Website (Optional)
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Globe className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="website"
//                   name="website"
//                   type="url"
//                   value={formData.website}
//                   onChange={handleChange}
//                   className="input-field pl-10"
//                   placeholder="https://yourwebsite.com"
//                 />
//               </div>
//             </div>

//             {/* Location Coordinates */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-1">
//                   Latitude *
//                 </label>
//                 <input
//                   id="lat"
//                   name="lat"
//                   type="number"
//                   step="any"
//                   required
//                   value={formData.lat}
//                   onChange={handleChange}
//                   className="input-field"
//                   placeholder="6.0329"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="lng" className="block text-sm font-medium text-gray-700 mb-1">
//                   Longitude *
//                 </label>
//                 <input
//                   id="lng"
//                   name="lng"
//                   type="number"
//                   step="any"
//                   required
//                   value={formData.lng}
//                   onChange={handleChange}
//                   className="input-field"
//                   placeholder="80.2168"
//                 />
//               </div>
//             </div>

//             {/* Accepted Items */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 <Package className="inline h-5 w-5 mr-2" />
//                 Accepted Items *
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-3">
//                 {recycleItems.map((item) => (
//                   <label key={item} className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={selectedItems.includes(item)}
//                       onChange={() => handleItemToggle(item)}
//                       className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                     />
//                     <span className="text-sm text-gray-700">{item}</span>
//                   </label>
//                 ))}
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 Selected: {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}
//               </p>
//             </div>

//             {/* Password Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                   Password *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="input-field pl-10 pr-10"
//                     placeholder="Password"
//                     minLength="6"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                   Confirm Password *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="input-field pl-10 pr-10"
//                     placeholder="Confirm password"
//                     minLength="6"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//               style={{ 
//                 backgroundColor: '#184325',
//                 borderColor: '#184325'
//               }}
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                   Creating account...
//                 </div>
//               ) : (
//                 'Register Recycle Centre'
//               )}
//             </button>
//           </form>

//           {/* Footer Links */}
//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Already have an account?</span>
//               </div>
//             </div>

//             <div className="mt-6 space-y-3">
//               <Link
//                 to="/login"
//                 className="w-full btn-secondary flex justify-center"
//                 style={{
//                   color: '#184325',
//                   borderColor: '#184325'
//                 }}
//               >
//                 Sign in as Recycle Centre
//               </Link>
//               <Link
//                 to="/register"
//                 className="w-full btn-secondary flex justify-center"
//                 style={{
//                   color: '#184325',
//                   borderColor: '#184325'
//                 }}
//               >
//                 Register as Customer
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecycleCentreRegister;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Building, Mail, Lock, Phone, MapPin, Globe, Package } from 'lucide-react';
import img3 from '../assets/background.jpg';

const RecycleCentreRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    address: '',
    website: '',
    district: '',
    city: '',
    acceptedItems: []
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const { register } = useAuth();
  const navigate = useNavigate();

  const recycleItems = [
    'Plastic', 'Paper', 'Glass', 'Metal', 'Electronics', 
    'Batteries', 'Textiles', 'Organic Waste', 'Cardboard', 
    'Aluminum Cans', 'Newspapers', 'Books'
  ];

  const districts = [
    'Ampara','Anuradhapura','Badulla','Batticaloa','Colombo',
    'Galle','Gampaha','Hambantota','Jaffna','Kalutara',
    'Kandy','Kegalle','Kilinochchi','Kurunegala','Mannar',
    'Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya',
    'Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleItemToggle = (item) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item];
    
    setSelectedItems(updatedItems);
    setFormData({
      ...formData,
      acceptedItems: updatedItems
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (!formData.district || !formData.city) {
      toast.error('Please provide both district and city');
      return false;
    }
    if (selectedItems.length === 0) {
      toast.error('Please select at least one accepted item type');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const payload = {
        ...formData,
        location: {
          district: formData.district,
          city: formData.city
        }
      };

      const result = await register(payload, 'recycleCentre');
      
      if (result.success) {
        toast.success(result.message);
        navigate('/login', { 
          state: { message: 'Registration successful! Please log in.' }
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-start py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${img3})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative z-10 max-w-2xl w-full ml-8 lg:ml-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg" style={{ color: '#184325', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Green Loop</h1>
          <h2 className="text-2xl font-semibold text-white mb-2 drop-shadow-lg">Register Your Recycle Centre</h2>
          <p className="text-gray-100 drop-shadow-lg">Join our recycling network today</p>
        </div>

        <div className="card p-8 bg-white bg-opacity-95 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Centre Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Centre Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Recycle centre name"
                />
              </div>
            </div>

            {/* Email and Contact Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="centre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Full address"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            {/* Location (District + City) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  District *
                </label>
                <select
                  id="district"
                  name="district"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select District</option>
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your city"
                />
              </div>
            </div>

            {/* Accepted Items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Package className="inline h-5 w-5 mr-2" />
                Accepted Items *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-3">
                {recycleItems.map((item) => (
                  <label key={item} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      onChange={() => handleItemToggle(item)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Selected: {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field pl-10 pr-10"
                    placeholder="Password"
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field pl-10 pr-10"
                    placeholder="Confirm password"
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ 
                backgroundColor: '#184325',
                borderColor: '#184325'
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Register Recycle Centre'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                to="/login"
                className="w-full btn-secondary flex justify-center"
                style={{
                  color: '#184325',
                  borderColor: '#184325'
                }}
              >
                Sign in as Recycle Centre
              </Link>
              <Link
                to="/register"
                className="w-full btn-secondary flex justify-center"
                style={{
                  color: '#184325',
                  borderColor: '#184325'
                }}
              >
                Register as Customer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecycleCentreRegister;
