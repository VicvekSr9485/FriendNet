import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Login } from './components';
import Home from './container/Home';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;
  
    if (user === null) {
      navigate('/login');
    }
  }, []);
  

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;