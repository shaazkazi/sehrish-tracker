'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';

export default function HistoryPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchRecords() {
      const response = await fetch('/api/growth');
      const data = await response.json();
      setRecords(data.records || []);
    }
    fetchRecords();
  }, []);

  const handleDelete = async (date) => {
    try {
      const response = await fetch(`/api/growth?date=${date}`, { method: 'DELETE' });
      if (response.ok) {
        setRecords((prev) => prev.filter(record => record.date !== date));
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <nav className="bg-white shadow-sm border-b border-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Growth History</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {records.map((record) => (
              <div 
                key={record.date} 
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 animate-fade-in"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12h-4M8 12H4M12 4v16" />
                        </svg>
                        {record.height} cm
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2M6 7l-3-1m3 1l3 9a5.002 5.002 0 006.001 0M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9" />
                        </svg>
                        {record.weight} kg
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(record.date)}
                    className="text-sm font-medium text-danger hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {records.length === 0 && (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No records available
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
}
