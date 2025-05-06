// allotment.js
import React, { useState } from 'react';
import './allotment.css';

function AllotmentForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="allotment-container">
      <h2 className="form-heading">Hostel Allotment</h2>

      {step === 1 && (
        <>
          <h3 className="section-title">Personal Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Candidate's First Name</label>
              <input type="text" placeholder="Enter your first name" />
            </div>
            <div className="form-group">
              <label>Candidate's Last Name</label>
              <input type="text" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Father's Name</label>
              <input type="text" placeholder="Enter Father's Name" />
            </div>
            <div className="form-group">
              <label>Mother's Name</label>
              <input type="text" placeholder="Enter Mother's Name" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <label><input type="radio" name="gender" /> Male</label>
                <label><input type="radio" name="gender" /> Female</label>
                <label><input type="radio" name="gender" /> Others</label>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>PWD</label>
              <div className="radio-group">
                <label><input type="radio" name="pwd" /> YES</label>
                <label><input type="radio" name="pwd" /> NO</label>
              </div>
            </div>
          </div>

          <h3 className="section-title">Permanent Address</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Address</label>
              <input type="text" placeholder="Enter your Address" />
            </div>
            <div className="form-group">
              <label>District</label>
              <input type="text" placeholder="Enter District" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>State</label>
              <input type="text" placeholder="Enter State" />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input type="text" placeholder="Enter Country" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="text" placeholder="Enter your Mobile Number" />
            </div>
            <div className="form-group">
              <label>Alternate Contact Number</label>
              <input type="text" placeholder="Enter your alternate contact number" />
            </div>
          </div>

          <button className="next-button" onClick={nextStep}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="section-title">Emergency Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Emergency Contact First Name</label>
              <input type="text" placeholder="Enter first name" />
            </div>
            <div className="form-group">
              <label>Emergency Contact Last Name</label>
              <input type="text" placeholder="Enter last name" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter Email" />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" placeholder="Enter Mobile Number" />
            </div>
          </div>

          <h3 className="section-title">Academic Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>College Roll Number</label>
              <input type="text" placeholder="Enter Roll Number" />
            </div>
            <div className="form-group">
              <label>Registration Number</label>
              <input type="text" placeholder="Enter Registration Number" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Branch</label>
              <select>
                <option value="">Select Branch</option>
                <option>CSE</option>
                <option>ECE</option>
                <option>EEE</option>
                <option>ME</option>
                <option>CE</option>
                <option>IT</option>
                <option>AE</option>
                <option>PIE</option>
                <option>BT</option>
              </select>
            </div>
            <div className="form-group">
              <label>Semester</label>
              <select>
                <option value="">Select Semester</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          <h3 className="section-title">Hostel Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Hostel Name</label>
              <div className="radio-group">
                <label><input type="radio" name="hostel" /> Boy's Hostel</label>
                <label><input type="radio" name="hostel" /> Girl's Hostel</label>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Room Number</label>
              <input type="text" placeholder="Enter Room Number" />
            </div>
          </div>

          <button className="next-button" onClick={nextStep}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <h3 className="section-title">Upload Documents</h3>
          <div className="document-section">
            {[
              'Passport Size Photo',
              'Aadhar Card',
              'Registration Slip',
              'Hostel Maintenance Slip',
              'Mess Payment Slip'
            ].map((doc, index) => (
              <div className="document-upload" key={index}>
                <label>{doc}</label>
                <input type="file" />
              </div>
            ))}
          </div>

          <button className="submit-button">Submit</button>
        </>
      )}
    </div>
  );
}

export default AllotmentForm;
