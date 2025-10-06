import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Target, Users, BarChart3, TrendingUp, MessageCircle, CheckCircle, Lightbulb } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  highlight: boolean;
  arrow: boolean;
}

interface TutorialOverlayProps {
  onClose: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps: TutorialStep[] = [
    {
      id: 'welcome',
      title: "Welcome to iSKORED! 🎉",
      description: "Let's take a quick tour of your strategic performance platform. This tutorial will show you the key features to get you started on your transformation journey.",
      target: "dashboard-welcome",
      position: 'bottom',
      highlight: true,
      arrow: true
    },
    {
      id: 'navigation',
      title: "Navigate Your Dashboard",
      description: "Your dashboard provides an overview of all strategic initiatives, progress metrics, and quick access to key tools. Use the sidebar to navigate between different sections.",
      target: "sidebar-navigation",
      position: 'right',
      highlight: true,
      arrow: true
    },
    {
      id: 'quick-stats',
      title: "Monitor Key Metrics",
      description: "These cards show your most important KPIs at a glance. Track active objectives, survey completion rates, and overall performance scores in real-time.",
      target: "quick-stats",
      position: 'bottom',
      highlight: true,
      arrow: true
    },
    {
      id: 'quick-actions',
      title: "Quick Actions Hub",
      description: "Access your most common tasks directly from the dashboard. Create scorecards, send surveys, build action plans, and view reports with one click.",
      target: "quick-actions",
      position: 'top',
      highlight: true,
      arrow: true
    },
    {
      id: 'surveys',
      title: "Start with Surveys",
      description: "Send surveys to stakeholders to gather insights about your organization's current performance and strategic priorities. This data will inform your scorecard creation.",
      target: "surveys-link",
      position: 'top',
      highlight: true,
      arrow: true
    },
    {
      id: 'scorecard',
      title: "Build Your Balance Scorecard",
      description: "Create your strategic framework with objectives across four perspectives: Financial, Customer, Internal Process, and Learning & Growth.",
      target: "scorecard-link",
      position: 'top',
      highlight: true,
      arrow: true
    },
    {
      id: 'action-plans',
      title: "Create Action Plans",
      description: "Transform your strategic objectives into actionable plans with specific goals, tasks, deadlines, and assigned owners.",
      target: "action-plan-link",
      position: 'top',
      highlight: true,
      arrow: true
    },
    {
      id: 'reports',
      title: "Monitor with Reports",
      description: "Track progress with comprehensive reports, KPI dashboards, and AI-generated insights for continuous improvement.",
      target: "reports-link",
      position: 'top',
      highlight: true,
      arrow: true
    },
    {
      id: 'ai-assistant',
      title: "Get Help Anytime",
      description: "Use the AI Assistant (chat icon) for context-aware help, strategic recommendations, and answers to your questions. It's available on every page.",
      target: "ai-chat-button",
      position: 'left',
      highlight: true,
      arrow: true
    },
    {
      id: 'notifications',
      title: "Stay Updated",
      description: "Check notifications for important updates, deadline reminders, and system alerts. The bell icon shows when you have new notifications.",
      target: "notifications",
      position: 'bottom',
      highlight: true,
      arrow: true
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      markStepCompleted(steps[currentStep].id);
      setCurrentStep(currentStep + 1);
    } else {
      markStepCompleted(steps[currentStep].id);
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    // Mark all steps as completed
    setCompletedSteps(steps.map(step => step.id));
    onClose();
  };

  const markStepCompleted = (stepId: string) => {
    setCompletedSteps(prev => [...prev, stepId]);
  };

  const getTargetElement = (target: string) => {
    return document.querySelector(`[data-tutorial="${target}"]`);
  };

  const getTooltipPosition = (target: string, position: string) => {
    const element = getTargetElement(target);
    if (!element) return { top: '50%', left: '50%' };

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    switch (position) {
      case 'top':
        return {
          top: rect.top + scrollTop - 20,
          left: rect.left + scrollLeft + rect.width / 2,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          top: rect.bottom + scrollTop + 20,
          left: rect.left + scrollLeft + rect.width / 2,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          top: rect.top + scrollTop + rect.height / 2,
          left: rect.left + scrollLeft - 20,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          top: rect.top + scrollTop + rect.height / 2,
          left: rect.right + scrollLeft + 20,
          transform: 'translate(0, -50%)'
        };
      default:
        return {
          top: rect.top + scrollTop + rect.height / 2,
          left: rect.left + scrollLeft + rect.width / 2,
          transform: 'translate(-50%, -50%)'
        };
    }
  };

  const currentStepData = steps[currentStep];
  const tooltipPosition = getTooltipPosition(currentStepData.target, currentStepData.position);

  useEffect(() => {
    // Scroll to target element
    const element = getTargetElement(currentStepData.target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep]);

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 z-50">
        {/* Highlight for current target */}
        {currentStepData.highlight && (
          <div
            className="absolute border-4 border-accent rounded-lg shadow-lg pointer-events-none transition-all duration-500"
            style={{
              top: getTargetElement(currentStepData.target)?.getBoundingClientRect().top,
              left: getTargetElement(currentStepData.target)?.getBoundingClientRect().left,
              width: getTargetElement(currentStepData.target)?.getBoundingClientRect().width,
              height: getTargetElement(currentStepData.target)?.getBoundingClientRect().height,
            }}
          />
        )}

        {/* Tooltip */}
        <div
          className="absolute z-60 max-w-sm"
          style={tooltipPosition}
        >
          {/* Arrow */}
          {currentStepData.arrow && (
            <div
              className={`absolute w-0 h-0 ${
                currentStepData.position === 'top' ? 'border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white top-full left-1/2 transform -translate-x-1/2' :
                currentStepData.position === 'bottom' ? 'border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white bottom-full left-1/2 transform -translate-x-1/2' :
                currentStepData.position === 'left' ? 'border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white left-full top-1/2 transform -translate-y-1/2' :
                'border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white right-full top-1/2 transform -translate-y-1/2'
              }`}
            />
          )}

          <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{currentStep + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{currentStepData.title}</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Progress indicators */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index <= currentStep ? 'bg-accent' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {currentStep + 1} of {steps.length}
              </span>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                    currentStep === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                <button
                  onClick={skipTutorial}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Skip Tour
                </button>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
              >
                <span>{currentStep === steps.length - 1 ? 'Finish Tour' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Sidebar */}
      <div className="fixed top-20 right-6 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-60 max-w-xs">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Tutorial Progress</h4>
          <div className="text-sm text-gray-500">
            {completedSteps.length}/{steps.length}
          </div>
        </div>
        
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center space-x-2 text-sm p-2 rounded-lg transition-colors ${
                index === currentStep ? 'bg-accent/10 text-accent' :
                completedSteps.includes(step.id) ? 'bg-green-50 text-green-700' :
                'text-gray-500'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                completedSteps.includes(step.id) ? 'bg-green-500 text-white' :
                index === currentStep ? 'bg-accent text-white' :
                'bg-gray-200'
              }`}>
                {completedSteps.includes(step.id) ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="flex-1 truncate">{step.title.replace(/[🎉]/g, '').trim()}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {Math.round((completedSteps.length / steps.length) * 100)}% Complete
          </p>
        </div>
      </div>
    </>
  );
};

export default TutorialOverlay;