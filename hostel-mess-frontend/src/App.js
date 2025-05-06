import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import CaretakerDashboard from './components/CaretakerDashboard';
import WardenDashboard from './components/WardenDashboard';
import MessManagerDashboard from './components/MessManagerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/caretaker" element={<CaretakerDashboard />} />
        <Route path="/warden" element={<WardenDashboard />} />
        <Route path="/mess-manager" element={<MessManagerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
