import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from '../constants';

// Pages
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ForgotPasswordPage from './pages/ForgotPassword';
import DashboardPage from './pages/Dashboard';
import WorkspacePage from './pages/Workspace';
import GalleryPage from './pages/Gallery';
import CommunityPage from './pages/Community';
import ProfilePage from './pages/Profile';

// Layout
import Layout from './components/Layout';
import RectoLandingPage from './pages/Landingpage';

const App: React.FC = () => {
  // It is safer to initialize state with a check for the token's existence directly
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem(AUTH_TOKEN_KEY)
  );

  const login = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {/* If user is logged in, redirect Login/Signup to Dashboard */}
        <Route 
          path="/login" 
          element={!isAuthenticated ? <LoginPage onLogin={login} /> : <Navigate to="/dashboard" replace />} 
        />
        <Route 
          path="/signup" 
          element={!isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" replace />} 
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Landing Page at Root */}
        <Route path="/" element={<RectoLandingPage />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Layout onLogout={logout} /> : <Navigate to="/login" replace />}
        >
          
          <Route index element={<DashboardPage />} />
          <Route path="workspace" element={<WorkspacePage />} />
          <Route path="workspace/:id" element={<WorkspacePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="profile" element={<ProfilePage onLogout={logout} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;