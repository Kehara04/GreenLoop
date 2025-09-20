import React, { useEffect, useRef } from 'react';
import { User, Gift, BarChart3, Recycle, Facebook, Twitter, Instagram } from 'lucide-react';
import img1 from '../assets/background-recycle.jpg';
import logo from '../assets/logo.png';

// Simple intersection observer hook
const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.1, ...options });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [elementRef, isVisible];
};

// Animation wrapper component
const AnimatedSection = ({ children, className = '', delay = 0, animation = 'fade-up' }) => {
  const [ref, isVisible] = useIntersectionObserver();

  const animationClasses = {
    'fade-up': isVisible ? 'animate-fade-up opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    'fade-in': isVisible ? 'animate-fade-in opacity-100' : 'opacity-0',
    'slide-left': isVisible ? 'animate-slide-left opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
    'slide-right': isVisible ? 'animate-slide-right opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
    'scale-up': isVisible ? 'animate-scale-up opacity-100 scale-100' : 'opacity-0 scale-95',
  };

  return (
    <div
      ref={ref}
      className={`${className} ${animationClasses[animation]} transition-all duration-700 ease-out`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideLeft { from { opacity: 0; transform: translateX(30px);} to {opacity:1; transform:translateX(0);} }
        @keyframes slideRight { from { opacity:0; transform:translateX(-30px);} to {opacity:1; transform:translateX(0);} }
        @keyframes scaleUp { from { opacity:0; transform:scale(0.95);} to {opacity:1; transform:scale(1);} }
        .animate-fade-up { animation: fadeUp 0.7s ease-out; }
        .animate-fade-in { animation: fadeIn 0.7s ease-out; }
        .animate-slide-left { animation: slideLeft 0.7s ease-out; }
        .animate-slide-right { animation: slideRight 0.7s ease-out; }
        .animate-scale-up { animation: scaleUp 0.7s ease-out; }

        /* Floating eco shapes */
        .floating { animation: float 6s ease-in-out infinite; }
        .floating:nth-child(odd) { animation-delay: -2s; }
        .floating:nth-child(even) { animation-delay: -4s; }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      {/* Hero Section (unchanged) */}
      <div className="relative h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${img1}')` }}
        ></div>
        
        {/* Decorative circles */}
        <div className="absolute top-4 left-4 w-16 h-16 bg-green-300 rounded-full opacity-30 floating"></div>
        <div className="absolute top-12 right-8 w-8 h-8 bg-green-200 rounded-full opacity-40 floating"></div>
        <div className="absolute bottom-8 left-12 w-12 h-12 bg-green-300 rounded-full opacity-25 floating"></div>
        <div className="absolute bottom-4 right-16 w-6 h-6 bg-green-200 rounded-full opacity-50 floating"></div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
              REUSE.<br />RECYCLE.<br />REWARD THE FUTURE.
            </h1>
          </div>
        </div>
      </div>

      {/* Why Choose GreenLoop Section */}
      <section className="py-16 relative bg-gradient-to-b from-green-900 via-green-950 to-black overflow-hidden">
        {/* Eco Illustrations in background */}
        <svg className="absolute top-10 left-10 w-40 h-40 text-green-700 opacity-10 floating" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8 6 2 9 2 15a10 10 0 0020 0c0-6-6-9-10-13z" />
        </svg>
        <svg className="absolute bottom-10 right-20 w-56 h-56 text-green-600 opacity-10 floating" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
        </svg>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-12" animation="fade-up">
            <h2 className="text-3xl font-bold text-white mb-4">WHY CHOOSE GREENLOOP ?</h2>
            <p className="text-green-100 max-w-3xl mx-auto text-lg">
              CONVENIENT TOOLS TO TRACK, MANAGE AND IMPROVE YOUR RECYCLING HABITS
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* User Management */}
            <AnimatedSection className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-green-800/50 backdrop-blur-md" animation="scale-up" delay={0}>
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <User className="w-8 h-8 text-green-900" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">User Management</h3>
              <p className="text-sm text-green-100">Easy registration and profile management to track your history and points.</p>
            </AnimatedSection>

            {/* Rewards & Badges */}
            <AnimatedSection className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-green-800/50 backdrop-blur-md" animation="scale-up" delay={100}>
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Gift className="w-8 h-8 text-green-900" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">Rewards & Badges</h3>
              <p className="text-sm text-green-100">Earn points per kg recycled and unlock achievements with badges.</p>
            </AnimatedSection>

            {/* Analytics & Progress */}
            <AnimatedSection className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-green-800/50 backdrop-blur-md" animation="scale-up" delay={200}>
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <BarChart3 className="w-8 h-8 text-green-900" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">Analytics & Progress</h3>
              <p className="text-sm text-green-100">Visualize your impact through waste breakdown and reports.</p>
            </AnimatedSection>

            {/* Waste Tracking */}
            <AnimatedSection className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-green-800/50 backdrop-blur-md" animation="scale-up" delay={300}>
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Recycle className="w-8 h-8 text-green-900" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">Waste Tracking</h3>
              <p className="text-sm text-green-100">Log waste by category, add photos, and find nearby recycling centers.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 relative bg-gradient-to-b from-black via-green-950 to-green-900 overflow-hidden">
        <svg className="absolute top-16 right-10 w-44 h-44 text-green-700 opacity-10 floating" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 7 2 12s4.48 10 10 10 10-5 10-10S17.52 2 12 2z" />
        </svg>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-12" animation="fade-up">
            <h2 className="text-3xl font-bold text-white mb-4">HOW IT WORKS</h2>
            <p className="text-green-200 text-lg">Simple steps to start making a difference</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <AnimatedSection className="text-center" animation="slide-left" delay={0}>
              <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:scale-105 transition-transform">
                <span className="text-green-900 font-bold text-2xl">1</span>
              </div>
              <h3 className="font-bold text-white mb-4 text-xl">REGISTER & PROFILE</h3>
              <p className="text-green-200">Create your account and set up your profile with preferences.</p>
            </AnimatedSection>

            {/* Step 2 */}
            <AnimatedSection className="text-center" animation="fade-up" delay={100}>
              <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:scale-105 transition-transform">
                <span className="text-green-900 font-bold text-2xl">2</span>
              </div>
              <h3 className="font-bold text-white mb-4 text-xl">LOG YOUR WASTE</h3>
              <p className="text-green-200">Use our form to record recyclables and gain instant points.</p>
            </AnimatedSection>

            {/* Step 3 */}
            <AnimatedSection className="text-center" animation="slide-right" delay={200}>
              <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:scale-105 transition-transform">
                <span className="text-green-900 font-bold text-2xl">3</span>
              </div>
              <h3 className="font-bold text-white mb-4 text-xl">FIND CENTERS & EARN</h3>
              <p className="text-green-200">Locate recycling centers and redeem points for every kilogram.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <AnimatedSection animation="fade-up">
        <footer className="bg-gradient-to-b from-green-950 to-black text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Logo and Description */}
              <div className="md:col-span-1">
                <div className="flex items-center mb-4">
                  <img 
                    src={logo} 
                    alt="Green Loop Logo" 
                    className="w-12 h-12 object-contain"
                  />
                  <span className="ml-3 text-2xl font-bold text-green-400">GREEN LOOP</span>
                </div>
                <p className="text-green-200 leading-relaxed">
                  A community-driven recycling platform designed to promote environmental sustainability and support a cleaner future.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4 text-lg text-green-400">Quick Links</h4>
                <div className="space-y-3">
                  <a href="#" className="block text-green-300 hover:text-white transition-colors duration-200">Home</a>
                  <a href="#" className="block text-green-300 hover:text-white transition-colors duration-200">About</a>
                  <a href="#" className="block text-green-300 hover:text-white transition-colors duration-200">Events</a>
                  <a href="#" className="block text-green-300 hover:text-white transition-colors duration-200">Stores</a>
                </div>
              </div>

              {/* Support & Social */}
              <div>
                <h4 className="font-semibold mb-4 text-lg text-green-400">Support</h4>
                <div className="space-y-3 mb-6">
                  <a href="#" className="block text-green-300 hover:text-white transition-colors duration-200">Help Center</a>
                  <a href="#" className="block text-green-300 hover:text-white transition-colors duration-200">Contact Us</a>
                  <a href="#" className="block text-green-300 hover:text-white transition-colors duration-200">Privacy Policy</a>
                  <a href="#" className="block text-green-300 hover:text-white transition-colors duration-200">Terms of Service</a>
                </div>
                
                <div>
                  <h5 className="font-semibold mb-3 text-green-400">Follow Us</h5>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-green-800/50 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110 border border-green-700">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-green-800/50 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110 border border-green-700">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-green-800/50 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110 border border-green-700">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Border */}
            <div className="border-t border-green-800 mt-8 pt-6 text-center">
              <p className="text-green-400 text-sm">
                © 2024 Green Loop. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  );
}