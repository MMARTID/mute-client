import { Routes, Route } from "react-router-dom";
import './App.css'
import './ProfilePage.css'
import './Sidebar.css'
import Private from '../src/components/auth/Private.jsx'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login'
import SendPost from '../src/components/SendPost';

import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App;
