import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Target, Users, TrendingUp, Star, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import TrustBadges from '../components/TrustBadges';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                AI-Driven Strategy & Performance Platform
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Transform your organization with intelligent strategic planning, balanced scorecards, and data-driven insights that drive measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register"
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/pricing"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  See Plans
                </Link>
              </div>
            </div>
            
            <div className="animate-slide-up">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">95%</div>
                    <div className="text-sm text-white/80">Strategy Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">40%</div>
                    <div className="text-sm text-white/80">Faster Goal Achievement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">500+</div>
                    <div className="text-sm text-white/80">Organizations Trust Us</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">24/7</div>
                    <div className="text-sm text-white/80">AI-Powered Insights</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Strategic Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools powered by AI to align your organization, track performance, and achieve your strategic objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Balance Scorecard</h3>
              <p className="text-gray-600">
                Strategic alignment across Financial, Customer, Internal Process, and Learning & Growth perspectives.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4 group-hover:bg-secondary/20 transition-colors">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategic Alignment</h3>
              <p className="text-gray-600">
                Ensure every initiative and goal connects directly to your organization's vision and mission.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4 group-hover:bg-accent/20 transition-colors">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Action Plans</h3>
              <p className="text-gray-600">
                Transform strategic objectives into executable plans with clear ownership and deadlines.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Reports</h3>
              <p className="text-gray-600">
                Intelligent insights and recommendations based on your performance data and industry benchmarks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-gray-600">
              See how iSKORED is transforming strategic performance across industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "iSKORED transformed how we approach strategic planning. The AI insights helped us identify gaps we never saw before, and our goal achievement rate increased by 45%."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Sarah Mitchell</div>
                  <div className="text-gray-600 text-sm">CEO, TechForward Inc.</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The balance scorecard feature is incredibly intuitive. We can now track performance across all perspectives and make data-driven decisions with confidence."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-semibold">
                  MR
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Michael Rodriguez</div>
                  <div className="text-gray-600 text-sm">Strategy Director, Global Health Solutions</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "Implementation was seamless, and the team adoption was immediate. The AI assistant answers questions instantly, making everyone more productive."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-semibold">
                  LC
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Lisa Chen</div>
                  <div className="text-gray-600 text-sm">Operations Manager, Manufacturing Plus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <TrustBadges />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Strategic Performance?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of organizations already using iSKORED to achieve their strategic objectives faster and more effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register"
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center group"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/pricing"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              View Pricing
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-white/80">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-accent" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-accent" />
              30-day money back guarantee
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-accent" />
              Setup in under 5 minutes
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/image.png" alt="iSKORED" className="h-8 w-auto" />
                <span className="text-xl font-bold">iSKORED</span>
              </div>
              <p className="text-gray-400">
                AI-driven strategy and performance platform helping organizations achieve their strategic objectives.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 iSKORED. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;