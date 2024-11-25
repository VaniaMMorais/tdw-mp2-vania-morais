import React, { useState } from "react";

function FilterBar({ onFilterChange }) {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <div className="filter-bar">
      <select value={filter} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="comics">Comics</option>
        <option value="events">Events</option>
        <option value="creators">Creators</option>
      </select>
    </div>
  );
}

export default FilterBar;
