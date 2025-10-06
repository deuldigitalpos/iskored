import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  isMenuOpen?: boolean;
  setIsMenuOpen?: (open: boolean) => void;
  isSidebarCollapsed?: boolean;
  setIsSidebarCollapsed?: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isMenuOpen = false, 
  setIsMenuOpen,
  isSidebarCollapsed = false,
  setIsSidebarCollapsed
}) => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/scorecard') ||
                     location.pathname.includes('/swot-analysis') ||
                     location.pathname.includes('/action-plan') ||
                     location.pathname.includes('/reports') ||
                     location.pathname.includes('/surveys');

  if (isDashboard) {
    return (
      <header className="bg-primary text-white shadow-lg fixed top-0 left-0 right-0 z-40 h-16">
        <div className="h-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center space-x-4">
              {/* Sidebar Toggle Button */}
              <button
                onClick={() => setIsSidebarCollapsed && setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:flex p-2 rounded-lg hover:bg-white/10 transition-colors"
                title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isSidebarCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>
              
              <img src="/image.png" alt="iSKORED" className="h-8 w-auto" />
              <span className="text-xl font-bold">iSKORED</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-secondary rounded-full"></span>
                </button>
              </div>
              
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-medium">
                JD
              </div>

              {/* Mobile menu button */}
              <button 
                className="lg:hidden p-2"
                onClick={() => setIsMenuOpen && setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-primary border-t border-white/20">
            <div className="px-4 py-2 space-y-2">
              <Link 
                to="/dashboard" 
                className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/dashboard' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/scorecard" 
                className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/scorecard' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Balance Scorecard
              </Link>
              <Link 
                to="/swot-analysis" 
                className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/swot-analysis' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                SWOT Analysis
              </Link>
              <Link 
                to="/action-plan" 
                className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/action-plan' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Action Plan
              </Link>
              <Link 
                to="/reports" 
                className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/reports' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Reports
              </Link>
              <Link 
                to="/surveys" 
                className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/surveys' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Surveys
              </Link>
              <Link 
                to="/"
                className="block py-2 px-3 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Logout
              </Link>
            </div>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-4">
            <img src="/image.png" alt="iSKORED" className="h-8 w-auto" />
            <span className="text-xl font-bold text-primary">iSKORED</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary transition-colors">Pricing</Link>
            <a href="#features" className="text-gray-700 hover:text-primary transition-colors">Features</a>
            <a href="#about" className="text-gray-700 hover:text-primary transition-colors">About</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen && setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-primary">Home</Link>
            <Link to="/pricing" className="block py-2 text-gray-700 hover:text-primary">Pricing</Link>
            <a href="#features" className="block py-2 text-gray-700 hover:text-primary">Features</a>
            <a href="#about" className="block py-2 text-gray-700 hover:text-primary">About</a>
            <Link 
              to="/login" 
              className="block py-2 text-gray-700 hover:text-primary font-medium"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="block mt-4 bg-primary text-white px-6 py-2 rounded-lg text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;