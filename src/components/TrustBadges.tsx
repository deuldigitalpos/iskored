import React from 'react';
import { Shield, Lock, CheckCircle } from 'lucide-react';

const TrustBadges: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Data is Safe & Secure</h3>
          <p className="text-gray-600">Enterprise-grade security and compliance standards</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">SSL Encrypted</h4>
            <p className="text-gray-600 text-sm">
              All data transmission is protected with 256-bit SSL encryption, ensuring your information stays private and secure.
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">GDPR Compliant</h4>
            <p className="text-gray-600 text-sm">
              Full compliance with European data protection regulations. You control your data with complete transparency.
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">PCI DSS Secure</h4>
            <p className="text-gray-600 text-sm">
              Payment Card Industry Data Security Standard certified for secure payment processing and data handling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;