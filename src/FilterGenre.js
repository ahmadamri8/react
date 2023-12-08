import React, { useEffect, useState } from 'react';
import { getGenres } from './api.js';

const FilterGenre = ({ handleGenreChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await getGenres();
      setGenres(response);
    };

    fetchGenres();
  }, []);

  return (
    <div className="filter-genre">
      <span>Filter Genre : </span>
      <select onChange={(e) => handleGenreChange(e.target.value)}>
        <option value="">Semua Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterGenre;
 