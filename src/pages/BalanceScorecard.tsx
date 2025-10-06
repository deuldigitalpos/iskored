import React, { useState } from 'react';
import { Plus, Edit, Trash2, AlertTriangle, Search, Filter, BarChart3, Target, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import { Link, useLocation } from 'react-router-dom';

interface Objective {
  id: number;
  perspective: string;
  title: string;
  measure: string;
  target: string;
  initiative: string;
  status: 'on-track' | 'at-risk' | 'behind';
  progress: number;
}

const BalanceScorecard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  const [objectives, setObjectives] = useState<Objective[]>([
    {
      id: 1,
      perspective: 'Financial',
      title: 'Increase Revenue Growth',
      measure: 'Annual Revenue',
      target: '15% YoY Growth',
      initiative: 'Expand into new markets',
      status: 'on-track',
      progress: 85
    },
    {
      id: 2,
      perspective: 'Financial',
      title: 'Improve Profit Margins',
      measure: 'Net Profit Margin',
      target: '12% by Q4',
      initiative: 'Cost optimization program',
      status: 'at-risk',
      progress: 65
    },
    {
      id: 3,
      perspective: 'Customer',
      title: 'Enhance Customer Satisfaction',
      measure: 'NPS Score',
      target: 'NPS > 70',
      initiative: 'Customer experience improvement',
      status: 'on-track',
      progress: 78
    },
    {
      id: 4,
      perspective: 'Customer',
      title: 'Reduce Customer Churn',
      measure: 'Churn Rate',
      target: '< 5% monthly',
      initiative: 'Customer success program',
      status: 'behind',
      progress: 45
    },
    {
      id: 5,
      perspective: 'Internal Process',
      title: 'Streamline Operations',
      measure: 'Process Efficiency',
      target: '20% improvement',
      initiative: 'Digital transformation',
      status: 'on-track',
      progress: 72
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPerspective, setSelectedPerspective] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const perspectives = ['All', 'Financial', 'Customer', 'Internal Process', 'Learning & Growth'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-accent bg-accent/10';
      case 'at-risk': return 'text-yellow-600 bg-yellow-100';
      case 'behind': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-accent';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredObjectives = objectives.filter(obj => {
    const matchesPerspective = selectedPerspective === 'All' || obj.perspective === selectedPerspective;
    const matchesSearch = obj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obj.measure.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPerspective && matchesSearch;
  });

  const objectivesByPerspective = perspectives.slice(1).map(perspective => ({
    perspective,
    objectives: objectives.filter(obj => obj.perspective === perspective),
    count: objectives.filter(obj => obj.perspective === perspective).length
  }));

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
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary"
                title="Balance Scorecard"
              >
                <Target className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">Balance Scorecard</span>}
              </Link>
              <Link
                to="/swot-analysis"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Balance Scorecard</h1>
                <p className="text-gray-600">Strategic objectives across four key perspectives</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-4 md:mt-0 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Add Objective
              </button>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Vision Statement</h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  To be the leading provider of innovative solutions that transform how organizations achieve their strategic objectives through data-driven insights and AI-powered recommendations.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Mission Statement</h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  We empower organizations to align their teams, track performance, and achieve measurable results through our comprehensive strategic performance platform.
                </p>
              </div>
            </div>

            {/* AI Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">AI Recommendation</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    You have 5 objectives in the Financial perspective. Consider limiting to 3-5 objectives per perspective for optimal focus and execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden mb-6">
              <div className="flex flex-wrap gap-2">
                {perspectives.map(perspective => (
                  <button
                    key={perspective}
                    onClick={() => setSelectedPerspective(perspective)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                      selectedPerspective === perspective
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {perspective}
                    {perspective !== 'All' && (
                      <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                        {objectives.filter(obj => obj.perspective === perspective).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Objectives Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Perspective</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Objective</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Measure</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Target</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Initiative</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Progress</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredObjectives.map((objective) => (
                      <tr key={objective.id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {objective.perspective}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="font-medium text-gray-900 text-sm sm:text-base">{objective.title}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-sm sm:text-base">{objective.measure}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-sm sm:text-base">{objective.target}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-sm sm:text-base">{objective.initiative}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(objective.status)}`}>
                            {objective.status.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${getProgressColor(objective.progress)}`}
                                style={{ width: `${objective.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-600">{objective.progress}%</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex space-x-2">
                            <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Perspective Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
              {objectivesByPerspective.map(({ perspective, objectives: perspectiveObjectives, count }) => {
                const avgProgress = perspectiveObjectives.length > 0 
                  ? perspectiveObjectives.reduce((sum, obj) => sum + obj.progress, 0) / perspectiveObjectives.length 
                  : 0;
                
                return (
                  <div key={perspective} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{perspective}</h3>
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{count}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mb-3">Objectives</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(avgProgress)}`}
                        style={{ width: `${avgProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">{Math.round(avgProgress)}% Average Progress</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceScorecard;