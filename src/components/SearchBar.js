import React, { useState } from 'react';
import { Input, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <Input
        type="text"
        placeholder="Search movies or series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchBar;
