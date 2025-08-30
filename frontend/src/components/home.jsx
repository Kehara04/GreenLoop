import React, { useEffect, useRef } from 'react';
import { User, Gift, BarChart3, Recycle, Facebook, Twitter, Instagram } from 'lucide-react';
import img1 from '../assets/background-recycle.jpg';

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
    <div className="min-h-screen bg-white">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-up {
          animation: fadeUp 0.7s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.7s ease-out;
        }
        
        .animate-slide-left {
          animation: slideLeft 0.7s ease-out;
        }
        
        .animate-slide-right {
          animation: slideRight 0.7s ease-out;
        }
        
        .animate-scale-up {
          animation: scaleUp 0.7s ease-out;
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating:nth-child(odd) {
          animation-delay: -2s;
        }
        
        .floating:nth-child(even) {
          animation-delay: -4s;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${img1}')`,
          }}
        ></div>
        
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
          <AnimatedSection className="text-center mb-12" animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">WHY CHOOSE GREENLOOP ?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              CONVENIENT TOOLS TO TRACK, MANAGE AND IMPROVE YOUR RECYCLING HABITS
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* User Management */}
            <AnimatedSection 
              className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" 
              animation="scale-up"
              delay={0}
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">User Management</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Easy registration and profile management to track your participation history and point accumulations in one place.
              </p>
            </AnimatedSection>

            {/* Rewards & Badges */}
            <AnimatedSection 
              className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" 
              animation="scale-up"
              delay={100}
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Rewards & Badges</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Earn 1 point per kg recycled and unlock achievements with badges/rewards system to keep you motivated.
              </p>
            </AnimatedSection>

            {/* Analytics & Progress */}
            <AnimatedSection 
              className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" 
              animation="scale-up"
              delay={200}
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Analytics & Progress</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Visualize your impact through detailed analytics, waste breakdown, and weekly/monthly/yearly reports.
              </p>
            </AnimatedSection>

            {/* Waste Tracking */}
            <AnimatedSection 
              className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" 
              animation="scale-up"
              delay={300}
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Waste Tracking</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Log waste by category, add photos, geolocation and find nearby recycling centers that fit your criteria.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12" animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">HOW IT WORKS</h2>
            <p className="text-gray-600 text-lg">Simple steps to start making a difference</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <AnimatedSection className="text-center" animation="slide-left" delay={0}>
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transition-transform">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">REGISTER & PROFILE</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your account and set up your profile with location and preferences.
              </p>
            </AnimatedSection>

            {/* Step 2 */}
            <AnimatedSection className="text-center" animation="fade-up" delay={100}>
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transition-transform">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">LOG YOUR WASTE</h3>
              <p className="text-gray-600 leading-relaxed">
                Use our category-wise form to record what you're recycling and gain instant points.
              </p>
            </AnimatedSection>

            {/* Step 3 */}
            <AnimatedSection className="text-center" animation="slide-right" delay={200}>
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transition-transform">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">FIND CENTERS & EARN</h3>
              <p className="text-gray-600 leading-relaxed">
                Locate nearby recycling centers, and redeem pickup and earn points for every kilogram.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <AnimatedSection animation="fade-up">
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
                    <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 cursor-pointer transition-all duration-300 hover:scale-110">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 cursor-pointer transition-all duration-300 hover:scale-110">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 cursor-pointer transition-all duration-300 hover:scale-110">
                      <Twitter className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  );
}