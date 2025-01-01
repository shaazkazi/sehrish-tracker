'use client';

import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Navigation from '../components/Navigation';

export default function ChartPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchRecords() {
      const response = await fetch('/api/growth');
      const data = await response.json();
      setRecords(data.records || []);
    }
    fetchRecords();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16">
      <nav className="bg-white shadow-sm border-b border-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Growth Chart</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="h-[400px]"> {/* Increased height for better mobile viewing */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={records}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  yAxisId="left" 
                  label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  label={{ value: 'Weight (kg)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36}/>
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="height" 
                  stroke="#3b82f6" 
                  name="Height (cm)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10b981" 
                  name="Weight (kg)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
}
