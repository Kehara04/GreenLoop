import React from 'react';
import { User, Gift, BarChart3, Recycle, Facebook, Twitter, Instagram } from 'lucide-react';
import img1 from '../assets/background-recycle.jpg';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="w-full px-8 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">GREEN LOOP</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">HOME</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">ABOUT</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">EVENTS</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">RECYCLE CENTERS</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm font-medium">
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">LOGIN</a>
                <span className="text-gray-400">|</span>
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">SIGNUP</a>
              </div>
              <User className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${img1}')`,
          }}
        ></div>
        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-green-500/70 to-green-400/60"></div> */}
        
        Decorative background elements
        <div className="absolute top-4 left-4 w-16 h-16 bg-green-300 rounded-full opacity-30"></div>
        <div className="absolute top-12 right-8 w-8 h-8 bg-green-200 rounded-full opacity-40"></div>
        <div className="absolute bottom-8 left-12 w-12 h-12 bg-green-300 rounded-full opacity-25"></div>
        <div className="absolute bottom-4 right-16 w-6 h-6 bg-green-200 rounded-full opacity-50"></div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4">
           
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
              REUSE.<br />
              RECYCLE.<br />
              REWARD THE FUTURE.
            </h1>
          </div>
        </div>
      </div>

      {/* Why Choose GreenLoop Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">WHY CHOOSE GREENLOOP ?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              CONVENIENT TOOLS TO TRACK, MANAGE AND IMPROVE YOUR RECYCLING HABITS
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* User Management */}
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">User Management</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Easy registration and profile management to track your participation history and point accumulations in one place.
              </p>
            </div>

            {/* Rewards & Badges */}
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Rewards & Badges</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Earn 1 point per kg recycled and unlock achievements with badges/rewards system to keep you motivated.
              </p>
            </div>

            {/* Analytics & Progress */}
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Analytics & Progress</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Visualize your impact through detailed analytics, waste breakdown, and weekly/monthly/yearly reports.
              </p>
            </div>

            {/* Waste Tracking */}
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Waste Tracking</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Log waste by category, add photos, geolocation, and find nearby recycling centers that fit your criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">HOW IT WORKS</h2>
            <p className="text-gray-600 text-lg">Simple steps to start making a difference</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">REGISTER & PROFILE</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your account and set up your profile with location and preferences.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">LOG YOUR WASTE</h3>
              <p className="text-gray-600 leading-relaxed">
                Use our category-wise form to record what you're recycling and gain instant points.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">FIND CENTERS & EARN</h3>
              <p className="text-gray-600 leading-relaxed">
                Locate nearby recycling centers, and redeem pickup and earn points for every kilogram.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">GREEN LOOP</span>
              </div>
              <p className="text-green-100 leading-relaxed">
                "A community-driven recycling platform designed to promote environmental sustainability by providing users with recycling guidance, and support a cleaner future."
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <div className="space-y-2">
                <div><a href="#" className="text-green-200 hover:text-white transition-colors">HOME</a></div>
                <div><a href="#" className="text-green-200 hover:text-white transition-colors">ABOUT</a></div>
                <div><a href="#" className="text-green-200 hover:text-white transition-colors">EVENTS</a></div>
                <div><a href="#" className="text-green-200 hover:text-white transition-colors">STORES</a></div>
              </div>
            </div>

            {/* Support & Connect */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Support</h4>
              <div className="space-y-2 mb-6">
                <div><a href="#" className="text-green-200 hover:text-white transition-colors">HELP CENTER</a></div>
                <div><a href="#" className="text-green-200 hover:text-white transition-colors">CONTACT US</a></div>
                <div><a href="#" className="text-green-200 hover:text-white transition-colors">PRIVACY POLICY</a></div>
                <div><a href="#" className="text-green-200 hover:text-white transition-colors">TERMS OF SERVICE</a></div>
              </div>
              
              <div>
                <h5 className="font-bold mb-3">Connect</h5>
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 cursor-pointer transition-colors">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 cursor-pointer transition-colors">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 cursor-pointer transition-colors">
                    <Twitter className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}