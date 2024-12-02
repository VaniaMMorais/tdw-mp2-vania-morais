import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';
import CardList from '../components/CardList';
import Loading from '../components/Loading';
import { useFetchCharactersQuery, useSearchCharactersQuery } from '../redux/api/apiSlice';


const PageContainer = styled.div`
  background-color: var(--white);
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: var(--black);
`;

const Message = styled.p`
  font-size: 1.4rem;
  text-align: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 10px;
  padding: 10px 15px;
  background-color: #d22d2d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Bangers', cursive;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const PaginationSpan = styled.span`
  font-size: 1.2rem;
  font-family: 'Bangers', cursive;
`;

const SearchBar = styled.div`
  margin: 20px 0;
`;

const SearchInput = styled.input`
  width: calc(100% - 20px); /* Deixa espaço lateral */
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

function ListPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useFetchCharactersQuery({ page });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGlobalSearch] = useState(false);
  const { data: searchResults, isLoading: isSearchLoading } = useSearchCharactersQuery(searchTerm, {
    skip: !isGlobalSearch || searchTerm.trim() === "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const characters = data?.data?.results || [];
  const globalCharacters = searchResults?.data?.results || [];
  const charactersToDisplay = isGlobalSearch ? globalCharacters : characters;

  const handleSearch = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      navigate(`/search?query=${event.target.value.trim()}`);
    }
  };

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
      setPage(queryPage);
    }
  }, [location.search]);


  const handlePageChange = (newPage) => {
    setLoading(true);
    setPage(newPage);
    navigate(`?page=${newPage}`);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <PageContainer>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={handleSearch}
        />
      </SearchBar>
      {(loading || isSearchLoading) && <Loading />}
      {isError && <Message>Erro ao carregar personagens.</Message>}
      {!loading && !isSearchLoading && (
        <>
          <CardList characters={charactersToDisplay} />
          {!isGlobalSearch && (
            <PaginationContainer>
              <PaginationButton
                onClick={() => handlePageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
              >
                Back
              </PaginationButton>
              <PaginationSpan>Page {page}</PaginationSpan>
              <PaginationButton onClick={() => handlePageChange(page + 1)}>Next</PaginationButton>
            </PaginationContainer>
          )}
        </>
      )}
      {!loading && !isSearchLoading && charactersToDisplay.length === 0 && (
        <Message>No characters found.</Message>
      )}
    </PageContainer>
  );
}

export default ListPage;
