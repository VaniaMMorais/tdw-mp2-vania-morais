import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import FilterBar from "../components/FilterBar";
import { fetchCharacters } from "../services/api";
import Loading from "../components/Loading";
import "../styles/global.css"

function ListPage() {
  const [characters, setCharacters] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCharacters({ page });
      setCharacters(data);
      setLoading(false);
    };
  
    fetchData();
  }, [page]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="list-page">
      {loading ? (
        <Loading />
      ) : (
        <>
          <CardList characters={characters} />
          <div className="pagination">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Back
            </button>
            <span>Page {page}</span>
            <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ListPage;
