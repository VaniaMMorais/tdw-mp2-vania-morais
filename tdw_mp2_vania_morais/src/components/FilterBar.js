import React, { useState } from "react";
import styled from "styled-components";

const FilterBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Select = styled.select`
  font-family: 'Comic Sans MS', sans-serif;
  background-color: #f7d04b;
  border: 2px solid #000000;
  color: #000000;
  padding: 10px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #d22d2d;
    color: #ffffff;
  }
`;


function FilterBar({ onFilterChange }) {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <FilterBarContainer>
      <Select value={filter} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="comics">Comics</option>
        <option value="events">Events</option>
        <option value="creators">Creators</option>
      </Select>
    </FilterBarContainer>
  );
}


export default FilterBar;
