import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Submit from './pages/Submit';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            <span className="text-2xl border-b-2 border-red-700 pb-1">Complaint Management System</span>
          </h1>
          <nav className="flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-red-700 transition">Submit Complaint</Link>
            <Link to="/admin" className="text-gray-700 hover:text-red-700 transition">Admin Dashboard</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Submit />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
