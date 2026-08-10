import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LessonsPage } from './pages/LessonsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lessons" element={<LessonsPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
