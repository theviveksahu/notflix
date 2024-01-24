import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TMDB_BASE_URL } from "../utils/constants";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${apiKey}`);
  return genres;
});

const createArrayfromRawData = (array, moviesArray, genres) => {
  for (const movie of array) {
    const movieGenres = [];
    for (const genre of movie.genre_ids) {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    }

    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  }
};

const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);

    createArrayfromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();

    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${apiKey}`,
      genres,
      true
    );
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "netflix/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&with_genres=${genre}`,
      genres
    );
  }
);

const NetflixSlice = createSlice({
  name: "netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const {} = NetflixSlice.actions;
export default NetflixSlice.reducer;
