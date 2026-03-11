import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RingDetail from './pages/RingDetail';
import Couple from './pages/Couple';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ring/:id" element={<RingDetail />} />
        <Route path="/couple" element={<Couple />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;