const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Assuming you have this schema
const MessReductionForm = require('./models/messReductionForm');

// Middleware
app.use(cors()); // Allow requests from other origins (such as your frontend)
app.use(express.json()); // Parse JSON bodies

// Your MongoDB URI (replace with your actual URI)
const dbURI = 'mongodb://localhost:27017/mess-reduction-system';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Route to get pending forms
app.get('/get-pending-forms', (req, res) => {
  // Fetch forms with pending approval status from the database
  MessReductionForm.find({ approvalStatus: 'pending' })
    .then(forms => {
      res.status(200).json(forms); // Send back the forms as JSON
    })
    .catch(err => {
      console.error('Error fetching forms:', err);
      res.status(500).send('Error fetching forms'); // Send error response if fetching fails
    });
});

// Route to approve/reject a form (example)
app.post('/update-form', (req, res) => {
  const { formId, approvalStatus } = req.body;
  
  MessReductionForm.findByIdAndUpdate(formId, { approvalStatus })
    .then(updatedForm => {
      res.status(200).json(updatedForm); // Send back the updated form
    })
    .catch(err => {
      console.error('Error updating form:', err);
      res.status(500).send('Error updating form');
    });
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
