import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

const CardContainer = styled(Link)`
  background-color: #f4e0c8;
  border: 3px solid #000000;
  border-radius: 10px;
  box-shadow: 5px 5px 0 #4a2c2a;
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  text-decoration: none; /* Remove o sublinhado */
  color: inherit; /* Herda a cor para o texto */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 10px 10px 0 #4a2c2a;
  }
`;

const CardImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-family: "Comic Sans MS", sans-serif;
  color: #d22d2d;
  font-size: 1.8rem;
  margin: 10px 0;
  text-shadow: 2px 2px #000000;
`;

const CardDescription = styled.p`
  font-family: "Arial", sans-serif;
  color: #3a66cc;
  font-size: 1.2rem;
`;


function Card({ character }) {
  return (
    <CardContainer as={Link} to={`/character/${character.id}`}>
      <CardImage
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <CardTitle>{character.name}</CardTitle>
      <CardDescription>
        {character.description || "No description available."}
      </CardDescription>
    </CardContainer>
  );
}


export default Card;
