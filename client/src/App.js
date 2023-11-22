import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Forms from './components/form';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <Router>
      {/* Wrap the entire application with AuthProvider */}
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<Forms />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
