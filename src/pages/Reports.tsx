import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Download, Filter, Search, Calendar, Users, Target, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import { Link, useLocation } from 'react-router-dom';

const Reports: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarter');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const timeframes = [
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const metrics = [
    { value: 'all', label: 'All Metrics' },
    { value: 'financial', label: 'Financial' },
    { value: 'customer', label: 'Customer' },
    { value: 'process', label: 'Internal Process' },
    { value: 'learning', label: 'Learning & Growth' }
  ];

  const kpiData = [
    {
      title: 'Revenue Growth',
      value: '15.2%',
      change: '+2.3%',
      trend: 'up',
      target: '15%',
      status: 'on-track'
    },
    {
      title: 'Customer Satisfaction',
      value: '8.4/10',
      change: '+0.6',
      trend: 'up',
      target: '8.0',
      status: 'exceeding'
    },
    {
      title: 'Process Efficiency',
      value: '78%',
      change: '-2%',
      trend: 'down',
      target: '80%',
      status: 'at-risk'
    },
    {
      title: 'Employee Engagement',
      value: '85%',
      change: '+5%',
      trend: 'up',
      target: '80%',
      status: 'exceeding'
    }
  ];

  const benchmarkData = [
    { metric: 'Revenue Growth', yourValue: 15.2, industryAvg: 12.8, topQuartile: 18.5 },
    { metric: 'Customer Retention', yourValue: 92, industryAvg: 87, topQuartile: 95 },
    { metric: 'Employee Satisfaction', yourValue: 8.4, industryAvg: 7.8, topQuartile: 9.1 },
    { metric: 'Operational Efficiency', yourValue: 78, industryAvg: 75, topQuartile: 85 }
  ];

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'Revenue Optimization',
      description: 'Your revenue growth is above industry average. Consider expanding successful initiatives to maintain momentum.',
      impact: 'High',
      recommendation: 'Allocate additional resources to top-performing market segments.'
    },
    {
      type: 'warning',
      title: 'Process Efficiency Gap',
      description: 'Process efficiency has declined 2% this quarter. This may impact customer satisfaction if not addressed.',
      impact: 'Medium',
      recommendation: 'Review workflow bottlenecks and implement automation where possible.'
    },
    {
      type: 'success',
      title: 'Employee Engagement Success',
      description: 'Employee engagement has increased significantly, contributing to improved productivity.',
      impact: 'High',
      recommendation: 'Document and replicate successful engagement strategies across all departments.'
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
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary"
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Reports & Insights</h1>
                <p className="text-gray-600">Performance analytics and AI-powered recommendations</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm lg:hidden"
                >
                  {timeframes.map(timeframe => (
                    <option key={timeframe.value} value={timeframe.value}>
                      {timeframe.label}
                    </option>
                  ))}
                </select>
                <button className="bg-primary text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* KPI Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-600">{kpi.title}</h3>
                    <div className={`p-1 rounded-full ${
                      kpi.trend === 'up' ? 'bg-accent/10' : 'bg-red-100'
                    }`}>
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                      ) : (
                        <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">{kpi.value}</span>
                    <span className={`ml-2 text-sm ${
                      kpi.trend === 'up' ? 'text-accent' : 'text-red-500'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Target: {kpi.target}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      kpi.status === 'exceeding' ? 'bg-accent/10 text-accent' :
                      kpi.status === 'on-track' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {kpi.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {/* Performance Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Performance Trends</h2>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-48 sm:h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm sm:text-base">Interactive chart would be displayed here</p>
                    <p className="text-xs sm:text-sm text-gray-400">Showing quarterly performance trends</p>
                  </div>
                </div>
              </div>

              {/* Goal Progress */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Goal Progress</h2>
                  <PieChart className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Financial Objectives</span>
                      <span className="text-gray-900">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Customer Objectives</span>
                      <span className="text-gray-900">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Internal Process</span>
                      <span className="text-gray-900">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Learning & Growth</span>
                      <span className="text-gray-900">91%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Industry Benchmarking */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Industry Benchmarking</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Metric</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Your Performance</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Industry Average</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Top Quartile</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {benchmarkData.map((item, index) => {
                      const performance = item.yourValue > item.topQuartile ? 'excellent' :
                                        item.yourValue > item.industryAvg ? 'good' : 'needs-improvement';
                      
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 text-sm sm:text-base">{item.metric}</td>
                          <td className="px-4 sm:px-6 py-4 text-gray-700 text-sm sm:text-base">{item.yourValue}%</td>
                          <td className="px-4 sm:px-6 py-4 text-gray-700 text-sm sm:text-base">{item.industryAvg}%</td>
                          <td className="px-4 sm:px-6 py-4 text-gray-700 text-sm sm:text-base">{item.topQuartile}%</td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              performance === 'excellent' ? 'bg-accent/10 text-accent' :
                              performance === 'good' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {performance === 'excellent' ? 'Excellent' :
                               performance === 'good' ? 'Above Average' : 'Below Average'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">AI-Generated Insights</h2>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    insight.type === 'opportunity' ? 'bg-accent/5 border-accent' :
                    insight.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-green-50 border-green-400'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{insight.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        insight.impact === 'High' ? 'bg-red-100 text-red-700' :
                        insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2 text-sm sm:text-base">{insight.description}</p>
                    <p className="text-sm text-gray-600">
                      <strong>Recommendation:</strong> {insight.recommendation}
                    </p>
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

export default Reports;