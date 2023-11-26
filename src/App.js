import React from 'react';
import './App.css';
import Signup from './Components/Pages/Signup';
import Dashboard from './Components/Pages/Dashboard';
import { Route,Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      
    </div>
  );
}

export default App;
