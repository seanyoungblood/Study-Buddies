import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import StudyPage from './pages/StudyPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GroupPage from './pages/GroupPage';
import ClassesPage from './pages/ClassesPage';
import UserPage from './pages/UserPage';
import { AuthContextProvider } from './useContext/LoginContext';

function App() {
  return (
    <AuthContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<HomePage />} />
      <Route path="/studygroups" index element={<StudyPage />} />
      <Route path="/about" index element={<AboutPage />} />
      <Route path="/profile" index element={<ProfilePage />} />
      <Route path="/login" index element={<LoginPage />} />
      <Route path="/register" index element={<RegisterPage />} />
      <Route path="/group" index element={<GroupPage />} />
      <Route path="/classes" index element={<ClassesPage />} />
      <Route path="/user" index element={<UserPage />} />
    </Routes>
  </BrowserRouter>
  </AuthContextProvider>
);
}

export default App;