import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import FilterBar from "../components/FilterBar";
import { fetchCharacters } from "../services/api";
import "../styles/global.css"

function ListPage() {
  const [characters, setCharacters] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filter || filter === "") {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await fetchCharacters(filter);
          setCharacters(data);
        } catch (error) {
          console.error("Erro ao buscar personagens:", error);
        }
        setLoading(false);
      };

      fetchData();
    }
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="list-page">
      <FilterBar onFilterChange={handleFilterChange} />
      {loading ? (
        <p>Loading...</p>
      ) : characters.length === 0 ? (
        <p>No characters found.</p>
      ) : (
        <CardList characters={characters} />
      )}
    </div>
  );
}

export default ListPage;
