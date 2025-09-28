import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, observations, celestialBodies, onLogout, onLoadObservations, onCreateObservation, onLoadReferenceData }) => {
  const [newObservation, setNewObservation] = useState({ title: '', notes: '', celestialBodyId: '' });

  useEffect(() => {
    onLoadObservations();
    onLoadReferenceData();
  }, []);

  const handleCreateObservation = async (e) => {
    e.preventDefault();
    if (!newObservation.title || !newObservation.celestialBodyId) {
      alert('Please fill in title and select a celestial body.');
      return;
    }
    await onCreateObservation(newObservation);
    setNewObservation({ title: '', notes: '', celestialBodyId: '' });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Welcome, {user.name} ({user.role})</p>
          </div>
          <div className="space-x-4">
            <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create New Observation Form */}
          <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Log New Observation</h2>
            <form onSubmit={handleCreateObservation} className="space-y-4">
              <input
                type="text"
                placeholder="Observation Title (e.g., Lunar Apogee Drift)"
                value={newObservation.title}
                onChange={(e) => setNewObservation({...newObservation, title: e.target.value})}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-white"
                required
              />
              <textarea
                placeholder="Detailed notes..."
                value={newObservation.notes}
                onChange={(e) => setNewObservation({...newObservation, notes: e.target.value})}
                rows={4}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-white"
              />
              <select
                value={newObservation.celestialBodyId}
                onChange={(e) => setNewObservation({...newObservation, celestialBodyId: e.target.value})}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-white"
                required
              >
                  <option value="" disabled>Select a Celestial Body</option>
                  {celestialBodies.map(body => (
                      <option key={body.id} value={body.id}>{body.name} ({body.type})</option>
                  ))}
              </select>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg shadow-blue-600/20">
                Log Observation
              </button>
            </form>
          </div>

          {/* Observations List */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Your Observations</h2>
            {observations.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No observations logged yet. Use the form to add your first one!</p>
            ) : (
              <div className="space-y-4">
                {observations.map(obs => (
                  <div key={obs.id} className="border border-gray-700 bg-gray-900/50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-lg text-white">{obs.title}</h3>
                            <p className="text-sm text-gray-400">Body: <span className='font-medium text-gray-300'>{obs.celestialBody?.name || 'N/A'}</span></p>
                        </div>
                        <p className="text-xs text-gray-500">{new Date(obs.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="text-gray-300 mt-2 text-sm">{obs.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
