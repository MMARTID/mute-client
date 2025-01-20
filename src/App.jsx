import { useEffect, useState } from 'react'
import { Routes, Route, Router } from "react-router";
import './App.css'

import Layout from '../components/Layout';
import Private from '../components/auth/Private';

import ProfilePage from '../pages/ProfilePage'
import HomePage from '../pages/HomePage';
import Signup from '../pages/auth/Signup';
import Login from '../pages/auth/Login'

function App() {

  return (
    
    <Layout>
      <Routes>
    
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        {/* error routes here... */}

      </Routes>
    </Layout>
    
  )
}

export default App


