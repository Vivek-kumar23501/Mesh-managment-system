import { useState, useEffect } from 'react';
import axios from 'axios';

const useForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('/api/forms');  // Adjust this based on your backend API endpoint
        setForms(response.data);  // Assuming the response contains the form data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  return { forms, loading, error };
};

export default useForms;
