import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import CardList from '../components/CardList';
import Loading from '../components/Loading';
import "../styles/global.css"
import { useFetchCharactersQuery } from '../redux/api/apiSlice';

function ListPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useFetchCharactersQuery({ page });
  const [loading, setLoading] = useState(false);
  const characters = data?.data?.results || [];
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const getPageFromQuery = () => {
    const query = new URLSearchParams(location.search);
    return parseInt(query.get("page")) || 1;
  };

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    const queryPage = getPageFromQuery();
    if (queryPage !== page) {
      setPage(queryPage); // Atualiza a página ao navegar diretamente
    }
  }, [location.search]);

  const handlePageChange = (newPage) => {
    setLoading(true); 
    setPage(newPage);
    navigate(`?page=${newPage}`);
    setTimeout(() => {
      
      setLoading(false)
    }, 2000); 
  };

  return (
    <div className="list-page">
      {loading && <Loading />}
      {isError && <p>Erro ao carregar personagens.</p>}
      {!loading && !isError && (
        <>
          <CardList characters={characters} />
          <div className="pagination">
            <button
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
              disabled={page === 1}
            >
              Back
            </button>
            <span>Page {page}</span>
            <button onClick={() => handlePageChange(page + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ListPage;
