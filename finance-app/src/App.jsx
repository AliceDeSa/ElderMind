import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';
import Dashboard from './pages/Dashboard';
import IncomesExpenses from './pages/IncomesExpenses';
import Goals from './pages/Goals';
import ObjectivesPage from './pages/ObjectivesPage';
import Education from './pages/Education';
import Calculator from './pages/Calculator';
import DashboardLayout from './layouts/DashboardLayout';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';

function Router() {
  const { user, loading } = useAuth();
  const [route, setRoute] = useState(window.location.hash || '');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-textMain">Carregando...</div>;
  }

  // If user is logged in
  if (user) {
    return (
      <FinanceProvider>
        <DashboardLayout>
          {/* Route content inside layout */}
          {(!route || route === '' || route === '#dashboard') && <Dashboard />}
          {route === '#finances' && <IncomesExpenses />}
          {route === '#goals' && <Goals />}
          {route === '#objectives' && <ObjectivesPage />}
          {route === '#education' && <Education />}
          {route === '#calculator' && <Calculator />}
          {/* Add other routes here */}
        </DashboardLayout>
      </FinanceProvider>
    );
  }

  // Public Routes
  if (route === '#register') {
    return <Register />;
  }

  if (route === '#recover') {
    return <RecoverPassword />;
  }

  return <Login />;
}

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
