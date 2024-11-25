import React from "react";
import Card from "./Card";

function CardList({ characters }) {
  return (
    <div className="card-list">
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
}

export default CardList;
