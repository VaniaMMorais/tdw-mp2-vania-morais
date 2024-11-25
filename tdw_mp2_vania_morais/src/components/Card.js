import React from "react";
import "./style.css";

function Card({ character }) {
  return (
    <div className="card">
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="card-image"
      />
      <h3 className="card-title">{character.name}</h3>
      <p className="card-description">
        {character.description || "No description available."}
      </p>
    </div>
  );
}

export default Card;
