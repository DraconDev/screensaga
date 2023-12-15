import axios from "axios";
import { Genres, Movie } from "../types/Movie";

export const OMDB_KEY = process.env.OMDB_KEY;
export const YOUTUBE_KEY = process.env.YOUTUBE_KEY;
export const imageBaseUrl = "https://image.tmdb.org/t/p/";
export const imageSize = "original";
export const imageOriginalSize = imageBaseUrl + imageSize;

export const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${OMDB_KEY}`;

export const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${OMDB_KEY}&query=`;

export const MOVIES_GENRES_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${OMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=`;

export async function getMovies(url: string): Promise<Movie[]> {
    const response = await fetch(url);
    const data = await response.json();
    const filteredResults = data.results?.filter(
        (movie: Movie) => movie.backdrop_path
    );
    // return data.results;
    return filteredResults;
}
export async function getMoviesByGenre(genres: Genres[]): Promise<[Movie[]]> {
    let result = [];
    for (let genre of genres) {
        const response = await fetch(MOVIES_GENRES_URL + genre.id);
        const data = await response.json();
        const filteredResults = data.results?.filter(
            (movie: Movie) => movie.backdrop_path
        );
        result.push(filteredResults);
    }

    // return data.results;
    return (await result) as [Movie[]];
}

export async function getListOfGenres(): Promise<Genres[]> {
    const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${OMDB_KEY}&language=en-US`
    );
    const data = await response.json();

    return data.genres;
}

export async function getMovieById(movie_id: string): Promise<Movie> {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${OMDB_KEY}&language=en-US`
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
                api_key: OMDB_KEY,
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
