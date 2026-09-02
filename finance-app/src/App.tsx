import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';
import HomePage from './pages/Home/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import IncomesExpenses from './pages/IncomesExpenses';
import Goals from './pages/Goals';
import ObjectivesPage from './pages/ObjectivesPage';
import Education from './pages/Education/Education';
import Calculator from './pages/Calculator/Calculator';
import GroceryPage from './features/grocery/GroceryPage';
import EmergencyReserve from './pages/EmergencyReserve/EmergencyReserve';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceProvider';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import Logger from './core/Logger';

Logger.sys('ElderMind Finance App inicializando...');

function App(): JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<RecoverPassword />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <FinanceProvider>
                  <DashboardLayout>
                    <Routes>
                      {/* Home is the entry point */}
                      <Route path="/" element={<Navigate to="/home" replace />} />
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/finances" element={<IncomesExpenses />} />
                      <Route path="/goals" element={<Goals />} />
                      <Route path="/objectives" element={<ObjectivesPage />} />
                      <Route path="/education" element={<Education />} />
                      <Route path="/calculator" element={<Calculator />} />
                      <Route path="/grocery" element={<GroceryPage />} />
                      <Route path="/emergency" element={<EmergencyReserve />} />
                      <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>
                  </DashboardLayout>
                </FinanceProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
        <PWAUpdatePrompt />
        <PWAInstallPrompt />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
