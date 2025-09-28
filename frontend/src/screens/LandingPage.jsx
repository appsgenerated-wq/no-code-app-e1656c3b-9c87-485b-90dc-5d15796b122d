import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState('researcher@manifest.build');
  const [password, setPassword] = useState('password');

  const handleDemoLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-grid-gray-700/[0.2]"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gray-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-4">
          Lunar Mechanics Explorer
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Log and analyze celestial observations inspired by the works of Lagrange and Newton. Join a community of researchers exploring the cosmos.
        </p>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 max-w-sm mx-auto">
          <h2 className="text-xl font-semibold mb-4">Researcher Access</h2>
          <form onSubmit={handleDemoLogin} className="space-y-4">
              <div>
                  <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      placeholder="Email"
                  />
              </div>
              <div>
                  <input 
                      type="password" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      placeholder="Password"
                  />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg shadow-blue-600/20"
              >
                Login as Researcher
              </button>
          </form>
          <div className="mt-6 text-center">
            <a 
              href={`${config.BACKEND_URL}/admin`} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Access Admin Panel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
