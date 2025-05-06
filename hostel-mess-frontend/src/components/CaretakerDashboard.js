import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CaretakerDashboard = () => {
  const [activeTab, setActiveTab] = useState('room-maintenance');
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    // Fetch the necessary data for Caretaker
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/requests'); // Adjust the endpoint accordingly
        setRequests(response.data);
        setNotifications(response.data.filter(request => request.status === 'pending').length);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleApproveReject = async (requestId, action) => {
    try {
      await axios.put(`/api/requests/${requestId}`, { status: action });
      setRequests(prev => prev.map(request =>
        request._id === requestId ? { ...request, status: action } : request
      ));
      setNotifications(prev => action === 'pending' ? prev + 1 : prev - 1); // Adjust notification count
      alert(`Request ${action} successfully!`);
    } catch (error) {
      console.error("Error updating request:", error);
      alert('Failed to update request status!');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Segoe UI',
    },
    sidebar: {
      width: '250px',
      background: '#f9fafc',
      padding: '20px',
      borderRight: '1px solid #ddd',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    sidebarHeader: {
      color: '#007bff',
    },
    sidebarList: {
      listStyle: 'none',
      padding: 0,
    },
    sidebarItem: (activeTab, tabKey) => ({
      padding: '10px',
      marginBottom: '5px',
      borderRadius: '6px',
      backgroundColor: activeTab === tabKey ? '#4e73df' : 'transparent',
      color: activeTab === tabKey ? '#fff' : '#333',
      cursor: 'pointer',
    }),
    sidebarButton: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '6px',
      border: 'none',
    },
    sidebarContactButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
    sidebarLogoutButton: {
      backgroundColor: '#ef4444',
      color: 'white',
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    topbar: {
      padding: '10px 20px',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    notificationIcon: {
      position: 'relative',
      fontSize: '20px',
      marginRight: '20px',
    },
    notificationBadge: {
      backgroundColor: 'red',
      color: 'white',
      fontSize: '10px',
      padding: '2px 6px',
      borderRadius: '50%',
      position: 'absolute',
      top: '-8px',
      right: '-8px',
    },
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    profileImage: {
      borderRadius: '50%',
    },
    profileInfo: {
      fontSize: '12px',
      color: 'gray',
    },
    pageContent: {
      padding: '30px',
      overflowY: 'auto',
    },
    formContainer: {
      background: '#fdfdfd',
      padding: '30px',
      borderRadius: '12px',
      maxWidth: '900px',
      margin: '0 auto',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    formHeader: {
      marginBottom: '20px',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    inputField: {
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
    },
    selectField: {
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
    },
    reasonField: {
      width: '100%',
      padding: '10px',
      marginTop: '5px',
      borderRadius: '8px',
      border: '1px solid #ccc',
    },
    submitButton: {
      marginTop: '30px',
      width: '100%',
      padding: '12px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div>
          <h2 style={styles.sidebarHeader}>Caretaker Dashboard</h2>
          <ul style={styles.sidebarList}>
            {['Room Maintenance Requests', 'Student Issues', 'Daily Activity Log', 'Room Assignments', 'Reports', 'Inventory Management', 'Settings'].map((label, idx) => {
              const tabKey = label.toLowerCase().replace(/ /g, '-');
              return (
                <li
                  key={idx}
                  style={styles.sidebarItem(activeTab, tabKey)}
                  onClick={() => setActiveTab(tabKey)}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <button style={{ ...styles.sidebarButton, ...styles.sidebarContactButton }}>👥 Contact</button>
          <button style={{ ...styles.sidebarButton, ...styles.sidebarLogoutButton }}>⏻ Logout</button>
        </div>
      </aside>

      {/* Main content */}
      <main style={styles.mainContent}>
        {/* Topbar */}
        <div style={styles.topbar}>
          <div style={styles.notificationIcon}>
            🔔<span style={styles.notificationBadge}>{notifications}</span>
          </div>
          <div style={styles.profileSection}>
            <img src="https://via.placeholder.com/40" alt="profile" style={styles.profileImage} />
            <div>
              <p><strong>Caretaker</strong></p>
              <p style={styles.profileInfo}>Admin</p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div style={styles.pageContent}>
          {activeTab === 'room-maintenance' && (
            <div style={styles.formContainer}>
              <h2 style={styles.formHeader}>Room Maintenance Requests</h2>
              {requests.map((request) => (
                <div key={request._id} style={{ marginBottom: '20px' }}>
                  <h3>{request.studentName} ({request.room})</h3>
                  <p>{request.issue}</p>
                  <p><strong>Status:</strong> {request.status}</p>
                  <button
                    onClick={() => handleApproveReject(request._id, 'approved')}
                    style={{ marginRight: '10px', backgroundColor: '#4CAF50', color: 'white' }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproveReject(request._id, 'rejected')}
                    style={{ backgroundColor: '#f44336', color: 'white' }}
                  >
                    Reject
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add more sections for other tabs if needed */}
        </div>
      </main>
    </div>
  );
};

export default CaretakerDashboard;
