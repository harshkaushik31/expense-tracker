import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from './pages/Auth/Login';
import DashboardLayout from './components/Layout/DashboardLayout';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expenses from './pages/Dashboard/Expenses';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<Login />} />


     {/* Dashboard Layout Route (parent) */}
      <Route path="/" element={<DashboardLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="income" element={<Income />} />
        <Route path="expenses" element={<Expenses />} />
      </Route>
      
    </Routes>
  );
}

export default App;

// Root Component
const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem('token');
  
  navigate(token ? '/home' : '/login');
}, [navigate]);


  return null;
};


