import React from "react";
import "../styles/Homepage.css";
import Search from "antd/es/transfer/search";

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <Search placeholder="Search for products..." />
    </div>
  );
};
export default SearchBar;
