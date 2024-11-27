import React from "react";
import Card from "./Card";
import styled from "styled-components";

const CardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

function CardList({ characters }) {
  return (
    <CardListContainer>
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </CardListContainer>
  );
}

export default CardList;
