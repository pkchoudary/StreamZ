// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import SeriesDetail from './components/SeriesDetail';
import UserProfile from './components/UserProfile';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:movieId" element={<MovieDetail />} />
      <Route path="/series/:seriesId" element={<SeriesDetail />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  </Router>
);

export default App;
