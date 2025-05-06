import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';  // Import DatePicker here
import 'react-datepicker/dist/react-datepicker.css';  // Import DatePicker styles
import axios from 'axios';

const WardenDashboard = () => {
  const [activeTab, setActiveTab] = useState('mess-reduction');
  const [formData, setFormData] = useState({
    studentName: '',
    roll: '',
    reason: '',
    startDate: null,
    endDate: null,
    approvalStatus: '',
    file: null
  });
  const [forms, setForms] = useState([]);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    // Fetch mess reduction forms
    const fetchForms = async () => {
      try {
        const response = await axios.get('/api/forms'); // Adjust the endpoint accordingly
        setForms(response.data);
        setNotifications(response.data.filter(form => form.approvalStatus === 'pending').length);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData(prev => ({ ...prev, file: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend here
      const form = new FormData();
      form.append('studentName', formData.studentName);
      form.append('roll', formData.roll);
      form.append('reason', formData.reason);
      form.append('startDate', formData.startDate);
      form.append('endDate', formData.endDate);
      form.append('approvalStatus', formData.approvalStatus);
      if (formData.file) form.append('file', formData.file);

      await axios.post('/api/forms', form); // Adjust the endpoint accordingly
      setFormData({
        studentName: '',
        roll: '',
        reason: '',
        startDate: null,
        endDate: null,
        approvalStatus: '',
        file: null
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert('Failed to submit form!');
    }
  };

  const handleApproveReject = async (formId, action) => {
    try {
      await axios.put(`/api/forms/${formId}`, { approvalStatus: action }); // Adjust endpoint
      setForms(prev => prev.map(form =>
        form._id === formId ? { ...form, approvalStatus: action } : form
      ));
      alert(`Form ${action} successfully!`);
    } catch (error) {
      console.error("Error updating form:", error);
      alert('Failed to update form status!');
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
    datePicker: {
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
    fileUploadSection: {
      display: 'flex',
      gap: '10px',
      marginTop: '5px',
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
          <h2 style={styles.sidebarHeader}>Warden Dashboard</h2>
          <ul style={styles.sidebarList}>
            {['Student Profiles', 'Mess Reduction Approvals', 'Mess Reduction Tracking', 'Mess Calendar', 'Rules & Regulations'].map((label, idx) => {
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
              <p><strong>Warden</strong></p>
              <p style={styles.profileInfo}>Admin</p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div style={styles.pageContent}>
          {activeTab === 'mess-reduction' && (
            <div style={styles.formContainer}>
              <h2 style={styles.formHeader}>Mess Reduction Approvals</h2>
              <p>Choose a request to approve or reject.</p>
              {forms.map((form) => (
                <div key={form._id} style={{ marginBottom: '20px' }}>
                  <h3>{form.studentName} ({form.roll})</h3>
                  <p>{form.reason}</p>
                  <p><strong>Status:</strong> {form.approvalStatus}</p>
                  <button
                    onClick={() => handleApproveReject(form._id, 'approved')}
                    style={{ marginRight: '10px', backgroundColor: '#4CAF50', color: 'white' }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproveReject(form._id, 'rejected')}
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

export default WardenDashboard;
