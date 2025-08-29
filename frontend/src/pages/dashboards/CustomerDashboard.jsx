import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
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

  const getUserLevelColor = (level) => {
    switch (level) {
      case 'Eco Starter':
        return 'text-green-600 bg-green-100';
      case 'Green Guardian':
        return 'text-emerald-600 bg-emerald-100';
      case 'Sustainability Champion':
        return 'text-teal-600 bg-teal-100';
      case 'Planet Protector':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  const stats = [
    {
      name: 'Eco Points',
      value: user?.points || 1250,
      icon: Leaf,
      color: 'text-green-600 bg-green-100',
      change: '+180',
      changeType: 'increase',
      unit: 'pts'
    },
    {
      name: 'Items Recycled',
      value: '47',
      icon: Recycle,
      color: 'text-blue-600 bg-blue-100',
      change: '+8',
      changeType: 'increase',
      unit: 'items'
    },
    {
      name: 'CO₂ Saved',
      value: '125',
      icon: Wind,
      color: 'text-purple-600 bg-purple-100',
      change: '+15kg',
      changeType: 'increase',
      unit: 'kg'
    },
    {
      name: 'Eco Level',
      value: user?.user_level || 'Green Guardian',
      icon: Award,
      color: getUserLevelColor(user?.user_level),
      change: '',
      changeType: 'neutral'
    }
  ];

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

  const badges = [
    {
      name: 'Recycling Hero',
      description: 'Recycled 50+ items',
      earned: true,
      icon: Recycle,
      color: 'bg-green-500'
    },
    {
      name: 'Event Enthusiast',
      description: 'Joined 5+ eco events',
      earned: true,
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      name: 'Carbon Crusher',
      description: 'Saved 100kg+ CO₂',
      earned: true,
      icon: Wind,
      color: 'bg-purple-500'
    },
    {
      name: 'Water Warrior',
      description: 'Conserved 500L+ water',
      earned: false,
      icon: Droplets,
      color: 'bg-gray-400'
    }
  ];

  const upcomingEvents = [
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
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'recycle':
        return 'bg-green-100 text-green-600';
      case 'event':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const monthlyImpact = [
    { month: 'May', co2: 85, items: 32, points: 920 },
    { month: 'Jun', co2: 95, items: 38, points: 1080 },
    { month: 'Jul', co2: 110, items: 41, points: 1150 },
    { month: 'Aug', co2: 125, items: 47, points: 1250 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Leaf className="text-green-600" />
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Your environmental impact journey continues. Together, we're making a difference! 🌱
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                    {stat.unit && (
                      <span className="text-sm text-gray-500">{stat.unit}</span>
                    )}
                  </div>
                  {stat.change && (
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    </div>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="text-green-600" />
                  Recent Eco Activities
                </h2>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getActivityIcon(activity.type)}`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{activity.activity}</h3>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                        <p className="text-sm text-green-600 font-medium">{activity.impact}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                        {activity.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Badges Earned */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-600" />
              Eco Badges
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => (
                <div key={badge.name} className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  badge.earned 
                    ? 'border-green-200 bg-green-50 hover:shadow-md' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${badge.color}`}>
                    <badge.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className={`font-medium text-xs mb-1 ${
                    badge.earned ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {badge.name}
                  </h3>
                  <p className={`text-xs ${
                    badge.earned ? 'text-gray-600' : 'text-gray-400'
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="text-blue-600" />
              Monthly Impact Analytics
            </h2>
            <div className="space-y-4">
              {monthlyImpact.map((month) => (
                <div key={month.month} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{month.month} 2024</h3>
                    <span className="text-sm font-semibold text-green-600">{month.points} pts</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">CO₂ Saved</p>
                      <p className="font-semibold text-purple-600">{month.co2}kg</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Items</p>
                      <p className="font-semibold text-blue-600">{month.items}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Growth</p>
                      <p className="font-semibold text-green-600">+12%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="text-green-600" />
              Upcoming Eco Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border border-green-100 rounded-lg p-4 hover:bg-green-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {event.points}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date} at {event.time}
                    </p>
                    <p>{event.location}</p>
                    <p className="text-green-600 font-medium">{event.participants} participants registered</p>
                  </div>
                  <button className="mt-3 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    Join Event
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Eco Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <Recycle className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Log Recycling</h3>
              <p className="text-sm text-gray-600">Record your recycling activities</p>
            </button>
            <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">Browse Events</h3>
              <p className="text-sm text-gray-600">Join environmental activities</p>
            </button>
            <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <Trophy className="w-8 h-8 text-yellow-600 mb-2" />
              <h3 className="font-medium text-gray-900">Redeem Points</h3>
              <p className="text-sm text-gray-600">Exchange points for eco rewards</p>
            </button>
            <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">View Analytics</h3>
              <p className="text-sm text-gray-600">Track your environmental impact</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;