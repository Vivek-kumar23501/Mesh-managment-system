import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hostel Mess Management System</h1>
      <div style={{ marginTop: '30px' }}>
        <button onClick={() => navigate('/student')} style={btnStyle}>Student</button>
        <button onClick={() => navigate('/caretaker')} style={btnStyle}>Caretaker</button>
        <button onClick={() => navigate('/warden')} style={btnStyle}>Warden</button>
        <button onClick={() => navigate('/mess-manager')} style={btnStyle}>Mess Manager</button>
      </div>
    </div>
  );
};

const btnStyle = {
  margin: '10px',
  padding: '15px 30px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '8px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none'
};

export default LandingPage;
