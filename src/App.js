import FilterGenre from './FilterGenre';
import { useEffect, useState } from 'react'
import './App.css'
import { getMovieList, searchMovie } from './api.js'
import { getGenres, getGenreName } from './api.js'
const App = () => 
{

  const [popularMovies, setPopularMovies]  = useState([])

  const [selectedGenre, setSelectedGenre] = useState('');
  
  const [allMovies, setAllMovies] = useState ([])
  useEffect(() => {
    getMovieList().then((result) => {
      setAllMovies(result)
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = () => {

    const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await getGenres();
      setGenres(response);
    };

    fetchGenres();
  }, []);

    return popularMovies.map((movie, i) => {

      const genreNames = getGenreName(movie.genre_ids, genres);

      return (
        <div key={i}>
          <div className="Movie-wrapper" key={i}>
              <div className="Movie-title">{movie.title}</div>
              <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
              <div className="Movie-genre">Genre: {genreNames}</div>
              <div className="Movie-date">Released : {movie.release_date}</div>
              <div className="Movie-rate">{movie.vote_average}</div>
            </div>
        </div>
      )
    })
  }

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };


  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setAllMovies(query.results);
      const filteredMovies = query.results.filter((movie) =>
        movie.title.toLowerCase().includes(q.toLowerCase())
      );
      setPopularMovies(filteredMovies);
    } else {
      setPopularMovies(allMovies);
    }
  
    if (selectedGenre) {
      const filteredMoviesByGenre = allMovies.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      );
      setPopularMovies(filteredMoviesByGenre);
    }
  };

  
  

  return (
      <div className="App">
        <header className="App-header">
          <h1>Aksata Movie</h1>
          <input 
            placeholder="Silahkan cari film menarik..." 
            className='Movie-search' 
            onChange={({ target }) => search(target.value)}
          
          />
           <FilterGenre handleGenreChange={handleGenreChange} />
          <div className="Movie-container">
            <PopularMovieList />
          </div>
        </header>        
      </div>
  );
}

export default App