import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

interface Complaint {
  id: number;
  name: string;
  email: string;
  complaint: string;
  status: string;
  created_at: string;
}

const Admin: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/complaints`);
      setComplaints(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching complaints:', err);
      setError('Failed to load complaints. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusToggle = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
      
      await axios.patch(`${API_URL}/complaints/${id}`, {
        status: newStatus
      });
      
      // Update local state after successful API call
      setComplaints(complaints.map(complaint => 
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      ));
    } catch (err) {
      console.error('Error updating complaint status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this complaint?')) return;
    
    try {
      await axios.delete(`${API_URL}/complaints/${id}`);
      
      // Remove from local state after successful deletion
      setComplaints(complaints.filter(complaint => complaint.id !== id));
    } catch (err) {
      console.error('Error deleting complaint:', err);
      alert('Failed to delete complaint. Please try again.');
    }
  };

  const filteredComplaints = filterStatus === 'all' 
    ? complaints 
    : complaints.filter(complaint => complaint.status === filterStatus);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold mb-8 pb-2 border-b border-gray-200">Admin Dashboard</h2>
      
      <div className="mb-6">
        <label htmlFor="status-filter" className="mr-2 font-medium text-gray-700">Filter by status:</label>
        <select 
          id="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
      
      {filteredComplaints.length === 0 ? (
        <p className="text-gray-500 text-center p-6 bg-gray-50 rounded-md">No complaints found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{complaint.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{complaint.email}</td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs overflow-hidden text-ellipsis">{complaint.complaint}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(complaint.created_at)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleStatusToggle(complaint.id, complaint.status)}
                      className="text-red-700 hover:text-red-900 mr-4"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => handleDelete(complaint.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
