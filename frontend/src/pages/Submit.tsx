import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const Submit: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [complaint, setComplaint] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Make actual POST request to the API
      await axios.post(`${API_URL}/complaints`, {
        name,
        email,
        complaint
      });
      
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting complaint:', err);
      setError('Failed to submit your complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Thank you!</h2>
        <p className="text-gray-700 mb-6">Your complaint has been submitted successfully.</p>
        <button 
          onClick={() => {
            setName('');
            setEmail('');
            setComplaint('');
            setSubmitted(false);
          }}
          className="px-6 py-3 bg-red-700 text-white rounded hover:bg-red-800 transition"
        >
          Submit another complaint
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold mb-8 pb-2 border-b border-gray-200">Submit a Complaint</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded border border-red-200">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="complaint" className="block font-medium text-gray-700 mb-1">Complaint</label>
          <textarea
            id="complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-red-500 focus:border-red-500"
            rows={5}
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-red-300' : 'bg-red-700 hover:bg-red-800'} text-white font-medium py-3 rounded-md transition`}
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Submit;