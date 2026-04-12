import React from "react";

const Sort = ({ sortType, setSortType }) => {
  return (
    <div className="filter-container">
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="">Sort by...</option>
        <option value="NEW_TO_OLD">Newest to Oldest</option>
        <option value="OLD_TO_NEW">Oldest to Newest</option>
      </select>
    </div>
  );
};

export default Sort;