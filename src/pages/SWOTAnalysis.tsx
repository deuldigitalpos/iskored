import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Target, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Users, ArrowRight, Lightbulb, Link as LinkIcon, Download, Share2 } from 'lucide-react';
import Header from '../components/Header';
import { Link, useLocation } from 'react-router-dom';

interface SWOTItem {
  id: number;
  category: 'strengths' | 'weaknesses' | 'opportunities' | 'threats';
  text: string;
  impact: 'high' | 'medium' | 'low';
  linkedObjectives: string[];
  actionItems: string[];
  createdDate: string;
}

interface SWOTMatrix {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
}

const SWOTAnalysis: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  const [swotMatrix, setSWOTMatrix] = useState<SWOTMatrix>({
    strengths: [
      {
        id: 1,
        category: 'strengths',
        text: 'Strong brand recognition and customer loyalty',
        impact: 'high',
        linkedObjectives: ['Increase Revenue Growth', 'Enhance Customer Satisfaction'],
        actionItems: ['Leverage brand in new markets', 'Develop customer advocacy program'],
        createdDate: '2025-01-15'
      },
      {
        id: 2,
        category: 'strengths',
        text: 'Experienced leadership team with industry expertise',
        impact: 'high',
        linkedObjectives: ['Employee Development'],
        actionItems: ['Mentorship programs', 'Knowledge transfer initiatives'],
        createdDate: '2025-01-15'
      },
      {
        id: 3,
        category: 'strengths',
        text: 'Advanced technology infrastructure',
        impact: 'medium',
        linkedObjectives: ['Digital Transformation'],
        actionItems: ['Optimize current systems', 'Explore AI integration'],
        createdDate: '2025-01-15'
      }
    ],
    weaknesses: [
      {
        id: 4,
        category: 'weaknesses',
        text: 'Limited presence in emerging markets',
        impact: 'high',
        linkedObjectives: ['Revenue Growth'],
        actionItems: ['Market research for expansion', 'Partnership development'],
        createdDate: '2025-01-15'
      },
      {
        id: 5,
        category: 'weaknesses',
        text: 'Aging product portfolio in some segments',
        impact: 'medium',
        linkedObjectives: ['Innovation Pipeline'],
        actionItems: ['Product refresh strategy', 'R&D investment increase'],
        createdDate: '2025-01-15'
      }
    ],
    opportunities: [
      {
        id: 6,
        category: 'opportunities',
        text: 'Growing demand for sustainable solutions',
        impact: 'high',
        linkedObjectives: ['Market Expansion', 'Innovation Pipeline'],
        actionItems: ['Develop green product line', 'Sustainability certification'],
        createdDate: '2025-01-15'
      },
      {
        id: 7,
        category: 'opportunities',
        text: 'Digital transformation trends in target industries',
        impact: 'high',
        linkedObjectives: ['Digital Transformation', 'Customer Experience'],
        actionItems: ['Digital service offerings', 'Technology partnerships'],
        createdDate: '2025-01-15'
      },
      {
        id: 8,
        category: 'opportunities',
        text: 'Potential strategic partnerships with tech companies',
        impact: 'medium',
        linkedObjectives: ['Innovation Pipeline'],
        actionItems: ['Partnership evaluation', 'Joint venture exploration'],
        createdDate: '2025-01-15'
      }
    ],
    threats: [
      {
        id: 9,
        category: 'threats',
        text: 'Increasing competition from new market entrants',
        impact: 'high',
        linkedObjectives: ['Competitive Advantage', 'Market Share Defense'],
        actionItems: ['Competitive analysis', 'Differentiation strategy'],
        createdDate: '2025-01-15'
      },
      {
        id: 10,
        category: 'threats',
        text: 'Economic uncertainty affecting customer spending',
        impact: 'medium',
        linkedObjectives: ['Financial Resilience'],
        actionItems: ['Scenario planning', 'Cost optimization'],
        createdDate: '2025-01-15'
      }
    ]
  });

  const [editingItem, setEditingItem] = useState<{ id: number; field: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showAddForm, setShowAddForm] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    text: '',
    impact: 'medium' as 'high' | 'medium' | 'low',
    linkedObjectives: [] as string[],
    actionItems: [] as string[]
  });
  const [showAIInsights, setShowAIInsights] = useState(true);

  // Mock data for linked objectives (would come from Balance Scorecard)
  const availableObjectives = [
    'Increase Revenue Growth',
    'Enhance Customer Satisfaction',
    'Digital Transformation',
    'Employee Development',
    'Market Expansion',
    'Innovation Pipeline',
    'Competitive Advantage',
    'Market Share Defense',
    'Financial Resilience',
    'Operational Efficiency'
  ];

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'strengths':
        return {
          title: 'Strengths',
          subtitle: 'Internal positive factors',
          color: 'bg-accent',
          lightColor: 'bg-accent/10',
          textColor: 'text-accent',
          icon: <CheckCircle className="w-5 h-5" />
        };
      case 'weaknesses':
        return {
          title: 'Weaknesses',
          subtitle: 'Internal areas for improvement',
          color: 'bg-red-500',
          lightColor: 'bg-red-50',
          textColor: 'text-red-600',
          icon: <AlertTriangle className="w-5 h-5" />
        };
      case 'opportunities':
        return {
          title: 'Opportunities',
          subtitle: 'External positive factors',
          color: 'bg-blue-500',
          lightColor: 'bg-blue-50',
          textColor: 'text-blue-600',
          icon: <TrendingUp className="w-5 h-5" />
        };
      case 'threats':
        return {
          title: 'Threats',
          subtitle: 'External challenges',
          color: 'bg-orange-500',
          lightColor: 'bg-orange-50',
          textColor: 'text-orange-600',
          icon: <AlertTriangle className="w-5 h-5" />
        };
      default:
        return {
          title: '',
          subtitle: '',
          color: 'bg-gray-500',
          lightColor: 'bg-gray-50',
          textColor: 'text-gray-600',
          icon: <div />
        };
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddItem = (category: string) => {
    if (!newItem.text.trim()) return;

    const item: SWOTItem = {
      id: Math.max(...Object.values(swotMatrix).flat().map(item => item.id)) + 1,
      category: category as SWOTItem['category'],
      text: newItem.text,
      impact: newItem.impact,
      linkedObjectives: newItem.linkedObjectives,
      actionItems: newItem.actionItems,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setSWOTMatrix(prev => ({
      ...prev,
      [category]: [...prev[category as keyof SWOTMatrix], item]
    }));

    setNewItem({
      text: '',
      impact: 'medium',
      linkedObjectives: [],
      actionItems: []
    });
    setShowAddForm(null);
  };

  const handleDeleteItem = (category: string, itemId: number) => {
    setSWOTMatrix(prev => ({
      ...prev,
      [category]: prev[category as keyof SWOTMatrix].filter(item => item.id !== itemId)
    }));
  };

  const handleEditItem = (itemId: number, field: string, currentValue: string) => {
    setEditingItem({ id: itemId, field });
    setEditValue(currentValue);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;

    setSWOTMatrix(prev => {
      const newMatrix = { ...prev };
      Object.keys(newMatrix).forEach(category => {
        newMatrix[category as keyof SWOTMatrix] = newMatrix[category as keyof SWOTMatrix].map(item =>
          item.id === editingItem.id
            ? { ...item, [editingItem.field]: editValue }
            : item
        );
      });
      return newMatrix;
    });

    setEditingItem(null);
    setEditValue('');
  };

  const generateStrategies = () => {
    // AI-generated strategic combinations
    return [
      {
        type: 'SO Strategy',
        title: 'Leverage Strengths for Opportunities',
        description: 'Use strong brand recognition to capture growing sustainable solutions market',
        items: ['Brand + Sustainability', 'Leadership + Digital Trends'],
        color: 'bg-accent/10 border-accent/30'
      },
      {
        type: 'WO Strategy',
        title: 'Overcome Weaknesses with Opportunities',
        description: 'Address limited market presence through digital transformation partnerships',
        items: ['Market Expansion + Tech Partnerships', 'Product Portfolio + Sustainability'],
        color: 'bg-blue-50 border-blue-200'
      },
      {
        type: 'ST Strategy',
        title: 'Use Strengths to Counter Threats',
        description: 'Leverage technology infrastructure to defend against new competitors',
        items: ['Technology + Competition', 'Brand Loyalty + Market Threats'],
        color: 'bg-purple-50 border-purple-200'
      },
      {
        type: 'WT Strategy',
        title: 'Minimize Weaknesses and Threats',
        description: 'Strengthen product portfolio to reduce vulnerability to economic uncertainty',
        items: ['Product Refresh + Economic Resilience', 'Market Presence + Competition'],
        color: 'bg-orange-50 border-orange-200'
      }
    ];
  };

  const aiInsights = [
    {
      type: 'strategic',
      title: 'Strategic Priority Recommendation',
      message: 'Your SWOT analysis reveals strong opportunities in sustainability and digital transformation. Consider prioritizing these areas in your next strategic planning cycle.',
      action: 'Review Balance Scorecard objectives'
    },
    {
      type: 'risk',
      title: 'Risk Mitigation Alert',
      message: 'High-impact threats identified around competition and market presence. Recommend developing contingency plans and defensive strategies.',
      action: 'Create action plan items'
    },
    {
      type: 'opportunity',
      title: 'Growth Opportunity',
      message: 'Strong alignment between your technology strengths and digital transformation opportunities. This could be a key differentiator.',
      action: 'Link to innovation objectives'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
      
      <div className="flex">
        {/* Sidebar */}
        <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 overflow-y-auto lg:block hidden transition-all duration-300`}>
          <div className="p-6">
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="Dashboard"
              >
                <BarChart3 className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </Link>
              <Link
                to="/scorecard"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="Balance Scorecard"
              >
                <Target className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">Balance Scorecard</span>}
              </Link>
              <Link
                to="/swot-analysis"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary"
                title="SWOT Analysis"
              >
                <TrendingUp className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">SWOT Analysis</span>}
              </Link>
              <Link
                to="/action-plan"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="Action Plan"
              >
                <Users className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">Action Plan</span>}
              </Link>
              <Link
                to="/reports"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="Reports"
              >
                <TrendingUp className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">Reports</span>}
              </Link>
              <Link
                to="/surveys"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="Surveys"
              >
                <Users className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">Surveys</span>}
              </Link>
              <Link
                to="/"
                className={`flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors mt-8 pt-8 border-t border-gray-200`}
                title="Logout"
              >
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">Logout</span>}
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} pt-16 transition-all duration-300`}>
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">SWOT Analysis</h1>
                <p className="text-gray-600">Strategic analysis of Strengths, Weaknesses, Opportunities, and Threats</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button className="bg-secondary text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors flex items-center text-sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Analysis
                </button>
                <button className="bg-primary text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Integration Links */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mb-8 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Strategic Integration</h3>
                  <p className="text-gray-600 mb-4">Connect your SWOT analysis with strategic planning tools</p>
                </div>
                <LinkIcon className="w-8 h-8 text-primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/scorecard"
                  className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <Target className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Link to Balance Scorecard</div>
                    <div className="text-sm text-gray-600">Convert insights into strategic objectives</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link
                  to="/action-plan"
                  className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <Users className="w-5 h-5 text-accent mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Create Action Plans</div>
                    <div className="text-sm text-gray-600">Turn strategies into executable plans</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>

            {/* AI Insights */}
            {showAIInsights && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Lightbulb className="w-5 h-5 text-accent mr-2" />
                    AI Strategic Insights
                  </h3>
                  <button
                    onClick={() => setShowAIInsights(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      insight.type === 'strategic' ? 'bg-blue-50 border-blue-200' :
                      insight.type === 'risk' ? 'bg-red-50 border-red-200' :
                      'bg-accent/10 border-accent/30'
                    }`}>
                      <h4 className="font-medium text-gray-900 mb-2">{insight.title}</h4>
                      <p className="text-sm text-gray-700 mb-3">{insight.message}</p>
                      <button className="text-sm text-primary hover:text-primary/80 font-medium">
                        {insight.action} →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SWOT Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {Object.entries(swotMatrix).map(([category, items]) => {
                const config = getCategoryConfig(category);
                return (
                  <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className={`${config.color} text-white p-4`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {config.icon}
                          <div className="ml-3">
                            <h3 className="text-lg font-semibold">{config.title}</h3>
                            <p className="text-white/80 text-sm">{config.subtitle}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowAddForm(category)}
                          className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              {editingItem?.id === item.id && editingItem?.field === 'text' ? (
                                <div className="flex items-center space-x-2">
                                  <textarea
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="flex-1 px-2 py-1 border border-accent rounded text-sm resize-none"
                                    rows={2}
                                    autoFocus
                                  />
                                  <button onClick={handleSaveEdit} className="text-accent hover:text-accent/80">
                                    <Save className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <p 
                                  className="text-gray-900 cursor-pointer hover:text-primary transition-colors"
                                  onClick={() => handleEditItem(item.id, 'text', item.text)}
                                >
                                  {item.text}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 ml-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
                                {item.impact}
                              </span>
                              <button
                                onClick={() => handleDeleteItem(category, item.id)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Linked Objectives */}
                          {item.linkedObjectives.length > 0 && (
                            <div className="mb-2">
                              <div className="text-xs text-gray-600 mb-1">Linked Objectives:</div>
                              <div className="flex flex-wrap gap-1">
                                {item.linkedObjectives.map((objective, index) => (
                                  <span key={index} className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                                    <Target className="w-3 h-3 mr-1" />
                                    {objective}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Action Items */}
                          {item.actionItems.length > 0 && (
                            <div>
                              <div className="text-xs text-gray-600 mb-1">Action Items:</div>
                              <div className="space-y-1">
                                {item.actionItems.map((action, index) => (
                                  <div key={index} className="text-xs text-gray-700 flex items-center">
                                    <CheckCircle className="w-3 h-3 text-accent mr-1 flex-shrink-0" />
                                    {action}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Add Form */}
                      {showAddForm === category && (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                          <textarea
                            value={newItem.text}
                            onChange={(e) => setNewItem(prev => ({ ...prev, text: e.target.value }))}
                            placeholder={`Add new ${category.slice(0, -1)}...`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none"
                            rows={2}
                          />
                          <div className="flex items-center justify-between mt-3">
                            <select
                              value={newItem.impact}
                              onChange={(e) => setNewItem(prev => ({ ...prev, impact: e.target.value as 'high' | 'medium' | 'low' }))}
                              className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                            >
                              <option value="low">Low Impact</option>
                              <option value="medium">Medium Impact</option>
                              <option value="high">High Impact</option>
                            </select>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleAddItem(category)}
                                className="bg-accent text-white px-3 py-1 rounded text-xs hover:bg-accent/90 transition-colors"
                              >
                                Add
                              </button>
                              <button
                                onClick={() => setShowAddForm(null)}
                                className="text-gray-600 hover:text-gray-800 px-3 py-1 text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Strategic Combinations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI-Generated Strategic Combinations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generateStrategies().map((strategy, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${strategy.color}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{strategy.type}</h4>
                      <button className="text-primary hover:text-primary/80">
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <h5 className="font-medium text-gray-800 mb-2">{strategy.title}</h5>
                    <p className="text-sm text-gray-700 mb-3">{strategy.description}</p>
                    <div className="space-y-1">
                      {strategy.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-xs text-gray-600 flex items-center">
                          <ArrowRight className="w-3 h-3 mr-1 text-gray-400" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWOTAnalysis;