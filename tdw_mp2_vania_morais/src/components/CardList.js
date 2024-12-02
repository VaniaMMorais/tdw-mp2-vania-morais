import React from "react";
import Card from "./Card";
import styled from "styled-components";
import PropTypes from "prop-types";

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

CardList.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      thumbnail: PropTypes.shape({
        path: PropTypes.string.isRequired,
        extension: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export default CardList;
