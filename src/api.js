import axios from "axios"

const apiKey = process.env.REACT_APP_APIKEY
const baseUrl = process.env.REACT_APP_BASEURL

export const getMovieList = async() => {
    const movie = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`)
    return movie.data.results
}

export const searchMovie = async (q) => {
    const search = await axios.get(`${baseUrl}/search/movie?query=${q}&api_key=${apiKey}`)
    return search.data
}

export const getGenres = async () => {
    const response = await axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
    return response.data.genres;
};

export const getGenreName = (genreIds, genres) => {
    const genreNames = genreIds.map((id) => {
      const genre = genres.find((genre) => genre.id === id);
      return genre ? genre.name : "";
    });
  
    return genreNames.join(", ");
  };
  
  export const getMovieDetail = async (movieId) => {
    const response = await axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
    return response.data;
  };
