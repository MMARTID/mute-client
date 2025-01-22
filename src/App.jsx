import { useEffect, useState } from 'react'
import { Routes, Route, Router } from "react-router";
import './App.css'


import Private from '../components/auth/Private';

import ProfilePage from '../pages/ProfilePage'
import HomePage from '../pages/HomePage';
import Signup from '../pages/auth/Signup';
import Login from '../pages/auth/Login'
import SendPost from '../components/DynamicModal';
import ErrorPage from '../pages/ErrorPage';
function App() {

  return (
    
    
      <Routes>
    
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
       
        <Route path="*" element={<ErrorPage />} />

        {/* error routes here... */}

      </Routes>
    
    
  )
}

export default App


