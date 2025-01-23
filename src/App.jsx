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
    
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
       
        <Route path="*" element={<ErrorPage />} />

        {/* error routes here... */}

      </Routes>
    
    
  )
}

export default App


