import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import CardList from "../components/CardList";
import { useSearchCharactersQuery } from "../redux/api/apiSlice";

const PageContainer = styled.div`
  background-color: var(--white);
  padding: 20px;
  font-family: "Arial", sans-serif;
  color: var(--black);
`;

const LoadMoreButton = styled.button`
  margin: 20px auto;
  display: block;
  padding: 10px 20px;
  background-color: #d22d2d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #a71b1b;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

function SearchResultsPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useSearchCharactersQuery({ name: query, page });

  const [allCharacters, setAllCharacters] = useState([]);

  React.useEffect(() => {
    if (data?.data?.results) {
      setAllCharacters((prev) => [...prev, ...data.data.results]);
    }
  }, [data]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); 
  };

  return (
    <PageContainer>
      <h1>Search Results for "{query}"</h1>
      {isLoading && <Loading />}
      {isError && <p>Error fetching results.</p>}
      {!isLoading && allCharacters.length === 0 && <p>No characters found.</p>}
      {!isLoading && allCharacters.length > 0 && (
        <>
          <CardList characters={allCharacters} />
          {data?.data?.results?.length > 0 && (
            <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? "Loading..." : "Load More"}
            </LoadMoreButton>
          )}
        </>
      )}
    </PageContainer>
  );
}

export default SearchResultsPage;
