import axios from "axios";
import { Genres, Movie } from "../types/Movie";
import useSWR from "swr";

export const API_KEY = import.meta.env.VITE_API_KEY;

export const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${
	import.meta.env.VITE_API_KEY
}`;

export const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

export async function getMovies(url: string): Promise<Movie[]> {
	const response = await fetch(url);
	const data = await response.json();
	return data.results;
}

export async function getListOfGenres() {
	const response = await fetch(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
	);
	const data = await response.json();
	return data.genres;
}
export const genres = (await getListOfGenres()) as Genres[];

export async function getMovieById(movie_id: string): Promise<Movie> {
	
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
	);
	const data = await response.json();

	return data;
}

export async function searchRecommendations(
	// query: string,
	searchGenre: string
): Promise<Movie[]> {
	const data = await axios.get(
		"https://api.themoviedb.org/3/discover/movie",
		{
			params: {
				api_key: API_KEY,
				with_genres: searchGenre,
				page: Math.floor(Math.random() * 15) + 1,
			},
		}
	);

	const results = data.data.results as Movie[];
	const filterData = results.filter(
		(movie) => movie.backdrop_path && movie.vote_count > 100
	);

	function compareRandom(a: any, b: any) {
		return Math.random() - 0.5;
	}
	const shuffledArray = filterData.sort(compareRandom);

	return filterData.splice(0, 3);
}
