import React from 'react';
import '../styles/Homepage.css';
const SearchBar: React.FC = () => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search for products ..."
    />
  );
};
export default SearchBar;
