// // import React from 'react';
// // import { useAuth } from '../../contexts/AuthContext';
// // import img2 from '../../assets/background1.png';
// // import { 
// //   Recycle, 
// //   Leaf, 
// //   Trophy, 
// //   TrendingUp, 
// //   Calendar,
// //   Target,
// //   Award,
// //   BarChart3,
// //   TreePine,
// //   Droplets,
// //   Wind,
// //   Zap
// // } from 'lucide-react';

// // const CustomerDashboard = () => {
// //   const { user } = useAuth();

// //   const getUserLevelColor = (level) => {
// //     switch (level) {
// //       case 'Eco Starter':
// //         return 'text-green-600 bg-green-100';
// //       case 'Green Guardian':
// //         return 'text-emerald-600 bg-emerald-100';
// //       case 'Sustainability Champion':
// //         return 'text-teal-600 bg-teal-100';
// //       case 'Planet Protector':
// //         return 'text-blue-600 bg-blue-100';
// //       default:
// //         return 'text-green-600 bg-green-100';
// //     }
// //   };

// //   const stats = [
// //     {
// //       name: 'Eco Points',
// //       value: user?.points || 1250,
// //       icon: Leaf,
// //       color: 'text-green-600 bg-green-100',
// //       change: '+180',
// //       changeType: 'increase',
// //       unit: 'pts'
// //     },
// //     {
// //       name: 'Items Recycled',
// //       value: '47',
// //       icon: Recycle,
// //       color: 'text-green-600 bg-green-100',
// //       change: '+8',
// //       changeType: 'increase',
// //       unit: 'items'
// //     },
// //     {
// //       name: 'CO₂ Saved',
// //       value: '125',
// //       icon: Wind,
// //       color: 'text-green-600 bg-green-100',
// //       change: '+15kg',
// //       changeType: 'increase',
// //       unit: 'kg'
// //     },
// //     {
// //       name: 'Eco Level',
// //       value:  'Beginner Recycler',
// //       icon: Award,
// //       color: 'text-green-600 bg-green-100',
// //       change: '',
// //       changeType: 'neutral'
// //     }
// //   ];

// //   const recentActivities = [
// //     {
// //       id: 'REC-001',
// //       activity: 'Plastic Bottles Recycled',
// //       points: '+50 pts',
// //       date: '2024-08-26',
// //       type: 'recycle',
// //       icon: Recycle,
// //       impact: '2.5kg CO₂ saved'
// //     },
// //     {
// //       id: 'EVT-002',
// //       activity: 'Community Clean-up Event',
// //       points: '+100 pts',
// //       date: '2024-08-24',
// //       type: 'event',
// //       icon: TreePine,
// //       impact: '5 hours volunteered'
// //     },
// //     {
// //       id: 'REC-003',
// //       activity: 'E-waste Drop-off',
// //       points: '+75 pts',
// //       date: '2024-08-22',
// //       type: 'recycle',
// //       icon: Zap,
// //       impact: '3 devices recycled'
// //     }
// //   ];

// //   const badges = [
// //     {
// //       name: 'Earth Champion',
// //       description: '100+ points',
// //       earned: true,
// //       icon: Recycle,
// //       color: 'bg-green-500'
// //     },
// //     {
// //       name: 'Eco Star',
// //       description: '50 points',
// //       earned: true,
// //       icon: Calendar,
// //       color: 'bg-emerald-500'
// //     },
// //     {
// //       name: 'Eco Learner',
// //       description: '20 points',
// //       earned: true,
// //       icon: Wind,
// //       color: 'bg-teal-500'
// //     },
// //     {
// //       name: 'Beginner Recycler',
// //       description: 'Just started',
// //       earned: false,
// //       icon: Droplets,
// //       color: 'bg-gray-500'
// //     }
// //   ];

// //   const upcomingEvents = [
// //     {
// //       id: 'evt-1',
// //       title: 'Beach Cleanup Drive',
// //       date: '2024-09-05',
// //       time: '08:00 AM',
// //       location: 'Negombo Beach',
// //       points: '150 pts',
// //       participants: 45
// //     },
// //     {
// //       id: 'evt-2',
// //       title: 'Urban Garden Workshop',
// //       date: '2024-09-12',
// //       time: '02:00 PM',
// //       location: 'Colombo City Center',
// //       points: '100 pts',
// //       participants: 28
// //     },
// //     {
// //       id: 'evt-3',
// //       title: 'E-waste Collection Day',
// //       date: '2024-09-20',
// //       time: '10:00 AM',
// //       location: 'Independence Square',
// //       points: '200 pts',
// //       participants: 67
// //     }
// //   ];

// //   const getActivityIcon = (type) => {
// //     switch (type) {
// //       case 'recycle':
// //         return 'bg-green-500 text-white shadow-lg';
// //       case 'event':
// //         return 'bg-emerald-500 text-white shadow-lg';
// //       default:
// //         return 'bg-green-500 text-white shadow-lg';
// //     }
// //   };

// //   const monthlyImpact = [
// //     { month: 'May', co2: 85, items: 32, points: 920 },
// //     { month: 'Jun', co2: 95, items: 38, points: 1080 },
// //     { month: 'Jul', co2: 110, items: 41, points: 1150 },
// //     { month: 'Aug', co2: 125, items: 47, points: 1250 }
// //   ];

// //   return (
// //     <div 
// //       className="min-h-screen relative overflow-hidden"
// //       style={{
// //         backgroundImage: `url(${img2})`,
// //         backgroundSize: 'cover',
// //         backgroundPosition: 'center',
// //         backgroundRepeat: 'no-repeat',
// //         backgroundAttachment: 'fixed'
// //       }}
// //     >
// //       {/* Dark overlay for better readability */}
// //       <div className="absolute inset-0 bg-black bg-opacity-40"></div>

// //       {/* Custom CSS for floating animations */}
// //       <style jsx>{`
// //         /* Floating eco shapes */
// //         .floating { animation: float 6s ease-in-out infinite; }
// //         .floating:nth-child(odd) { animation-delay: -2s; }
// //         .floating:nth-child(even) { animation-delay: -4s; }
// //         @keyframes float {
// //           0%,100% { transform: translateY(0px); }
// //           50% { transform: translateY(-12px); }
// //         }
// //       `}</style>

// //       {/* Decorative floating elements */}
// //       <div className="absolute top-4 left-4 w-16 h-16 bg-green-300 rounded-full opacity-10 floating"></div>
// //       <div className="absolute top-12 right-8 w-8 h-8 bg-green-200 rounded-full opacity-15 floating"></div>
// //       <div className="absolute bottom-8 left-12 w-12 h-12 bg-green-300 rounded-full opacity-10 floating"></div>
// //       <div className="absolute bottom-4 right-16 w-6 h-6 bg-green-200 rounded-full opacity-20 floating"></div>

// //       {/* Background SVG patterns */}
// //       <svg className="absolute top-10 left-10 w-40 h-40 text-green-700 opacity-5 floating" fill="currentColor" viewBox="0 0 24 24">
// //         <path d="M12 2C8 6 2 9 2 15a10 10 0 0020 0c0-6-6-9-10-13z" />
// //       </svg>
// //       <svg className="absolute bottom-10 right-20 w-56 h-56 text-green-600 opacity-5 floating" fill="currentColor" viewBox="0 0 24 24">
// //         <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
// //       </svg>

// //       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative z-10">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <h1 className="text-4xl font-bold text-white flex items-center gap-3 drop-shadow-lg">
// //             <Leaf className="text-green-300" />
// //             Welcome back, {user?.firstName}!
// //           </h1>
// //           <p className="text-green-100 mt-2 text-lg drop-shadow-sm">
// //             Your environmental impact journey continues. Together, we're making a difference! 🌱
// //           </p>
// //         </div>

// //         {/* Stats Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //           {stats.map((stat) => (
// //             <div key={stat.name} className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 hover:shadow-2xl hover:bg-white transition-all duration-300 hover:scale-105">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.name}</p>
// //                   <div className="flex items-baseline gap-1">
// //                     <p className="text-3xl font-bold text-gray-900 mt-2">
// //                       {stat.value}
// //                     </p>
// //                     {stat.unit && (
// //                       <span className="text-sm text-gray-600 font-medium">{stat.unit}</span>
// //                     )}
// //                   </div>
// //                   {stat.change && (
// //                     <div className="flex items-center mt-2">
// //                       <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
// //                       <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
// //                     </div>
// //                   )}
// //                 </div>
// //                 <div className="p-3 rounded-xl bg-green-500 shadow-lg">
// //                   <stat.icon className="w-8 h-8 text-white" />
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
// //           {/* Recent Activities */}
// //           <div className="lg:col-span-2">
// //             <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
// //               <div className="flex items-center justify-between mb-6">
// //                 <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
// //                   <BarChart3 className="text-green-600" />
// //                   Recent Eco Activities
// //                 </h2>
// //                 <button className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors px-3 py-1 rounded-md hover:bg-green-50">
// //                   View all
// //                 </button>
// //               </div>
// //               <div className="space-y-4">
// //                 {recentActivities.map((activity) => (
// //                   <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50/80 rounded-lg border border-gray-200 hover:bg-gray-100/80 transition-all duration-200">
// //                     <div className="flex items-center gap-4">
// //                       <div className={`p-3 rounded-lg ${getActivityIcon(activity.type)}`}>
// //                         <activity.icon className="w-5 h-5" />
// //                       </div>
// //                       <div>
// //                         <h3 className="font-semibold text-gray-900">{activity.activity}</h3>
// //                         <p className="text-sm text-gray-600 font-medium">{activity.date}</p>
// //                         <p className="text-sm text-green-700 font-semibold">{activity.impact}</p>
// //                       </div>
// //                     </div>
// //                     <div className="text-right">
// //                       <span className="inline-flex px-4 py-2 text-sm font-bold rounded-full bg-green-500 text-white shadow-lg">
// //                         {activity.points}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Badges Earned */}
// //           <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
// //             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
// //               <Trophy className="text-yellow-500" />
// //               Eco Badges
// //             </h2>
// //             <div className="grid grid-cols-2 gap-4">
// //               {badges.map((badge) => (
// //                 <div key={badge.name} className={`p-4 rounded-lg border-2 transition-all duration-300 ${
// //                   badge.earned 
// //                     ? 'border-green-400 bg-green-50 hover:shadow-lg hover:bg-green-100' 
// //                     : 'border-gray-300 bg-gray-100 opacity-70'
// //                 }`}>
// //                   <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${badge.color} shadow-md`}>
// //                     <badge.icon className="w-5 h-5 text-white" />
// //                   </div>
// //                   <h3 className={`font-semibold text-sm mb-1 ${
// //                     badge.earned ? 'text-gray-900' : 'text-gray-500'
// //                   }`}>
// //                     {badge.name}
// //                   </h3>
// //                   <p className={`text-xs ${
// //                     badge.earned ? 'text-gray-700' : 'text-gray-500'
// //                   }`}>
// //                     {badge.description}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* Monthly Analytics */}
// //           <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
// //             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
// //               <Target className="text-green-600" />
// //               Monthly Impact Analytics
// //             </h2>
// //             <div className="space-y-4">
// //               {monthlyImpact.map((month) => (
// //                 <div key={month.month} className="border-2 border-green-200 rounded-lg p-5 bg-green-50/70 hover:bg-green-100/70 transition-colors">
// //                   <div className="flex items-center justify-between mb-3">
// //                     <h3 className="font-bold text-gray-900 text-lg">{month.month} 2024</h3>
// //                     <span className="text-sm font-bold text-green-700 bg-green-200 px-3 py-1 rounded-full">{month.points} pts</span>
// //                   </div>
// //                   <div className="grid grid-cols-3 gap-4 text-sm">
// //                     <div className="text-center">
// //                       <p className="text-gray-600 font-medium">CO₂ Saved</p>
// //                       <p className="font-bold text-green-700 text-lg">{month.co2}kg</p>
// //                     </div>
// //                     <div className="text-center">
// //                       <p className="text-gray-600 font-medium">Items</p>
// //                       <p className="font-bold text-green-700 text-lg">{month.items}</p>
// //                     </div>
// //                     <div className="text-center">
// //                       <p className="text-gray-600 font-medium">Growth</p>
// //                       <p className="font-bold text-green-700 text-lg">+12%</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Upcoming Events */}
// //           <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
// //             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
// //               <Calendar className="text-green-600" />
// //               Upcoming Eco Events
// //             </h2>
// //             <div className="space-y-4">
// //               {upcomingEvents.map((event) => (
// //                 <div key={event.id} className="border-2 border-green-200 rounded-lg p-4 bg-green-50/70 hover:bg-green-100/70 transition-all duration-200 hover:shadow-md">
// //                   <div className="flex items-start justify-between mb-3">
// //                     <h3 className="font-bold text-gray-900">{event.title}</h3>
// //                     <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold shadow-sm">
// //                       {event.points}
// //                     </span>
// //                   </div>
// //                   <div className="text-sm text-gray-700 space-y-1 mb-3">
// //                     <p className="flex items-center gap-1 font-medium">
// //                       <Calendar className="w-3 h-3" />
// //                       {event.date} at {event.time}
// //                     </p>
// //                     <p className="font-medium">{event.location}</p>
// //                     <p className="text-green-700 font-semibold">{event.participants} participants registered</p>
// //                   </div>
// //                   <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 duration-200">
// //                     Join Event
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Quick Actions */}
// //         <div className="mt-8">
// //           <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Quick Eco Actions</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //             <button className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
// //               <Recycle className="w-10 h-10 text-green-600 mb-3 group-hover:text-green-700 transition-colors" />
// //               <h3 className="font-bold text-gray-900 text-lg">Log Recycling</h3>
// //               <p className="text-sm text-gray-700 font-medium">Record your recycling activities</p>
// //             </button>
// //             <button className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
// //               <Calendar className="w-10 h-10 text-green-600 mb-3 group-hover:text-green-700 transition-colors" />
// //               <h3 className="font-bold text-gray-900 text-lg">Browse Events</h3>
// //               <p className="text-sm text-gray-700 font-medium">Join environmental activities</p>
// //             </button>
// //             <button className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
// //               <Trophy className="w-10 h-10 text-yellow-500 mb-3 group-hover:text-yellow-600 transition-colors" />
// //               <h3 className="font-bold text-gray-900 text-lg">Redeem Points</h3>
// //               <p className="text-sm text-gray-700 font-medium">Exchange points for eco rewards</p>
// //             </button>
// //             <button className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
// //               <BarChart3 className="w-10 h-10 text-green-600 mb-3 group-hover:text-green-700 transition-colors" />
// //               <h3 className="font-bold text-gray-900 text-lg">View Analytics</h3>
// //               <p className="text-sm text-gray-700 font-medium">Track your environmental impact</p>
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CustomerDashboard;

// // pages/customer/CustomerDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../contexts/AuthContext';
// import img2 from '../../assets/background1.png';
// import { 
//   Recycle, 
//   Leaf, 
//   Trophy, 
//   TrendingUp, 
//   Calendar,
//   Target,
//   Award,
//   BarChart3,
//   TreePine,
//   Droplets,
//   Wind,
//   Zap
// } from 'lucide-react';

// const CustomerDashboard = () => {
//   const { user } = useAuth();

//   // ---------- NEW: pull live points ----------
//   const [totalPoints, setTotalPoints] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Compute level from points
//   const levelFromPoints = (pts) => {
//     if (pts >= 100) return 'Earth Champion';
//     if (pts >= 50)  return 'Eco Star';
//     if (pts >= 20)  return 'Eco Learner';
//     return 'Beginner Recycler';
//   };

//   // Fetch profile (totalPoints) once
//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/recycle/profile');
//         if (!mounted) return;
//         const pts = Number(res?.data?.totalPoints ?? 0);
//         setTotalPoints(Number.isFinite(pts) ? pts : 0);
//       } catch (e) {
//         // Fallback to any points on user object if API fails
//         const fallback = Number(user?.points ?? 0);
//         setTotalPoints(Number.isFinite(fallback) ? fallback : 0);
//         console.error('Failed to load profile points:', e?.message || e);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => { mounted = false; };
//   }, [user]);

//   const ecoLevel = levelFromPoints(totalPoints);

//   // BADGES derived from totalPoints (1 pt = 1 kg)
//   const badges = [
//     {
//       name: 'Earth Champion',
//       description: '100+ points',
//       earned: totalPoints >= 100,
//       icon: Recycle,
//       color: 'bg-green-500'
//     },
//     {
//       name: 'Eco Star',
//       description: '50 points',
//       earned: totalPoints >= 50,
//       icon: Calendar,
//       color: 'bg-emerald-500'
//     },
//     {
//       name: 'Eco Learner',
//       description: '20 points',
//       earned: totalPoints >= 20,
//       icon: Wind,
//       color: 'bg-teal-500'
//     },
//     {
//       name: 'Beginner Recycler',
//       description: 'Starting point of recycling',
//       earned: totalPoints >= 0, // always true
//       icon: Droplets,
//       color: 'bg-gray-500'
//     }
//   ];

//   // ---------- Your original mock data left intact ----------
//   const recentActivities = [
//     {
//       id: 'REC-001',
//       activity: 'Plastic Bottles Recycled',
//       points: '+50 pts',
//       date: '2024-08-26',
//       type: 'recycle',
//       icon: Recycle,
//       impact: '2.5kg CO₂ saved'
//     },
//     {
//       id: 'EVT-002',
//       activity: 'Community Clean-up Event',
//       points: '+100 pts',
//       date: '2024-08-24',
//       type: 'event',
//       icon: TreePine,
//       impact: '5 hours volunteered'
//     },
//     {
//       id: 'REC-003',
//       activity: 'E-waste Drop-off',
//       points: '+75 pts',
//       date: '2024-08-22',
//       type: 'recycle',
//       icon: Zap,
//       impact: '3 devices recycled'
//     }
//   ];

//   const getActivityIcon = (type) => {
//     switch (type) {
//       case 'recycle':
//         return 'bg-green-500 text-white shadow-lg';
//       case 'event':
//         return 'bg-emerald-500 text-white shadow-lg';
//       default:
//         return 'bg-green-500 text-white shadow-lg';
//     }
//   };

//   const monthlyImpact = [
//     { month: 'May', co2: 85, items: 32, points: 920 },
//     { month: 'Jun', co2: 95, items: 38, points: 1080 },
//     { month: 'Jul', co2: 110, items: 41, points: 1150 },
//     { month: 'Aug', co2: 125, items: 47, points: 1250 }
//   ];

//   // ---------- Stats: ONLY Eco Points & Eco Level updated ----------
//   const stats = [
//     {
//       name: 'Eco Points',
//       value: loading ? '...' : totalPoints,
//       icon: Leaf,
//       color: 'text-green-600 bg-green-100',
//       change: '', // keep as you like
//       changeType: 'neutral',
//       unit: 'pts'
//     },
//     {
//       name: 'Items Recycled',
//       value: '47',
//       icon: Recycle,
//       color: 'text-green-600 bg-green-100',
//       change: '+8',
//       changeType: 'increase',
//       unit: 'items'
//     },
//     {
//       name: 'CO₂ Saved',
//       value: '125',
//       icon: Wind,
//       color: 'text-green-600 bg-green-100',
//       change: '+15kg',
//       changeType: 'increase',
//       unit: 'kg'
//     },
//     {
//       name: 'Eco Level',
//       value: loading ? '...' : ecoLevel,
//       icon: Award,
//       color: 'text-green-600 bg-green-100',
//       change: '',
//       changeType: 'neutral'
//     }
//   ];

//   return (
//     <div 
//       className="min-h-screen relative overflow-hidden"
//       style={{
//         backgroundImage: `url(${img2})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         backgroundAttachment: 'fixed'
//       }}
//     >
//       {/* Dark overlay for better readability */}
//       <div className="absolute inset-0 bg-black bg-opacity-40"></div>

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
//           <h1 className="text-4xl font-bold text-white flex items-center gap-3 drop-shadow-lg">
//             <Leaf className="text-green-300" />
//             Welcome back, {user?.firstName}!
//           </h1>
//           <p className="text-green-100 mt-2 text-lg drop-shadow-sm">
//             Your environmental impact journey continues. Together, we're making a difference! 🌱
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat) => (
//             <div key={stat.name} className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 hover:shadow-2xl hover:bg-white transition-all duration-300 hover:scale-105">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.name}</p>
//                   <div className="flex items-baseline gap-1">
//                     <p className="text-3xl font-bold text-gray-900 mt-2">
//                       {stat.value}
//                     </p>
//                     {stat.unit && (
//                       <span className="text-sm text-gray-600 font-medium">{stat.unit}</span>
//                     )}
//                   </div>
//                   {stat.change && (
//                     <div className="flex items-center mt-2">
//                       <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
//                       <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-3 rounded-xl bg-green-500 shadow-lg">
//                   <stat.icon className="w-8 h-8 text-white" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Recent Activities */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                   <BarChart3 className="text-green-600" />
//                   Recent Eco Activities
//                 </h2>
//                 <button className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors px-3 py-1 rounded-md hover:bg-green-50">
//                   View all
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {recentActivities.map((activity) => (
//                   <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50/80 rounded-lg border border-gray-200 hover:bg-gray-100/80 transition-all duration-200">
//                     <div className="flex items-center gap-4">
//                       <div className={`p-3 rounded-lg ${getActivityIcon(activity.type)}`}>
//                         <activity.icon className="w-5 h-5" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-900">{activity.activity}</h3>
//                         <p className="text-sm text-gray-600 font-medium">{activity.date}</p>
//                         <p className="text-sm text-green-700 font-semibold">{activity.impact}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="inline-flex px-4 py-2 text-sm font-bold rounded-full bg-green-500 text-white shadow-lg">
//                         {activity.points}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Badges Earned */}
//           <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Trophy className="text-yellow-500" />
//               Eco Badges
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               {badges.map((badge) => (
//                 <div key={badge.name} className={`p-4 rounded-lg border-2 transition-all duration-300 ${
//                   badge.earned 
//                     ? 'border-green-400 bg-green-50 hover:shadow-lg hover:bg-green-100' 
//                     : 'border-gray-300 bg-gray-100 opacity-70'
//                 }`}>
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${badge.color} shadow-md`}>
//                     <badge.icon className="w-5 h-5 text-white" />
//                   </div>
//                   <h3 className={`font-semibold text-sm mb-1 ${
//                     badge.earned ? 'text-gray-900' : 'text-gray-500'
//                   }`}>
//                     {badge.name}
//                   </h3>
//                   <p className={`text-xs ${
//                     badge.earned ? 'text-gray-700' : 'text-gray-500'
//                   }`}>
//                     {badge.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Monthly Analytics */}
//           <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Target className="text-green-600" />
//               Monthly Impact Analytics
//             </h2>
//             <div className="space-y-4">
//               {monthlyImpact.map((month) => (
//                 <div key={month.month} className="border-2 border-green-200 rounded-lg p-5 bg-green-50/70 hover:bg-green-100/70 transition-colors">
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className="font-bold text-gray-900 text-lg">{month.month} 2024</h3>
//                     <span className="text-sm font-bold text-green-700 bg-green-200 px-3 py-1 rounded-full">{month.points} pts</span>
//                   </div>
//                   <div className="grid grid-cols-3 gap-4 text-sm">
//                     <div className="text-center">
//                       <p className="text-gray-600 font-medium">CO₂ Saved</p>
//                       <p className="font-bold text-green-700 text-lg">{month.co2}kg</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-gray-600 font-medium">Items</p>
//                       <p className="font-bold text-green-700 text-lg">{month.items}</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-gray-600 font-medium">Growth</p>
//                       <p className="font-bold text-green-700 text-lg">+12%</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Upcoming Events */}
//           <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Calendar className="text-green-600" />
//               Upcoming Eco Events
//             </h2>
//             <div className="space-y-4">
//               {[
//                 {
//                   id: 'evt-1',
//                   title: 'Beach Cleanup Drive',
//                   date: '2024-09-05',
//                   time: '08:00 AM',
//                   location: 'Negombo Beach',
//                   points: '150 pts',
//                   participants: 45
//                 },
//                 {
//                   id: 'evt-2',
//                   title: 'Urban Garden Workshop',
//                   date: '2024-09-12',
//                   time: '02:00 PM',
//                   location: 'Colombo City Center',
//                   points: '100 pts',
//                   participants: 28
//                 },
//                 {
//                   id: 'evt-3',
//                   title: 'E-waste Collection Day',
//                   date: '2024-09-20',
//                   time: '10:00 AM',
//                   location: 'Independence Square',
//                   points: '200 pts',
//                   participants: 67
//                 }
//               ].map((event) => (
//                 <div key={event.id} className="border-2 border-green-200 rounded-lg p-4 bg-green-50/70 hover:bg-green-100/70 transition-all duration-200 hover:shadow-md">
//                   <div className="flex items-start justify-between mb-3">
//                     <h3 className="font-bold text-gray-900">{event.title}</h3>
//                     <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold shadow-sm">
//                       {event.points}
//                     </span>
//                   </div>
//                   <div className="text-sm text-gray-700 space-y-1 mb-3">
//                     <p className="flex items-center gap-1 font-medium">
//                       <Calendar className="w-3 h-3" />
//                       {event.date} at {event.time}
//                     </p>
//                     <p className="font-medium">{event.location}</p>
//                     <p className="text-green-700 font-semibold">{event.participants} participants registered</p>
//                   </div>
//                   <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 duration-200">
//                     Join Event
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Quick Eco Actions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <button className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
//               <Recycle className="w-10 h-10 text-green-600 mb-3 group-hover:text-green-700 transition-colors" />
//               <h3 className="font-bold text-gray-900 text-lg">Log Recycling</h3>
//               <p className="text-sm text-gray-700 font-medium">Record your recycling activities</p>
//             </button>
//             <button className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
//               <Calendar className="w-10 h-10 text-green-600 mb-3 group-hover:text-green-700 transition-colors" />
//               <h3 className="font-bold text-gray-900 text-lg">Browse Events</h3>
//               <p className="text-sm text-gray-700 font-medium">Join environmental activities</p>
//             </button>
//             <button className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
//               <Trophy className="w-10 h-10 text-yellow-500 mb-3 group-hover:text-yellow-600 transition-colors" />
//               <h3 className="font-bold text-gray-900 text-lg">Redeem Points</h3>
//               <p className="text-sm text-gray-700 font-medium">Exchange points for eco rewards</p>
//             </button>
//             <button className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
//               <BarChart3 className="w-10 h-10 text-green-600 mb-3 group-hover:text-green-700 transition-colors" />
//               <h3 className="font-bold text-gray-900 text-lg">View Analytics</h3>
//               <p className="text-sm text-gray-700 font-medium">Track your environmental impact</p>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;

// pages/customer/CustomerDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import img2 from '../../assets/background1.png';
import { 
  Recycle, 
  Leaf, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Target,
  Award,
  BarChart3,
  TreePine,
  Droplets,
  Wind,
  Zap
} from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ---------- NEW: pull live points ----------
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  // Compute level from points
  const levelFromPoints = (pts) => {
    if (pts >= 100) return 'Earth Champion';
    if (pts >= 50)  return 'Eco Star';
    if (pts >= 20)  return 'Eco Learner';
    return 'Beginner Recycler';
  };

  // Fetch profile (totalPoints) once
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recycle/profile');
        if (!mounted) return;
        const pts = Number(res?.data?.totalPoints ?? 0);
        setTotalPoints(Number.isFinite(pts) ? pts : 0);
      } catch (e) {
        // Fallback to any points on user object if API fails
        const fallback = Number(user?.points ?? 0);
        setTotalPoints(Number.isFinite(fallback) ? fallback : 0);
        console.error('Failed to load profile points:', e?.message || e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [user]);

  const ecoLevel = levelFromPoints(totalPoints);

  // BADGES derived from totalPoints (1 pt = 1 kg)
  const badges = [
    {
      name: 'Earth Champion',
      description: '100+ points',
      earned: totalPoints >= 100,
      icon: Recycle,
      color: 'bg-green-500'
    },
    {
      name: 'Eco Star',
      description: '50 points',
      earned: totalPoints >= 50,
      icon: Calendar,
      color: 'bg-emerald-500'
    },
    {
      name: 'Eco Learner',
      description: '20 points',
      earned: totalPoints >= 20,
      icon: Wind,
      color: 'bg-teal-500'
    },
    {
      name: 'Beginner Recycler',
      description: 'Starting point of recycling',
      earned: totalPoints >= 0, // always true
      icon: Droplets,
      color: 'bg-gray-500'
    }
  ];

  // ---------- Your original mock data left intact ----------
  const recentActivities = [
    {
      id: 'REC-001',
      activity: 'Plastic Bottles Recycled',
      points: '+50 pts',
      date: '2024-08-26',
      type: 'recycle',
      icon: Recycle,
      impact: '2.5kg CO₂ saved'
    },
    {
      id: 'EVT-002',
      activity: 'Community Clean-up Event',
      points: '+100 pts',
      date: '2024-08-24',
      type: 'event',
      icon: TreePine,
      impact: '5 hours volunteered'
    },
    {
      id: 'REC-003',
      activity: 'E-waste Drop-off',
      points: '+75 pts',
      date: '2024-08-22',
      type: 'recycle',
      icon: Zap,
      impact: '3 devices recycled'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'recycle':
        return 'bg-green-500 text-white shadow-lg';
      case 'event':
        return 'bg-emerald-500 text-white shadow-lg';
      default:
        return 'bg-green-500 text-white shadow-lg';
    }
  };

  const monthlyImpact = [
    { month: 'May', co2: 85, items: 32, points: 920 },
    { month: 'Jun', co2: 95, items: 38, points: 1080 },
    { month: 'Jul', co2: 110, items: 41, points: 1150 },
    { month: 'Aug', co2: 125, items: 47, points: 1250 }
  ];

  // ---------- Stats: ONLY Eco Points & Eco Level updated ----------
  const stats = [
    {
      name: 'Eco Points',
      value: loading ? '...' : totalPoints,
      icon: Leaf,
      color: 'text-green-600 bg-green-100',
      change: '', // keep as you like
      changeType: 'neutral',
      unit: 'pts'
    },
    {
      name: 'Items Recycled',
      value: '47',
      icon: Recycle,
      color: 'text-green-600 bg-green-100',
      change: '+8',
      changeType: 'increase',
      unit: 'items'
    },
    {
      name: 'CO₂ Saved',
      value: '125',
      icon: Wind,
      color: 'text-green-600 bg-green-100',
      change: '+15kg',
      changeType: 'increase',
      unit: 'kg'
    },
    {
      name: 'Eco Level',
      value: loading ? '...' : ecoLevel,
      icon: Award,
      color: 'text-green-600 bg-green-100',
      change: '',
      changeType: 'neutral'
    }
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${img2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

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

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3 drop-shadow-lg">
            <Leaf className="text-green-300" />
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-green-100 mt-2 text-lg drop-shadow-sm">
            Your environmental impact journey continues. Together, we're making a difference! 🌱
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 hover:shadow-2xl hover:bg-white transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.name}</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                    {stat.unit && (
                      <span className="text-sm text-gray-600 font-medium">{stat.unit}</span>
                    )}
                  </div>
                  {stat.change && (
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                    </div>
                  )}
                </div>
                <div className="p-3 rounded-xl bg-green-500 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="text-green-600" />
                  Recent Eco Activities
                </h2>
                <button
                  onClick={() => navigate('/events')}
                  className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors px-3 py-1 rounded-md hover:bg-green-50"
                >
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50/80 rounded-lg border border-gray-200 hover:bg-gray-100/80 transition-all duration-200">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${getActivityIcon(activity.type)}`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{activity.activity}</h3>
                        <p className="text-sm text-gray-600 font-medium">{activity.date}</p>
                        <p className="text-sm text-green-700 font-semibold">{activity.impact}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex px-4 py-2 text-sm font-bold rounded-full bg-green-500 text-white shadow-lg">
                        {activity.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Badges Earned */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              Eco Badges
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div key={badge.name} className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  badge.earned 
                    ? 'border-green-400 bg-green-50 hover:shadow-lg hover:bg-green-100' 
                    : 'border-gray-300 bg-gray-100 opacity-70'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${badge.color} shadow-md`}>
                    <badge.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${
                    badge.earned ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {badge.name}
                  </h3>
                  <p className={`text-xs ${
                    badge.earned ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Analytics */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="text-green-600" />
              Monthly Impact Analytics
            </h2>
            <div className="space-y-4">
              {monthlyImpact.map((month) => (
                <div key={month.month} className="border-2 border-green-200 rounded-lg p-5 bg-green-50/70 hover:bg-green-100/70 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-lg">{month.month} 2024</h3>
                    <span className="text-sm font-bold text-green-700 bg-green-200 px-3 py-1 rounded-full">{month.points} pts</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600 font-medium">CO₂ Saved</p>
                      <p className="font-bold text-green-700 text-lg">{month.co2}kg</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 font-medium">Items</p>
                      <p className="font-bold text-green-700 text-lg">{month.items}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 font-medium">Growth</p>
                      <p className="font-bold text-green-700 text-lg">+12%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="text-green-600" />
              Upcoming Eco Events
            </h2>
            <div className="space-y-4">
              {[
                {
                  id: 'evt-1',
                  title: 'Beach Cleanup Drive',
                  date: '2024-09-05',
                  time: '08:00 AM',
                  location: 'Negombo Beach',
                  points: '150 pts',
                  participants: 45
                },
                {
                  id: 'evt-2',
                  title: 'Urban Garden Workshop',
                  date: '2024-09-12',
                  time: '02:00 PM',
                  location: 'Colombo City Center',
                  points: '100 pts',
                  participants: 28
                },
                {
                  id: 'evt-3',
                  title: 'E-waste Collection Day',
                  date: '2024-09-20',
                  time: '10:00 AM',
                  location: 'Independence Square',
                  points: '200 pts',
                  participants: 67
                }
              ].map((event) => (
                <div key={event.id} className="border-2 border-green-200 rounded-lg p-4 bg-green-50/70 hover:bg-green-100/70 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{event.title}</h3>
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold shadow-sm">
                      {event.points}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1 mb-3">
                    <p className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3" />
                      {event.date} at {event.time}
                    </p>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-green-700 font-semibold">{event.participants} participants registered</p>
                  </div>
                  <button
                    onClick={() => navigate('/events')}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
                  >
                    See All Events
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Quick Eco Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <button className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
              <Recycle className="w-10 h-10 text-green-600 mb-3 group-hover:text-green-700 transition-colors" />
              <h3 className="font-bold text-gray-900 text-lg">Log Recycling</h3>
              <p className="text-sm text-gray-700 font-medium">Record your recycling activities</p>
            </button>
            <button
              onClick={() => navigate('/events')}
              className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group"
            >
              <Calendar className="w-10 h-10 text-green-600 mb-3 group-hover:text-green-700 transition-colors" />
              <h3 className="font-bold text-gray-900 text-lg">Browse Events</h3>
              <p className="text-sm text-gray-700 font-medium">Join environmental activities</p>
            </button>
            <button className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
              <Trophy className="w-10 h-10 text-yellow-500 mb-3 group-hover:text-yellow-600 transition-colors" />
              <h3 className="font-bold text-gray-900 text-lg">Redeem Points</h3>
              <p className="text-sm text-gray-700 font-medium">Exchange points for eco rewards</p>
            </button>
            <button className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
              <BarChart3 className="w-10 h-10 text-green-600 mb-3 group-hover:text-green-700 transition-colors" />
              <h3 className="font-bold text-gray-900 text-lg">View Analytics</h3>
              <p className="text-sm text-gray-700 font-medium">Track your environmental impact</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

