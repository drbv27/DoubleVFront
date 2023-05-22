import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)




/* import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css'
import UserProfile from './components/UserProfile';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/user/:username" element={<UserProfile />} />
    </Routes>
  </Router>
); */


