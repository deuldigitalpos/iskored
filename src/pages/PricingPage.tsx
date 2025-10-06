import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: 'per month',
      description: 'Perfect for small teams getting started with strategic planning',
      features: [
        'Up to 5 team members',
        'Basic Balance Scorecard',
        'Simple Action Plans',
        'Monthly reports',
        'Email support',
        'Mobile app access'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: 'per month',
      description: 'Advanced features for growing organizations',
      features: [
        'Up to 25 team members',
        'Advanced Balance Scorecard',
        'Comprehensive Action Plans',
        'Real-time dashboards',
        'AI-powered insights',
        'Priority support',
        'Custom surveys',
        'Industry benchmarking'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'Tailored solutions for large organizations',
      features: [
        'Unlimited team members',
        'White-label solution',
        'Advanced AI analytics',
        'Custom integrations',
        'Dedicated success manager',
        '24/7 phone support',
        'On-premise deployment',
        'Advanced security features'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your organization's needs. All plans include our core features with a 30-day money-back guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-accent scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={plan.name === 'Enterprise' ? '/contact' : '/register'}
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-accent text-white hover:bg-accent/90 hover:scale-105'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">
                  Yes! All plans come with a 14-day free trial. No credit card required to get started.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
                <p className="text-gray-600">
                  Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What's your refund policy?</h3>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment in full.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do you offer discounts for nonprofits?</h3>
                <p className="text-gray-600">
                  Yes! We offer special pricing for qualified nonprofit organizations. Contact our sales team for details.
                </p>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">Trusted by 500+ organizations worldwide</p>
            <div className="flex items-center justify-center space-x-8 text-gray-400">
              <span className="font-semibold">SSL Secured</span>
              <span className="font-semibold">GDPR Compliant</span>
              <span className="font-semibold">PCI DSS Certified</span>
              <span className="font-semibold">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;