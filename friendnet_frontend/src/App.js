import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Login } from './components';
import Home from './container/Home';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userJSON = localStorage.getItem('user');
  
    if (userJSON === null) {
      navigate('/login');
    } else {
      try {
        const user = JSON.parse(userJSON);
        if (user && user.hasOwnProperty('profileObj') && user.hasOwnProperty('credential')) {
        } else {
          console.error('Invalid user data in localStorage:', user);
          navigate('/login');
        }
      } catch (e) {
        console.error('Error parsing user JSON:', e);
        navigate('/login');
      }
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