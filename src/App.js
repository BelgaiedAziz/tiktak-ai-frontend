import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Analytics from './pages/Analytics/Analytics';
import Inbox from './pages/Inbox/Inbox';
import ClientChat from './pages/ClientChat/ClientChat';
import AgentSettingsLayout from './pages/AgentSettings/AgentSettingsLayout';
import './App.css';

function App() {
  return (
    <Router>
            <Routes>
              {/* Client-facing chat page — no sidebar */}
              <Route path="/chat" element={<ClientChat />} />
      
              {/* Agent Settings route */}
              <Route path="/settings/*" element={<AgentSettingsLayout />} />

              {/* Layout for App sections */}
              <Route
                path="/*"
                element={
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/inbox" element={<Inbox />} />
                      <Route path="/analytics" element={<Analytics />} />
                    </Routes>
                  </MainLayout>
                }
              />
            </Routes>
    </Router>
  );
}

export default App;
