import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/home'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}
          <Route path="/" element={<Home />} /> {/* Added root path */}
          {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
