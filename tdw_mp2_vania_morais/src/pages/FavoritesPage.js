import React from "react";
import { useSelector } from "react-redux";
import CardList from "../components/CardList";
import styled from "styled-components";

const PageContainer = styled.div`
  background-color: var(--white);
  padding: 20px;
  font-family: "Arial", sans-serif;
  color: var(--black);
`;

const Message = styled.p`
  font-size: 1.4rem;
  text-align: center;
`;

function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <PageContainer>
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        <CardList characters={favorites} />
      ) : (
        <Message>You don&apos;t have any favorites yet!</Message>
      )}
    </PageContainer>
  );
}

export default FavoritesPage;
