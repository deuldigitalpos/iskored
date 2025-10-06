import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Upload, Plus, X, Shield, CheckCircle, Lightbulb, Building2, Users, MapPin, Crown } from 'lucide-react';

interface FormData {
  industry: string;
  subIndustry: string;
  leadershipTitle: string;
  orgSize: string;
  region: string;
  logo: File | null;
  coAdmins: { email: string; name: string; title: string }[];
}

const CompleteProfile: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    subIndustry: '',
    leadershipTitle: '',
    orgSize: '',
    region: '',
    logo: null,
    coAdmins: []
  });

  const [newCoAdmin, setNewCoAdmin] = useState({ email: '', name: '', title: '' });
  const [showAITip, setShowAITip] = useState(true);

  const industries = [
    'Technology',
    'Healthcare & Life Sciences',
    'Financial Services',
    'Manufacturing',
    'Retail & E-commerce',
    'Education',
    'Government & Public Sector',
    'Non-profit',
    'Energy & Utilities',
    'Real Estate',
    'Transportation & Logistics',
    'Media & Entertainment',
    'Professional Services',
    'Other'
  ];

  const subIndustries = {
    'Technology': ['SaaS', 'Hardware', 'AI/ML', 'Cybersecurity', 'Fintech', 'Edtech', 'Healthtech'],
    'Healthcare & Life Sciences': ['Hospitals', 'Pharmaceuticals', 'Medical Devices', 'Biotechnology', 'Telemedicine'],
    'Financial Services': ['Banking', 'Insurance', 'Investment Management', 'Credit Unions', 'Payments'],
    'Manufacturing': ['Automotive', 'Aerospace', 'Electronics', 'Food & Beverage', 'Chemicals'],
    'Retail & E-commerce': ['Fashion', 'Electronics', 'Home & Garden', 'Grocery', 'Marketplace'],
    'Education': ['K-12', 'Higher Education', 'Online Learning', 'Corporate Training'],
    'Government & Public Sector': ['Federal', 'State', 'Local', 'Military', 'Agencies'],
    'Non-profit': ['Healthcare', 'Education', 'Environmental', 'Social Services', 'Arts & Culture'],
    'Energy & Utilities': ['Oil & Gas', 'Renewable Energy', 'Electric Utilities', 'Water'],
    'Real Estate': ['Commercial', 'Residential', 'Property Management', 'REITs'],
    'Transportation & Logistics': ['Airlines', 'Shipping', 'Trucking', 'Railways', 'Warehousing'],
    'Media & Entertainment': ['Broadcasting', 'Publishing', 'Gaming', 'Streaming', 'Sports'],
    'Professional Services': ['Consulting', 'Legal', 'Accounting', 'Marketing', 'Architecture'],
    'Other': ['Custom']
  };

  const leadershipTitles = [
    'CEO / Chief Executive Officer',
    'COO / Chief Operating Officer',
    'CFO / Chief Financial Officer',
    'CTO / Chief Technology Officer',
    'CMO / Chief Marketing Officer',
    'CHRO / Chief Human Resources Officer',
    'President',
    'Vice President',
    'Director',
    'Senior Manager',
    'Manager',
    'Team Lead',
    'Other'
  ];

  const orgSizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-1,000 employees',
    '1,001-5,000 employees',
    '5,000+ employees'
  ];

  const regions = [
    'North America',
    'Europe',
    'Asia Pacific',
    'Latin America',
    'Middle East & Africa',
    'Global'
  ];

  const aiTips = [
    {
      step: 1,
      tip: "💡 Selecting the right industry helps us provide relevant benchmarks and best practices specific to your sector."
    },
    {
      step: 2,
      tip: "🎯 Your leadership title helps us customize the platform experience and provide role-specific insights."
    },
    {
      step: 3,
      tip: "🏢 Adding your logo creates a professional, branded experience for your team and stakeholders."
    },
    {
      step: 4,
      tip: "👥 Inviting co-admins ensures continuity and shared responsibility for your strategic initiatives."
    }
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset sub-industry when industry changes
    if (field === 'industry') {
      setFormData(prev => ({ ...prev, subIndustry: '' }));
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('logo', file);
    }
  };

  const addCoAdmin = () => {
    if (newCoAdmin.email && newCoAdmin.name) {
      setFormData(prev => ({
        ...prev,
        coAdmins: [...prev.coAdmins, { ...newCoAdmin }]
      }));
      setNewCoAdmin({ email: '', name: '', title: '' });
    }
  };

  const removeCoAdmin = (index: number) => {
    setFormData(prev => ({
      ...prev,
      coAdmins: prev.coAdmins.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.industry && formData.subIndustry;
      case 2:
        return formData.leadershipTitle && formData.orgSize && formData.region;
      case 3:
        return true; // Logo is optional
      case 4:
        return true; // Co-admins are optional
      default:
        return false;
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / totalSteps) * 100;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your industry</h2>
              <p className="text-gray-600">This helps us provide relevant insights and benchmarks</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Select your industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub-Industry *
                </label>
                <select
                  value={formData.subIndustry}
                  onChange={(e) => handleInputChange('subIndustry', e.target.value)}
                  disabled={!formData.industry}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Select sub-industry</option>
                  {formData.industry && subIndustries[formData.industry as keyof typeof subIndustries]?.map(subIndustry => (
                    <option key={subIndustry} value={subIndustry}>{subIndustry}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <Crown className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your leadership details</h2>
              <p className="text-gray-600">Help us customize your experience based on your role</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leadership Title *
                </label>
                <select
                  value={formData.leadershipTitle}
                  onChange={(e) => handleInputChange('leadershipTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Select your title</option>
                  {leadershipTitles.map(title => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Size *
                  </label>
                  <select
                    value={formData.orgSize}
                    onChange={(e) => handleInputChange('orgSize', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="">Select organization size</option>
                    {orgSizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Region *
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="">Select your region</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Upload className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Brand your workspace</h2>
              <p className="text-gray-600">Upload your logo to create a professional experience</p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-accent transition-colors">
                {formData.logo ? (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                      <img
                        src={URL.createObjectURL(formData.logo)}
                        alt="Logo preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formData.logo.name}</p>
                      <p className="text-xs text-gray-500">{(formData.logo.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      onClick={() => handleInputChange('logo', null)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove logo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-1">Upload your logo</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 2MB</p>
                    </div>
                    <label className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose file
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Your logo will appear in reports and shared dashboards
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Invite co-administrators</h2>
              <p className="text-gray-600">Add team members who can help manage your strategic initiatives</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* Add Co-Admin Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add Co-Administrator</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newCoAdmin.name}
                    onChange={(e) => setNewCoAdmin(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newCoAdmin.email}
                    onChange={(e) => setNewCoAdmin(prev => ({ ...prev, email: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Title (optional)"
                    value={newCoAdmin.title}
                    onChange={(e) => setNewCoAdmin(prev => ({ ...prev, title: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <button
                  onClick={addCoAdmin}
                  disabled={!newCoAdmin.name || !newCoAdmin.email}
                  className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Co-Admin
                </button>
              </div>

              {/* Co-Admins List */}
              {formData.coAdmins.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Invited Co-Administrators</h3>
                  <div className="space-y-3">
                    {formData.coAdmins.map((coAdmin, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{coAdmin.name}</p>
                          <p className="text-sm text-gray-600">{coAdmin.email}</p>
                          {coAdmin.title && <p className="text-xs text-gray-500">{coAdmin.title}</p>}
                        </div>
                        <button
                          onClick={() => removeCoAdmin(index)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Co-Administrator Benefits</h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• Full access to all platform features</li>
                      <li>• Ability to create and manage strategic initiatives</li>
                      <li>• Access to reports and analytics</li>
                      <li>• User management capabilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center space-x-4">
              <img src="/image.png" alt="iSKORED" className="h-8 w-auto" />
              <span className="text-xl font-bold text-primary">iSKORED</span>
            </div>
            
            {/* Trust Badge */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-accent" />
              <span>SSL Secured</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(getProgressPercentage())}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              {renderStep()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Tips */}
            {showAITip && (
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <Lightbulb className="w-5 h-5 text-accent mr-2" />
                    <h3 className="font-semibold text-gray-900">AI Tip</h3>
                  </div>
                  <button
                    onClick={() => setShowAITip(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-700">
                  {aiTips.find(tip => tip.step === currentStep)?.tip}
                </p>
              </div>
            )}

            {/* Trust Badges */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Data is Secure</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                  <span>GDPR compliant</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                  <span>SOC 2 certified</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                  <span>99.9% uptime SLA</span>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Setup Progress</h3>
              <div className="space-y-3">
                <div className={`flex items-center text-sm ${currentStep >= 1 ? 'text-accent' : 'text-gray-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    currentStep > 1 ? 'bg-accent text-white' : 
                    currentStep === 1 ? 'bg-accent/20 text-accent' : 'bg-gray-200'
                  }`}>
                    {currentStep > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
                  </div>
                  <span>Industry & Sub-industry</span>
                </div>
                <div className={`flex items-center text-sm ${currentStep >= 2 ? 'text-accent' : 'text-gray-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    currentStep > 2 ? 'bg-accent text-white' : 
                    currentStep === 2 ? 'bg-accent/20 text-accent' : 'bg-gray-200'
                  }`}>
                    {currentStep > 2 ? <CheckCircle className="w-4 h-4" /> : '2'}
                  </div>
                  <span>Leadership Details</span>
                </div>
                <div className={`flex items-center text-sm ${currentStep >= 3 ? 'text-accent' : 'text-gray-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    currentStep > 3 ? 'bg-accent text-white' : 
                    currentStep === 3 ? 'bg-accent/20 text-accent' : 'bg-gray-200'
                  }`}>
                    {currentStep > 3 ? <CheckCircle className="w-4 h-4" /> : '3'}
                  </div>
                  <span>Brand Workspace</span>
                </div>
                <div className={`flex items-center text-sm ${currentStep >= 4 ? 'text-accent' : 'text-gray-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    currentStep > 4 ? 'bg-accent text-white' : 
                    currentStep === 4 ? 'bg-accent/20 text-accent' : 'bg-gray-200'
                  }`}>
                    {currentStep > 4 ? <CheckCircle className="w-4 h-4" /> : '4'}
                  </div>
                  <span>Invite Co-Admins</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {currentStep === totalSteps ? 'Ready to start!' : `${totalSteps - currentStep} steps remaining`}
            </span>
          </div>

          <button
            onClick={nextStep}
            disabled={!isStepValid()}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {currentStep === totalSteps ? 'Complete Setup' : 'Save & Continue'}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;