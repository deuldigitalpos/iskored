import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Target, Users, TrendingUp, Bell, Plus, ArrowRight, Search, Filter, Calendar, ChevronDown, Lightbulb, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import AITips from '../components/AITips';

interface DashboardProps {
  onShowTutorial: () => void;
  onShowAIChat: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onShowTutorial, onShowAIChat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);

  const onboardingTasks = [
    { id: 1, title: 'Complete your profile', completed: true, link: '/complete-profile' },
    { id: 2, title: 'Send your first survey', completed: false, link: '/surveys' },
    { id: 3, title: 'Create balance scorecard', completed: false, link: '/scorecard' },
    { id: 4, title: 'Set up action plans', completed: false, link: '/action-plan' },
    { id: 5, title: 'Invite team members', completed: false, link: '/settings' }
  ];

  const completedTasks = onboardingTasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / onboardingTasks.length) * 100;

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
        <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 overflow-y-auto lg:block hidden transition-all duration-300`} data-tutorial="sidebar-navigation">
          <div className="p-6">
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary"
                title="Dashboard"
              >
                <BarChart3 className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </Link>
              <Link
                to="/scorecard"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="Balance Scorecard"
                data-tutorial="scorecard-link"
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
                data-tutorial="action-plan-link"
              >
                <Users className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">Action Plan</span>}
              </Link>
              <Link
                to="/reports"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="Reports"
                data-tutorial="reports-link"
              >
                <TrendingUp className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">Reports</span>}
              </Link>
              <Link
                to="/surveys"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="Surveys"
                data-tutorial="surveys-link"
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
            {/* Welcome Banner */}
            {showWelcomeCard && (
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-6 px-6 rounded-xl mb-8 relative overflow-hidden" data-tutorial="dashboard-welcome">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
                      <p className="text-white/90 mb-4">Ready to drive your strategic objectives forward? Let's continue building your success story.</p>
                      
                      {/* Progress indicator */}
                      <div className="bg-white/20 rounded-lg p-3 mb-4 max-w-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Setup Progress</span>
                          <span className="text-sm">{completedTasks}/{onboardingTasks.length} completed</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-accent h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={onShowTutorial}
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Take Tour
                      </button>
                      <button
                        onClick={onShowAIChat}
                        className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center"
                        data-tutorial="ai-chat-button"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Ask AI Assistant
                      </button>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowWelcomeCard(false)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8" data-tutorial="quick-stats">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Objectives</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 text-accent mr-1" />
                  <span className="text-sm text-accent">↗ 8% from last month</span>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Surveys Completed</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">24/30</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-1" />
                  <span className="text-sm text-accent">80% completion rate</span>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Goals on Track</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">18/24</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <Target className="w-4 h-4 text-accent mr-1" />
                  <span className="text-sm text-accent">75% success rate</span>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overall Score</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">8.2/10</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 text-accent mr-1" />
                  <span className="text-sm text-accent">↗ +0.3 this quarter</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
              {/* Main Content */}
              <div className="xl:col-span-2 space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6" data-tutorial="quick-actions">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                      to="/scorecard"
                      className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20">
                          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base">Update Scorecard</h3>
                          <p className="text-xs sm:text-sm text-gray-600">Review and update objectives</p>
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/surveys"
                      className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base">Send Survey</h3>
                          <p className="text-xs sm:text-sm text-gray-600">Gather stakeholder feedback</p>
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/action-plan"
                      className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20">
                          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base">Create Action Plan</h3>
                          <p className="text-xs sm:text-sm text-gray-600">Define goals and tasks</p>
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/reports"
                      className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20">
                          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base">View Reports</h3>
                          <p className="text-xs sm:text-sm text-gray-600">Analyze performance data</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base text-gray-900">Customer satisfaction survey completed</p>
                        <p className="text-xs sm:text-sm text-gray-600">2 hours ago • 156 responses received</p>
                      </div>
                      <CheckCircle className="w-4 h-4 text-accent mt-1" />
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base text-gray-900">Q4 financial objectives updated</p>
                        <p className="text-xs sm:text-sm text-gray-600">1 day ago • 3 objectives modified</p>
                      </div>
                      <Clock className="w-4 h-4 text-gray-400 mt-1" />
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base text-gray-900">New team member added to Marketing initiative</p>
                        <p className="text-xs sm:text-sm text-gray-600">2 days ago • Sarah Johnson joined</p>
                      </div>
                      <Users className="w-4 h-4 text-primary mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Onboarding Checklist */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Getting Started</h3>
                    <span className="text-sm text-accent font-medium">{completedTasks}/{onboardingTasks.length}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{Math.round(progressPercentage)}% complete</p>
                  </div>
                  
                  <div className="space-y-3">
                    {onboardingTasks.map(task => (
                      <div key={task.id} className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          task.completed ? 'bg-accent text-white' : 'bg-gray-200'
                        }`}>
                          {task.completed && <CheckCircle className="w-3 h-3" />}
                        </div>
                        <Link 
                          to={task.link}
                          className={`flex-1 text-sm hover:text-accent transition-colors ${
                            task.completed ? 'text-gray-500 line-through' : 'text-gray-700'
                          }`}
                        >
                          {task.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 sm:p-6 border border-accent/20">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Lightbulb className="w-5 h-5 text-accent mr-2" />
                    AI Insights
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 mb-2">
                        Your customer satisfaction scores are trending upward. Consider expanding successful initiatives.
                      </p>
                      <span className="text-xs text-accent font-medium">High Impact</span>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 mb-2">
                        3 objectives are approaching their deadlines. Review action plans to ensure timely completion.
                      </p>
                      <span className="text-xs text-orange-600 font-medium">Attention Needed</span>
                    </div>
                    <button
                      onClick={onShowAIChat}
                      className="text-accent hover:text-accent/80 text-sm font-medium flex items-center w-full justify-center pt-2 border-t border-accent/20"
                    >
                      Ask AI for more insights
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Notifications</h3>
                    <div className="relative" data-tutorial="notifications">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-secondary rounded-full"></span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-yellow-800 font-medium">Survey deadline approaching</p>
                          <p className="text-xs text-yellow-700">Customer feedback survey ends in 2 days</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <BarChart3 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-blue-800 font-medium">New benchmark data available</p>
                          <p className="text-xs text-blue-700">Updated industry benchmarks for your sector</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-green-800 font-medium">Goal completed</p>
                          <p className="text-xs text-green-700">Increase customer retention by 15%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Financial Objectives</span>
                        <span className="text-gray-900 font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Customer Objectives</span>
                        <span className="text-gray-900 font-medium">72%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full transition-all duration-500" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Internal Process</span>
                        <span className="text-gray-900 font-medium">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Learning & Growth</span>
                        <span className="text-gray-900 font-medium">91%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '91%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tips Component */}
      <AITips currentPage="dashboard" />
    </div>
  );
};

export default Dashboard;