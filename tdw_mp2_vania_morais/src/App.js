import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import StaticPage from "./pages/StaticPage";
import Navbar from "./components/Navbar";
import FavoritesPage from "./pages/FavoritesPage";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
        <Route path="/about" element={<StaticPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
