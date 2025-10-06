import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminRegisterPage from './pages/AdminRegisterPage';
import CompleteProfile from './pages/CompleteProfile';
import Dashboard from './pages/Dashboard';
import BalanceScorecard from './pages/BalanceScorecard';
import SWOTAnalysis from './pages/SWOTAnalysis';
import ActionPlan from './pages/ActionPlan';
import Reports from './pages/Reports';
import Surveys from './pages/Surveys';
import ServerAdminDashboard from './pages/ServerAdminDashboard';
import AIChat from './components/AIChat';
import FloatingAIChat from './components/FloatingAIChat';
import TutorialOverlay from './components/TutorialOverlay';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children, requireServerAdmin = false }: { children: React.ReactNode; requireServerAdmin?: boolean }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireServerAdmin && profile.role !== 'server_admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && profile) {
      if (profile.role === 'server_admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (user && profile) {
    return null;
  }

  return <>{children}</>;
}

function AppContent() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showFloatingAI, setShowFloatingAI] = useState(false);

  const isDashboardPage = () => {
    return window.location.pathname.includes('/dashboard') ||
           window.location.pathname.includes('/scorecard') ||
           window.location.pathname.includes('/swot-analysis') ||
           window.location.pathname.includes('/action-plan') ||
           window.location.pathname.includes('/reports') ||
           window.location.pathname.includes('/surveys');
  };

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <LoginPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirect>
              <RegisterPage />
            </AuthRedirect>
          }
        />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireServerAdmin={true}>
              <ServerAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                onShowTutorial={() => setShowTutorial(true)}
                onShowAIChat={() => setShowAIChat(true)}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scorecard"
          element={
            <ProtectedRoute>
              <BalanceScorecard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/swot-analysis"
          element={
            <ProtectedRoute>
              <SWOTAnalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/action-plan"
          element={
            <ProtectedRoute>
              <ActionPlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/surveys"
          element={
            <ProtectedRoute>
              <Surveys />
            </ProtectedRoute>
          }
        />
      </Routes>

      {showTutorial && (
        <TutorialOverlay onClose={() => setShowTutorial(false)} />
      )}

      {showAIChat && (
        <AIChat onClose={() => setShowAIChat(false)} />
      )}

      {isDashboardPage() && (
        <FloatingAIChat
          isOpen={showFloatingAI}
          onToggle={() => setShowFloatingAI(!showFloatingAI)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
