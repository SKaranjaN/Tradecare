import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Forms from './components/form';

// import Verification from './components/Verification';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<Forms />} />
          {/* <Route path="/verify-email/:token" component={Verification} /> */}
        </Routes>
    </Router>
  );
}

export default App;
