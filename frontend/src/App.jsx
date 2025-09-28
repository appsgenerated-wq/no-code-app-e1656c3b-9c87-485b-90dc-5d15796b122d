import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [observations, setObservations] = useState([]);
  const [theories, setTheories] = useState([]);
  const [celestialBodies, setCelestialBodies] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ appId: config.APP_ID, baseURL: config.BACKEND_URL });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);
      
      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful. Checking auth status...');
        try {
          const currentUser = await manifest.from('User').me();
          if (currentUser) {
            setUser(currentUser);
            setCurrentScreen('dashboard');
            console.log('✅ [APP] User is logged in:', currentUser.email);
          } else {
            console.log('ℹ️ [APP] No active user session.');
          }
        } catch (error) {
          console.log('ℹ️ [APP] No active user session found.');
          setUser(null);
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
      }
    };
    
    initializeApp();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setObservations([]);
    setCurrentScreen('landing');
  };

  const loadObservations = async () => {
    if (!user) return;
    try {
      const response = await manifest.from('Observation').find({ 
        include: ['author', 'celestialBody'],
        sort: { createdAt: 'desc' }
      });
      setObservations(response.data);
    } catch (error) {
      console.error('Failed to load observations:', error);
    }
  };

  const createObservation = async (observationData) => {
    try {
      const newObservation = await manifest.from('Observation').create(observationData);
      // Refetch observations to get the latest list with includes
      await loadObservations();
    } catch (error) {
      console.error('Failed to create observation:', error);
    }
  };

  const loadReferenceData = async () => {
    try {
        const [theoriesResponse, bodiesResponse] = await Promise.all([
            manifest.from('Theory').find(),
            manifest.from('CelestialBody').find()
        ]);
        setTheories(theoriesResponse.data);
        setCelestialBodies(bodiesResponse.data);
    } catch (error) {
        console.error('Failed to load reference data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-xs text-gray-300">{backendConnected ? 'Connected' : 'Disconnected'}</span>
      </div>
      
      {currentScreen === 'dashboard' && user ? (
        <DashboardPage 
          user={user} 
          observations={observations} 
          theories={theories}
          celestialBodies={celestialBodies}
          onLogout={handleLogout} 
          onLoadObservations={loadObservations}
          onCreateObservation={createObservation}
          onLoadReferenceData={loadReferenceData}
        />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
