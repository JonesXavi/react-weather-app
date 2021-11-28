import React, { useState } from 'react';

import './SearchForm.css';

const SearchForm = ({ submitSearch }) => {
  const [location, setLocation] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (!location || location === '') return;
    submitSearch(location);
  };

  return (
  <div className='common-card'>
    <form onSubmit={onSubmit}>
      <input
          aria-label="location"
          type="text"
          className="input"
          placeholder="Location"
          required
          value={location}
          onChange={e => setLocation(e.target.value)}
      />
      <span type='button' className='button button--outline' onClick={onSubmit} onSubmit={onSubmit}>
        Search
      </span>
    </form>
  </div>
  );
};

export default SearchForm;
