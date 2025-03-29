import React from "react";
import styles from "./UserManagement.module.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search users..."
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
