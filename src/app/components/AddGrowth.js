'use client';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';

export default function AddGrowth() {
  const [form, setForm] = useState({ date: '', height: '', weight: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchRecords() {
      const response = await fetch('/api/growth');
      const data = await response.json();
      setRecords(data.records || []);
    }
    fetchRecords();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.height || !form.weight) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/growth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setRecords((prev) => [data.record, ...prev]);
        setForm({ date: '', height: '', weight: '' });
        setMessage('Record added successfully!');
      }
    } catch (error) {
      setMessage('Error adding record');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/growth', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setRecords(records.filter(record => record.id !== id));
        setMessage('Record deleted successfully!');
      }
    } catch (error) {
      setMessage('Error deleting record');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Sehrish
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Track your little one's growth journey ✨
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl shadow-sm dark:bg-blue-900/20">
            <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Latest Height</h3>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{records[0]?.height || '--'} cm</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow-sm dark:bg-green-900/20">
            <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Latest Weight</h3>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">{records[0]?.weight || '--'} kg</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl shadow-sm dark:bg-purple-900/20">
            <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Records</h3>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{records.length}</p>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Add New Measurement</h2>
            
            {message && (
              <div className={`p-4 mb-6 rounded-lg ${
                message.includes('Error')
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="input-field text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: e.target.value })}
                  className="input-field text-gray-900"
                  placeholder="Enter height"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  className="input-field text-gray-900"
                  placeholder="Enter weight"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center"
              >
                {loading ? 'Adding...' : 'Add Record'}
              </button>
            </form>
          </div>
  </div>
      </main>
      
      <Navigation />
    </div>
  );
}
