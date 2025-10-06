import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    title: '',
    password: '',
    confirmPassword: '',
    orgName: '',
    industry: '',
    subIndustry: '',
    orgSize: '',
    agreeToTerms: false
  });

  const industries = [
    'Technology',
    'Healthcare',
    'Financial Services',
    'Manufacturing',
    'Retail',
    'Education',
    'Government',
    'Non-profit',
    'Other'
  ];

  const orgSizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-1000 employees',
    '1000+ employees'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await signUp(
        formData.email,
        formData.password,
        formData.fullName
      );

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      navigate('/complete-profile');
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600">
                Start your strategic transformation journey today
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Leadership Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="CEO, Director, Manager"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:cursor-not-allowed"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={loading}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:cursor-not-allowed"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-1">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      id="orgName"
                      name="orgName"
                      required
                      value={formData.orgName}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Your Company Name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                        Industry *
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        required
                        value={formData.industry}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Select Industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="orgSize" className="block text-sm font-medium text-gray-700 mb-1">
                        Organization Size *
                      </label>
                      <select
                        id="orgSize"
                        name="orgSize"
                        required
                        value={formData.orgSize}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Select Size</option>
                        {orgSizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subIndustry" className="block text-sm font-medium text-gray-700 mb-1">
                      Sub-Industry (Optional)
                    </label>
                    <input
                      type="text"
                      id="subIndustry"
                      name="subIndustry"
                      value={formData.subIndustry}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="e.g., SaaS, E-commerce, Consulting"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="mt-1 h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded disabled:cursor-not-allowed"
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-accent hover:text-accent/80 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-accent hover:text-accent/80 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-accent hover:text-accent/80 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;