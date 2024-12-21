import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import Login from './components/login/Login';
import Amount from './components/amount/Amount';
import ProtectedRoute from './components/login/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
        <Route path="/amount" element={<ProtectedRoute><Amount /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;