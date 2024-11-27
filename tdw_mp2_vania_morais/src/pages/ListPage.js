import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import Loading from '../components/Loading';
import "../styles/global.css"
import { useFetchCharactersQuery } from '../redux/api/apiSlice';

function ListPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useFetchCharactersQuery({ page });
  const [loading, setLoading] = useState(false);
  console.log("API Data:", data); // Log dos dados retornados pela API
  console.log("Is Loading:", isLoading); // Verificar se está carregando
  const characters = data?.data?.results || [];

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  const handlePageChange = (newPage) => {
    console.log("ENTREI AQUI");
    setLoading(true); // Força o estado de loading para true
    setPage(newPage); 
    // Temporizador para garantir pelo menos 1 segundo de loading
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
