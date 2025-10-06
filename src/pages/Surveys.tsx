import React, { useState } from 'react';
import { Plus, Send, Users, BarChart3, Clock, CheckCircle, AlertCircle, Eye, Edit, Trash2, Copy, X, Search, Filter, Target, TrendingUp, ArrowRight, Share2 } from 'lucide-react';
import Header from '../components/Header';
import SurveySharing from '../components/SurveySharing';
import { Link, useLocation } from 'react-router-dom';

interface Contact {
  id: number;
  name: string;
  email: string;
  title?: string;
  status: 'pending' | 'sent' | 'opened' | 'completed' | 'bounced';
  sentDate?: string;
  completedDate?: string;
}

interface Survey {
  id: number;
  title: string;
  description: string;
  type: 'stakeholder' | 'customer' | 'employee' | 'custom';
  status: 'draft' | 'active' | 'completed' | 'paused';
  responses: number;
  totalSent: number;
  createdDate: string;
  dueDate: string;
  questions: SurveyQuestion[];
  contacts?: Contact[];
}

interface SurveyQuestion {
  id: number;
  type: 'multiple-choice' | 'rating' | 'text' | 'yes-no';
  question: string;
  options?: string[];
  required: boolean;
}

const Surveys: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: 1,
      title: 'Q1 2025 Stakeholder Feedback',
      description: 'Gather insights on strategic priorities and performance expectations',
      type: 'stakeholder',
      status: 'active',
      responses: 24,
      totalSent: 30,
      createdDate: '2025-01-15',
      dueDate: '2025-02-15',
      questions: [],
      contacts: [
        { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', status: 'completed', sentDate: '2025-01-15', completedDate: '2025-01-16' },
        { id: 2, name: 'Mike Chen', email: 'mike@company.com', status: 'sent', sentDate: '2025-01-15' },
        { id: 3, name: 'Lisa Rodriguez', email: 'lisa@company.com', status: 'opened', sentDate: '2025-01-15' }
      ]
    },
    {
      id: 2,
      title: 'Customer Satisfaction Survey',
      description: 'Measure customer satisfaction and identify improvement areas',
      type: 'customer',
      status: 'completed',
      responses: 156,
      totalSent: 200,
      createdDate: '2024-12-01',
      dueDate: '2025-01-01',
      questions: []
    },
    {
      id: 3,
      title: 'Employee Engagement Assessment',
      description: 'Annual employee engagement and culture assessment',
      type: 'employee',
      status: 'draft',
      responses: 0,
      totalSent: 0,
      createdDate: '2025-01-20',
      dueDate: '2025-03-01',
      questions: []
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSharingModal, setShowSharingModal] = useState<number | null>(null);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [showAIWarning, setShowAIWarning] = useState(false);
  const [aiWarningMessage, setAIWarningMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [newSurvey, setNewSurvey] = useState({
    title: '',
    description: '',
    type: 'stakeholder' as Survey['type'],
    dueDate: '',
    questions: [] as SurveyQuestion[]
  });

  const surveyTemplates = [
    {
      type: 'stakeholder',
      title: 'Stakeholder Feedback Survey',
      description: 'Gather strategic insights from key stakeholders',
      questions: [
        { id: 1, type: 'rating', question: 'How satisfied are you with our current strategic direction?', required: true },
        { id: 2, type: 'multiple-choice', question: 'Which area should be our top priority?', options: ['Revenue Growth', 'Customer Experience', 'Operational Efficiency', 'Innovation'], required: true },
        { id: 3, type: 'text', question: 'What specific improvements would you like to see?', required: false }
      ]
    },
    {
      type: 'customer',
      title: 'Customer Satisfaction Survey',
      description: 'Measure customer satisfaction and loyalty',
      questions: [
        { id: 1, type: 'rating', question: 'How likely are you to recommend us to others? (NPS)', required: true },
        { id: 2, type: 'rating', question: 'How satisfied are you with our product/service?', required: true },
        { id: 3, type: 'multiple-choice', question: 'What is most important to you?', options: ['Price', 'Quality', 'Customer Service', 'Innovation'], required: true }
      ]
    },
    {
      type: 'employee',
      title: 'Employee Engagement Survey',
      description: 'Assess employee satisfaction and engagement',
      questions: [
        { id: 1, type: 'rating', question: 'How engaged do you feel at work?', required: true },
        { id: 2, type: 'yes-no', question: 'Do you feel your work contributes to company goals?', required: true },
        { id: 3, type: 'text', question: 'What would improve your work experience?', required: false }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-accent text-white';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stakeholder': return 'bg-primary/10 text-primary';
      case 'customer': return 'bg-secondary/10 text-secondary';
      case 'employee': return 'bg-accent/10 text-accent';
      case 'custom': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const validateSurveyAI = (survey: any) => {
    // AI validation for survey creation
    if (survey.questions.length > 15) {
      setAIWarningMessage('⚠️ AI Alert: Surveys with more than 15 questions typically have lower completion rates. Consider reducing to 8-12 questions for better engagement.');
      setShowAIWarning(true);
      setTimeout(() => setShowAIWarning(false), 8000);
    }

    const dueDate = new Date(survey.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
      setAIWarningMessage('⚠️ AI Alert: Short survey periods typically result in lower response rates. Consider extending the deadline by at least 2 weeks for better participation.');
      setShowAIWarning(true);
      setTimeout(() => setShowAIWarning(false), 8000);
    }
  };

  const handleCreateSurvey = () => {
    if (!newSurvey.title || !newSurvey.dueDate) return;

    // AI validation
    validateSurveyAI(newSurvey);

    const template = surveyTemplates.find(t => t.type === newSurvey.type);
    
    const survey: Survey = {
      id: Math.max(...surveys.map(s => s.id)) + 1,
      title: newSurvey.title,
      description: newSurvey.description || template?.description || '',
      type: newSurvey.type,
      status: 'draft',
      responses: 0,
      totalSent: 0,
      createdDate: new Date().toISOString().split('T')[0],
      dueDate: newSurvey.dueDate,
      questions: template?.questions || []
    };

    setSurveys(prev => [...prev, survey]);
    setShowCreateModal(false);
    setNewSurvey({
      title: '',
      description: '',
      type: 'stakeholder',
      dueDate: '',
      questions: []
    });
  };

  const handleSendSurvey = (surveyId: number) => {
    setShowSharingModal(surveyId);
  };

  const handleSharingComplete = (surveyId: number, contacts: Contact[]) => {
    setSurveys(prev => prev.map(survey => 
      survey.id === surveyId 
        ? { 
            ...survey, 
            status: 'active' as const, 
            totalSent: contacts.length,
            contacts: contacts
          }
        : survey
    ));
    setShowSharingModal(null);
  };

  // Filter surveys
  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || survey.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedSurveyForSharing = surveys.find(s => s.id === showSharingModal);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
      
      {/* AI Warning Notification */}
      {showAIWarning && (
        <div className="fixed top-20 right-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg z-50 max-w-md">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-yellow-800">{aiWarningMessage}</p>
            </div>
            <button 
              onClick={() => setShowAIWarning(false)}
              className="ml-2 text-yellow-400 hover:text-yellow-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

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
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary"
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Surveys</h1>
                <p className="text-gray-600">Create and manage stakeholder feedback surveys</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 md:mt-0 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Create Survey
              </button>
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden mb-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search surveys..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                >
                  <option value="All">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            </div>

            {/* Surveys Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredSurveys.map(survey => (
                <div key={survey.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{survey.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">{survey.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(survey.type)}`}>
                          {survey.type}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(survey.status)}`}>
                          {survey.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  {survey.totalSent > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Responses</span>
                        <span className="text-gray-900">{survey.responses}/{survey.totalSent}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(survey.responses / survey.totalSent) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round((survey.responses / survey.totalSent) * 100)}% completion rate
                      </div>
                    </div>
                  )}

                  {/* Contact Status Summary */}
                  {survey.contacts && survey.contacts.length > 0 && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-xs font-medium text-gray-700 mb-2">Response Status</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span className="font-medium text-accent">
                            {survey.contacts.filter(c => c.status === 'completed').length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Opened:</span>
                          <span className="font-medium text-blue-600">
                            {survey.contacts.filter(c => c.status === 'opened').length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Sent:</span>
                          <span className="font-medium text-yellow-600">
                            {survey.contacts.filter(c => c.status === 'sent').length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Pending:</span>
                          <span className="font-medium text-gray-600">
                            {survey.contacts.filter(c => c.status === 'pending').length}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="text-xs text-gray-500 mb-4">
                    <div>Created: {new Date(survey.createdDate).toLocaleDateString()}</div>
                    <div>Due: {new Date(survey.dueDate).toLocaleDateString()}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-primary transition-colors" title="View">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-primary transition-colors" title="Edit">
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-primary transition-colors" title="Duplicate">
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      {survey.status === 'active' && (
                        <button
                          onClick={() => handleSendSurvey(survey.id)}
                          className="bg-secondary text-white px-3 py-1 rounded text-xs hover:bg-secondary/90 transition-colors flex items-center"
                          title="Share Survey"
                        >
                          <Share2 className="w-3 h-3 mr-1" />
                          Share
                        </button>
                      )}
                      {survey.status === 'draft' && (
                        <button
                          onClick={() => handleSendSurvey(survey.id)}
                          className="bg-accent text-white px-3 py-1 rounded text-xs hover:bg-accent/90 transition-colors flex items-center"
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Send
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Survey Sharing Modal */}
      {showSharingModal && selectedSurveyForSharing && (
        <SurveySharing
          surveyId={showSharingModal}
          surveyTitle={selectedSurveyForSharing.title}
          onClose={() => setShowSharingModal(null)}
          onComplete={(contacts) => handleSharingComplete(showSharingModal, contacts)}
        />
      )}

      {/* Create Survey Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Create New Survey</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Survey Title *</label>
                  <input
                    type="text"
                    value={newSurvey.title}
                    onChange={(e) => setNewSurvey(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    placeholder="Enter survey title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newSurvey.description}
                    onChange={(e) => setNewSurvey(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    rows={3}
                    placeholder="Brief description of the survey purpose"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Survey Type *</label>
                    <select
                      value={newSurvey.type}
                      onChange={(e) => setNewSurvey(prev => ({ ...prev, type: e.target.value as Survey['type'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    >
                      <option value="stakeholder">Stakeholder</option>
                      <option value="customer">Customer</option>
                      <option value="employee">Employee</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                    <input
                      type="date"
                      value={newSurvey.dueDate}
                      onChange={(e) => setNewSurvey(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    />
                  </div>
                </div>

                {/* Preview Questions */}
                {surveyTemplates.find(t => t.type === newSurvey.type) && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Template Questions Preview</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {surveyTemplates.find(t => t.type === newSurvey.type)?.questions.map((q, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{index + 1}. </span>
                          <span className="text-gray-700">{q.question}</span>
                          <span className="text-xs text-gray-500 ml-2">({q.type})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSurvey}
                  disabled={!newSurvey.title || !newSurvey.dueDate}
                  className="bg-primary text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Survey
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Surveys;