import { useEffect, useState } from 'react'
import { Routes, Route, Router } from "react-router";
import './App.css'


import Private from '../components/auth/Private';

import ProfilePage from '../pages/ProfilePage'
import HomePage from '../pages/HomePage';
import Signup from '../pages/auth/Signup';
import Login from '../pages/auth/Login'
import SendPost from '../components/DynamicModal';

function App() {

  return (
    
    
      <Routes>
    
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/home/:userId" element={<HomePage />} />

        {/* error routes here... */}

      </Routes>
    
    
  )
}

export default App


