import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCog, Building2, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UserManagement from '../components/admin/UserManagement';
import UserAccessManagement from '../components/admin/UserAccessManagement';
import BusinessManagement from '../components/admin/BusinessManagement';

type SidebarSection = 'user-management' | 'access-management' | 'business-management';

const ServerAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();
  const [activeSection, setActiveSection] = useState<SidebarSection>('user-management');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const sidebarItems = [
    {
      id: 'user-management' as SidebarSection,
      label: 'User Management',
      icon: Users,
      description: 'Add and manage admin accounts',
    },
    {
      id: 'access-management' as SidebarSection,
      label: 'User Access Management',
      icon: UserCog,
      description: 'Define admin types and access levels',
    },
    {
      id: 'business-management' as SidebarSection,
      label: 'Business Management',
      icon: Building2,
      description: 'Manage application users',
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'user-management':
        return <UserManagement />;
      case 'access-management':
        return <UserAccessManagement />;
      case 'business-management':
        return <BusinessManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">iSKORED</h1>
                <p className="text-sm text-gray-500 mt-1">Server Admin</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500">Logged in as</p>
              <p className="text-sm font-semibold text-gray-900 truncate">{profile?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mr-2" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top bar for mobile */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 hover:text-gray-900"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ServerAdminDashboard;
