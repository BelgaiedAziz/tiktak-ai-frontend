import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Inbox from './pages/Inbox/Inbox';
import './App.css';

function App() {
  return (
    <div className="App flex h-screen w-screen overflow-hidden text-gray-800 bg-gray-50 font-sans">
      <Sidebar />
      <Inbox />
    </div>
  );
}

export default App;
