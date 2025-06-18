import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './pages/Dashboard'; // Updated path
import DashboardContent from './components/dashboard/DashboardContent'; // Updated path
import PoliceReport from './components/reports/non-rev/PoliceReport';
import BlockMaster from './components/dashboard/master/BlockMaster'; // Updated path
import CleanRoom from './components/dashboard/master/CleanRoom'; // Updated path
import CheckinInfo from './components/dashboard/master/CheckinInfo'; // Updated path
import MaintenanceRoom from './components/dashboard/master/MaintenanceRoom'; // Updated path
import FloorMaster from './components/dashboard/master/FloorMaster'; // Updated path
import RoomTypeMaster from './components/dashboard/master/RoomTypeMaster'; // Updated path
import RoomMaster from './components/dashboard/master/RoomMaster'; // Updated path
import CheckInRoom from './components/dashboard/master/CheckInRoom'; // Updated path
import CheckoutRoom from './components/dashboard/master/CheckoutRoom'; // Updated path
import InvoicesPage from './components/dashboard/master/invoice/InvoicesPage'; // Updated path
import BlockRoom from './components/dashboard/master/BlockRoom'; // Updated path
import UnblockRoom from './components/dashboard/master/UnblockRoom'; // Updated path
import CheckinList from './components/dashboard/master/CheckinList'; // Updated path
import Settings from './components/dashboard/SettingsContent'; // Updated path
import Profile from './components/dashboard/UsersContent'; // Added missing import
import Protected from './components/dashboard/UsersContent'; // Added missing import

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Nested route component for dashboard
const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Outlet /> {/* This will render the nested routes */}
    </DashboardLayout>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              {/* Dashboard nested routes */}
              <Route path="/dashboard" element={<DashboardRoutes />}>
                <Route index element={<DashboardContent />} />
                {/* Room Management */}
                <Route path="block-master" element={<BlockMaster />} />
                <Route path="clean-room" element={<CleanRoom />} />
                <Route path="maintenance-room" element={<MaintenanceRoom />} />
                <Route path="checkin-info" element={<CheckinInfo />} />
                <Route path="floor-master" element={<FloorMaster />} />
                <Route path="room-type-master" element={<RoomTypeMaster />} />
                <Route path="room-master" element={<RoomMaster />} />
                <Route path="check-in-room" element={<CheckInRoom />} />
                <Route path="checkout-room/:checkinId/:roomId" element={<CheckoutRoom />} />
                <Route path="block-room" element={<BlockRoom />} />
                <Route path="unblock-room" element={<UnblockRoom />} />
                <Route path="checkin-list" element={<CheckinList />} />
                <Route path="invoices" element={<InvoicesPage />} />
                <Route path="police-report" element={<PoliceReport />} />
                <Route path="invoices/:invoice_number" element={<InvoicesPage />} />

                {/* System */}
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              
              <Route path="/protected" element={<Protected />} />
            </Route>
            
            {/* Redirect */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;