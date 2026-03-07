import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Inbox from './pages/Inbox/Inbox';
import AdminMessages from './pages/Messages/AdminMessages';
import Leads from './pages/Leads/Leads';
import ClientChat from './pages/ClientChat/ClientChat';
import TestMetaSender from './pages/TestMetaSender/TestMetaSender';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Client-facing chat page — no sidebar */}
        <Route path="/chat" element={<ClientChat />} />

        {/* Test Meta API sender — temporary tool */}
        <Route path="/test-sender" element={<TestMetaSender />} />

        {/* Admin layout */}
        <Route
          path="/*"
          element={
            <div className="App flex h-screen w-screen overflow-hidden text-gray-800 font-sans">
              <Sidebar />
              <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <Navbar />
                <div className="flex-1 min-h-0 relative">
                  <div className="absolute inset-0 overflow-hidden">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/inbox" element={<Inbox />} />
                      <Route path="/messages" element={<AdminMessages />} />
                      <Route path="/leads" element={<Leads />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
