import React from "react";

function SearchTimeboxes({ search }) {
  return (
    <div className="TimeboxSearch">
      <input type="text" placeholder="search timeboxes" onChange={search} />
    </div>
  );
}

export default SearchTimeboxes;
