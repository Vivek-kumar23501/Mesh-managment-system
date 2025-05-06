import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './StudentDashboard.css';
import Allotment from './Allotment';  // Import the Allotment component

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('mess-reduction'); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    roll: '',
    session: '',
    room: '',
    days: '',
    reason: '',
    branch: '',
    semester: '',
    startDate: null,
    endDate: null,
    file: null
  });

  const branches = [
    'Computer Science','computer science (cyber security)', 'Electrical', 'Mechanical', 'Civil', 'Electronics',
    'Information Technology', 'Chemical', 'Biomedical', 'Automobile'
  ];
  const semesters = Array.from({ length: 8 }, (_, i) => `${i + 1}`);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  return (
    <>
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <h2>Student Dashboard</h2>
            <ul>
              {[ 
                'Student Profile', 'Hostel Allotment', 'Mess Reduction', 
                'Mess Reduction Tracking', 'Mess Calendar', 'Grievance Support', 'Rules & Regulations'
              ].map((label, idx) => {
                const tabKey = label.toLowerCase().replace(/ /g, '-');
                return (
                  <li
                    key={idx}
                    onClick={() => setActiveTab(tabKey)}
                    className={activeTab === tabKey ? 'active' : 'inactive'}
                  >
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom Sidebar Buttons */}
          <div>
            <button className="contact-btn">👥 Contact</button>
            <button className="logout-btn">⏻ Logout</button>
          </div>
        </aside>

        {/* Main Content */}
        <main>
          {/* Topbar */}
          <div className="topbar">
            <div className="notification">
              🔔
              <span className="notification-badge">9</span>
            </div>
            <div className="profile-container">
              <img src="https://via.placeholder.com/40" alt="profile" className="profile-pic" />
              <div>
                <p className="profile-name"><strong>Vivek tiwari</strong></p>
                <p className="profile-role">Student</p>
              </div>
            </div>
          </div>

          {/* Main Body */}
          <div className="content-body">
            {/* Mess Reduction Form */}
            {activeTab === 'mess-reduction' && (
              <form onSubmit={handleSubmit} className="formContainer">
                <h2 style={{ marginBottom: '20px' }}>Mess Reduction</h2>

                <div className="formGrid">
                  <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="input" />
                  <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="input" />
                  <input name="roll" placeholder="College Roll No" value={formData.roll} onChange={handleChange} required className="input" />
                  <select name="branch" value={formData.branch} onChange={handleChange} required className="input">
                    <option value="">Select Branch</option>
                    {branches.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <select
  name="session"
  value={formData.session}
  onChange={handleChange}
  required
  className="input"
>
  <option value="" disabled>Select Session</option>
  {Array.from({ length: new Date().getFullYear() - 2019 + 1 }, (_, i) => {
    const startYear = 2019 + i;
    const endYear = (startYear + 4).toString().slice(-2); // Get last two digits
    return (
      <option key={startYear} value={`${startYear}-${endYear}`}>
        {startYear}-{endYear}
      </option>
    );
  })}
</select>

                  <select name="semester" value={formData.semester} onChange={handleChange} required className="input">
                    <option value="">Select Semester</option>
                    {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input name="room" placeholder="Room No" value={formData.room} onChange={handleChange} required className="input" />
                  <DatePicker 
                    selected={formData.startDate} 
                    onChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))} 
                    placeholderText="Date From" 
                    dateFormat="yyyy-MM-dd" 
                    required 
                    className="input" 
                  />
                  
                  <DatePicker 
                    selected={formData.endDate} 
                    onChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))} 
                    placeholderText="Date To" 
                    dateFormat="yyyy-MM-dd" 
                    required 
                    className="input" 
                  />
                  <input name="days" type="number" placeholder="Number of Days" value={formData.days} onChange={handleChange} required className="input" />
                </div>

                <div style={{ marginTop: '20px' }}>
                  <label>Reason</label>
                  <textarea name="reason" value={formData.reason} onChange={handleChange} rows={4} required className="textarea" />
                </div>

                <div className="file-upload-section">
                  <label>📄 Upload Document (Optional)</label>
                  <div className="file-input-container">
                    <input type="file" name="file" onChange={handleChange} />
                    <button type="button" className="upload-button">Upload</button>
                  </div>
                </div>

                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            )}
            
            {/* Hostel Allotment Component */}
            {activeTab === 'hostel-allotment' && (
              <div className="formContainer">
                <Allotment />
              </div>
            )}

            {/* Other tabs can be added here with similar conditional rendering */}
            {activeTab === 'student-profile' && (
              <div className="formContainer">
                <h2 style={{ marginBottom: '20px' }}>Student Profile</h2>
                {/* Student Profile content will go here */}
              </div>
            )}

            {activeTab === 'mess-reduction-tracking' && (
              <div className="formContainer">
                <h2 style={{ marginBottom: '20px' }}>Mess Reduction Tracking</h2>
                {/* Mess Reduction Tracking content will go here */}
              </div>
            )}

            {activeTab === 'mess-calendar' && (
              <div className="formContainer">
                <h2 style={{ marginBottom: '20px' }}>Mess Calendar</h2>
                {/* Mess Calendar content will go here */}
              </div>
            )}

            {activeTab === 'grievance-support' && (
              <div className="formContainer">
                <h2 style={{ marginBottom: '20px' }}>Grievance Support</h2>
                {/* Grievance Support content will go here */}
              </div>
            )}

            {activeTab === 'rules-&-regulations' && (
              <div className="formContainer">
                <h2 style={{ marginBottom: '20px' }}>Rules & Regulations</h2>
                {/* Rules & Regulations content will go here */}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;