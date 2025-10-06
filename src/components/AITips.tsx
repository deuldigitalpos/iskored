import React, { useState, useEffect } from 'react';
import { X, Lightbulb, TrendingUp, Target, Users, BarChart3, ArrowRight } from 'lucide-react';

interface AITip {
  id: string;
  title: string;
  message: string;
  type: 'insight' | 'recommendation' | 'warning' | 'success';
  action?: {
    label: string;
    onClick: () => void;
  };
  priority: 'high' | 'medium' | 'low';
}

interface AITipsProps {
  currentPage: string;
}

const AITips: React.FC<AITipsProps> = ({ currentPage }) => {
  const [activeTip, setActiveTip] = useState<AITip | null>(null);
  const [dismissedTips, setDismissedTips] = useState<string[]>([]);

  const tips: Record<string, AITip[]> = {
    dashboard: [
      {
        id: 'dashboard-welcome',
        title: '🎯 Strategic Focus Tip',
        message: 'Your customer satisfaction scores are trending upward! Consider expanding successful initiatives to maintain momentum.',
        type: 'insight',
        action: {
          label: 'View Customer Metrics',
          onClick: () => window.location.href = '/reports'
        },
        priority: 'high'
      },
      {
        id: 'dashboard-objectives',
        title: '⚠️ Deadline Alert',
        message: '3 objectives are approaching their deadlines this month. Review action plans to ensure timely completion.',
        type: 'warning',
        action: {
          label: 'Review Action Plans',
          onClick: () => window.location.href = '/action-plan'
        },
        priority: 'high'
      },
      {
        id: 'dashboard-survey',
        title: '📊 Data Collection Opportunity',
        message: 'You haven\'t sent a stakeholder survey in 3 months. Fresh insights can help refine your strategic priorities.',
        type: 'recommendation',
        action: {
          label: 'Create Survey',
          onClick: () => window.location.href = '/surveys'
        },
        priority: 'medium'
      }
    ],
    scorecard: [
      {
        id: 'scorecard-balance',
        title: '⚖️ Perspective Balance',
        message: 'You have 5 objectives in the Financial perspective. Consider limiting to 3-5 objectives per perspective for optimal focus.',
        type: 'recommendation',
        priority: 'medium'
      },
      {
        id: 'scorecard-metrics',
        title: '📈 Measurement Excellence',
        message: 'Great job! Your objectives have clear, measurable targets. This will make tracking progress much easier.',
        type: 'success',
        priority: 'low'
      }
    ],
    'action-plan': [
      {
        id: 'action-unrealistic-target',
        title: '🎯 Target Optimization',
        message: 'Some targets seem ambitious. Consider breaking large objectives into smaller, achievable milestones.',
        type: 'recommendation',
        priority: 'medium'
      },
      {
        id: 'action-deadline-warning',
        title: '⏰ Timeline Alert',
        message: 'Several action items have tight deadlines. Based on similar projects, consider extending timelines by 2-4 weeks.',
        type: 'warning',
        priority: 'high'
      }
    ],
    surveys: [
      {
        id: 'survey-length',
        title: '📝 Survey Optimization',
        message: 'Surveys with 8-12 questions typically have 40% higher completion rates than longer surveys.',
        type: 'insight',
        priority: 'medium'
      },
      {
        id: 'survey-timing',
        title: '⏱️ Response Rate Tip',
        message: 'Sending surveys on Tuesday-Thursday typically yields 25% higher response rates.',
        type: 'recommendation',
        priority: 'low'
      }
    ],
    reports: [
      {
        id: 'reports-benchmark',
        title: '🏆 Performance Insight',
        message: 'Your revenue growth exceeds industry average by 15%! Consider documenting and scaling successful strategies.',
        type: 'success',
        action: {
          label: 'View Benchmarks',
          onClick: () => console.log('Navigate to benchmarks')
        },
        priority: 'high'
      }
    ]
  };

  useEffect(() => {
    const pageTips = tips[currentPage] || [];
    const availableTips = pageTips.filter(tip => !dismissedTips.includes(tip.id));
    
    if (availableTips.length > 0) {
      // Show highest priority tip first
      const sortedTips = availableTips.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
      
      // Show tip after a delay
      const timer = setTimeout(() => {
        setActiveTip(sortedTips[0]);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentPage, dismissedTips]);

  const dismissTip = (tipId: string) => {
    setDismissedTips(prev => [...prev, tipId]);
    setActiveTip(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'insight': return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'recommendation': return <Lightbulb className="w-5 h-5 text-yellow-600" />;
      case 'warning': return <Target className="w-5 h-5 text-orange-600" />;
      case 'success': return <BarChart3 className="w-5 h-5 text-green-600" />;
      default: return <Lightbulb className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'insight': return 'bg-blue-50 border-blue-200';
      case 'recommendation': return 'bg-yellow-50 border-yellow-200';
      case 'warning': return 'bg-orange-50 border-orange-200';
      case 'success': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  if (!activeTip) return null;

  return (
    <div className="fixed bottom-6 left-6 max-w-sm z-50 animate-slide-up">
      <div className={`rounded-xl shadow-lg border-2 p-4 ${getTypeColor(activeTip.type)}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getTypeIcon(activeTip.type)}
            <h4 className="font-semibold text-gray-900 text-sm">{activeTip.title}</h4>
          </div>
          <button
            onClick={() => dismissTip(activeTip.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
          {activeTip.message}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">
            AI Assistant
          </span>
          
          {activeTip.action && (
            <button
              onClick={activeTip.action.onClick}
              className="flex items-center space-x-1 text-accent hover:text-accent/80 text-sm font-medium transition-colors"
            >
              <span>{activeTip.action.label}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITips;