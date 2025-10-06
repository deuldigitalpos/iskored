import React, { useState } from 'react';
import { Plus, Calendar, User, Flag, CheckCircle, Clock, AlertCircle, Edit3, Save, X, Filter, Search, Download, BarChart3, Target, Users, TrendingUp, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import { Link, useLocation } from 'react-router-dom';

interface ActionItem {
  id: number;
  strategicPriority: string;
  goalDescription: string;
  actionSteps: string;
  lead: string;
  contributors: string;
  performanceTarget: string;
  status: 'Not Started' | 'On Track' | 'Off Track' | 'Completed';
  risk: 'Low' | 'Medium' | 'High';
  startDate: string;
  dueDate: string;
  dateCompleted: string;
}

const ActionPlan: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      id: 1,
      strategicPriority: 'Revenue Growth',
      goalDescription: 'Expand into 3 new geographical markets to increase revenue by 15%',
      actionSteps: 'Conduct market research, establish partnerships, launch marketing campaigns',
      lead: 'Sarah Johnson',
      contributors: 'Mike Chen, Lisa Rodriguez',
      performanceTarget: '15% revenue increase',
      status: 'On Track',
      risk: 'Medium',
      startDate: '2025-01-15',
      dueDate: '2025-06-30',
      dateCompleted: ''
    },
    {
      id: 2,
      strategicPriority: 'Customer Experience',
      goalDescription: 'Improve customer satisfaction score to above 8.5/10',
      actionSteps: 'Implement new support system, train staff, gather feedback',
      lead: 'Emma Davis',
      contributors: 'David Wilson, Rachel Kim',
      performanceTarget: 'NPS > 70',
      status: 'Completed',
      risk: 'Low',
      startDate: '2024-12-01',
      dueDate: '2025-03-31',
      dateCompleted: '2025-01-20'
    },
    {
      id: 3,
      strategicPriority: 'Digital Transformation',
      goalDescription: 'Implement new CRM system to improve operational efficiency by 20%',
      actionSteps: 'Vendor selection, system integration, staff training, data migration',
      lead: 'Alex Thompson',
      contributors: 'IT Team, Operations',
      performanceTarget: '20% efficiency gain',
      status: 'Off Track',
      risk: 'High',
      startDate: '2025-01-01',
      dueDate: '2025-04-30',
      dateCompleted: ''
    },
    {
      id: 4,
      strategicPriority: 'Employee Development',
      goalDescription: 'Launch comprehensive leadership development program',
      actionSteps: 'Design curriculum, select trainers, schedule sessions, track progress',
      lead: 'Jennifer Lee',
      contributors: 'HR Team, External Trainers',
      performanceTarget: '90% completion rate',
      status: 'On Track',
      risk: 'Low',
      startDate: '2025-02-01',
      dueDate: '2025-08-31',
      dateCompleted: ''
    },
    {
      id: 5,
      strategicPriority: 'Cost Optimization',
      goalDescription: 'Reduce operational costs by 12% through process improvements',
      actionSteps: 'Process audit, identify inefficiencies, implement automation',
      lead: 'Michael Rodriguez',
      contributors: 'Finance, Operations',
      performanceTarget: '12% cost reduction',
      status: 'Not Started',
      risk: 'Medium',
      startDate: '2025-03-01',
      dueDate: '2025-09-30',
      dateCompleted: ''
    }
  ]);

  const [editingCell, setEditingCell] = useState<{ id: number; field: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showAIWarning, setShowAIWarning] = useState(false);
  const [aiWarningMessage, setAIWarningMessage] = useState('');

  const statusOptions = ['Not Started', 'On Track', 'Off Track', 'Completed'];
  const riskOptions = ['Low', 'Medium', 'High'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-accent text-white';
      case 'On Track': return 'bg-blue-100 text-blue-800';
      case 'Off Track': return 'bg-red-100 text-red-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const validateAIInput = (field: string, value: string) => {
    // AI validation logic
    if (field === 'performanceTarget') {
      const percentMatch = value.match(/(\d+)%/);
      if (percentMatch) {
        const percent = parseInt(percentMatch[1]);
        if (percent > 50) {
          setAIWarningMessage(`⚠️ AI Alert: A ${percent}% target seems unrealistic. Industry benchmarks suggest targets between 10-30% are more achievable. Consider breaking this into smaller milestones.`);
          setShowAIWarning(true);
          setTimeout(() => setShowAIWarning(false), 8000);
        }
      }
    }
    
    if (field === 'dueDate') {
      const dueDate = new Date(value);
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        setAIWarningMessage(`⚠️ AI Alert: This deadline is very tight (${diffDays} days). Based on similar projects, consider extending by 2-4 weeks to ensure quality delivery.`);
        setShowAIWarning(true);
        setTimeout(() => setShowAIWarning(false), 8000);
      }
    }
  };

  const handleCellClick = (id: number, field: string, currentValue: string) => {
    setEditingCell({ id, field });
    setEditValue(currentValue);
  };

  const handleSave = () => {
    if (!editingCell) return;

    // AI validation before saving
    validateAIInput(editingCell.field, editValue);

    setActionItems(prev => prev.map(item => 
      item.id === editingCell.id 
        ? { ...item, [editingCell.field]: editValue }
        : item
    ));
    setEditingCell(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const addNewRow = () => {
    const newItem: ActionItem = {
      id: Math.max(...actionItems.map(item => item.id)) + 1,
      strategicPriority: '',
      goalDescription: '',
      actionSteps: '',
      lead: '',
      contributors: '',
      performanceTarget: '',
      status: 'Not Started',
      risk: 'Low',
      startDate: '',
      dueDate: '',
      dateCompleted: ''
    };
    setActionItems(prev => [...prev, newItem]);
  };

  // Filter logic
  const filteredItems = actionItems.filter(item => {
    const matchesSearch = item.goalDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.strategicPriority.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.lead.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesRisk = riskFilter === 'All' || item.risk === riskFilter;
    const matchesPriority = priorityFilter === 'All' || item.strategicPriority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesRisk && matchesPriority;
  });

  const uniquePriorities = [...new Set(actionItems.map(item => item.strategicPriority))];

  const renderEditableCell = (item: ActionItem, field: keyof ActionItem, isDropdown = false, options: string[] = []) => {
    const isEditing = editingCell?.id === item.id && editingCell?.field === field;
    const value = item[field] as string;

    if (isEditing) {
      if (isDropdown) {
        return (
          <div className="flex items-center space-x-1">
            <select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-2 py-1 border border-accent rounded text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              autoFocus
            >
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button onClick={handleSave} className="text-accent hover:text-accent/80">
              <Save className="w-3 h-3" />
            </button>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      } else {
        return (
          <div className="flex items-center space-x-1">
            <input
              type={field.includes('Date') ? 'date' : 'text'}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-2 py-1 border border-accent rounded text-sm focus:outline-none focus:ring-1 focus:ring-accent min-w-0 flex-1"
              autoFocus
            />
            <button onClick={handleSave} className="text-accent hover:text-accent/80 flex-shrink-0">
              <Save className="w-3 h-3" />
            </button>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      }
    }

    const cellContent = field === 'status' ? (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
        {value}
      </span>
    ) : field === 'risk' ? (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(value)}`}>
        {value}
      </span>
    ) : (
      <span className="text-sm text-gray-900">{value || '-'}</span>
    );

    return (
      <div 
        className="group cursor-pointer hover:bg-gray-50 p-1 rounded flex items-center justify-between"
        onClick={() => handleCellClick(item.id, field, value)}
      >
        {cellContent}
        <Edit3 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1 flex-shrink-0" />
      </div>
    );
  };

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
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary"
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Strategic Action Plan</h1>
                <p className="text-gray-600">
                  Click any cell to edit • {filteredItems.length} of {actionItems.length} items shown
                </p>
              </div>
              <button
                onClick={addNewRow}
                className="mt-4 md:mt-0 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Add Action Item
              </button>
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden mb-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                >
                  <option value="All">All Statuses</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                >
                  <option value="All">All Risk Levels</option>
                  {riskOptions.map(risk => (
                    <option key={risk} value={risk}>{risk}</option>
                  ))}
                </select>
                <button
                  onClick={addNewRow}
                  className="bg-primary text-white py-2 px-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </button>
              </div>
            </div>

            {/* Action Plan Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold min-w-[120px]">Strategic Priority</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold min-w-[200px]">Goal Description</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold min-w-[200px]">Goal Aligned Action Steps</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold min-w-[100px]">Lead</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold min-w-[120px]">Contributors</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold min-w-[120px]">Performance Target</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold min-w-[100px]">Status</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold min-w-[80px]">Risk</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold min-w-[100px]">Start Date</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold min-w-[100px]">Due Date</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold min-w-[100px]">Date Completed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredItems.map((item, index) => (
                      <tr key={item.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="px-3 sm:px-4 py-3">
                          {renderEditableCell(item, 'strategicPriority')}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          {renderEditableCell(item, 'goalDescription')}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          {renderEditableCell(item, 'actionSteps')}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          {renderEditableCell(item, 'lead')}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          {renderEditableCell(item, 'contributors')}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          {renderEditableCell(item, 'performanceTarget')}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          {renderEditableCell(item, 'status', true, statusOptions)}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          {renderEditableCell(item, 'risk', true, riskOptions)}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          {renderEditableCell(item, 'startDate')}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          {renderEditableCell(item, 'dueDate')}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          {renderEditableCell(item, 'dateCompleted')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">How to use this Action Plan</h3>
                  <div className="mt-1 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Click any cell in the table to edit it directly</li>
                      <li>Use dropdown menus for Status and Risk fields</li>
                      <li>Date fields will show a date picker when clicked</li>
                      <li>AI will provide warnings for unrealistic targets or tight deadlines</li>
                      <li>Click the save icon to confirm changes or X to cancel</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;