import { Box, Grid, Link, Typography } from "@mui/material";
import useSWR from "swr";
import {
    POPULAR_URL,
    getListOfGenres,
    getMovies,
    getMoviesByGenre,
} from "../utils/movieUtils";
import MovieCard from "./MovieCard";

const MovieList = () => {
    const { data } = useSWR(POPULAR_URL, getMovies);
    const { data: genres } = useSWR("genres", getListOfGenres);

    const { data: moviesByGenre } = useSWR(
        ["moviesByGenre", genres?.slice(0, 2)],
        () => getMoviesByGenre(genres ? genres.slice(0, 2) : [])
    );

    return (
        <Box px={{ py: 6 }}>
            <Typography
                sx={{
                    textAlign: "left",
                    fontWeight: 400,
                    mb: 1,
                    fontSize: "4vh",
                }}
            >
                Trending
            </Typography>
            <Grid
                container
                spacing={0}
            >
                {data?.slice(0, 15)?.map((movie) => (
                    <Grid
                        item
                        xs={4}
                        md={2.4}
                        key={movie.id}
                        component={Link}
                        href={`movie/${movie.id}`}
                        p={0.5}
                        sx={{ backgroundColor: "black" }}
                    >
                        <MovieCard {...movie} />
                    </Grid>
                ))}
            </Grid>
            {moviesByGenre &&
                genres?.slice(0, 2)?.map((genre, index) => (
                    <Box>
                        <Typography
                            sx={{
                                textAlign: "left",
                                fontWeight: 400,
                                mb: 1,
                                fontSize: "4vh",
                            }}
                        >
                            {genre.name}
                        </Typography>
                        <Grid
                            container
                            spacing={0}
                        >
                            {moviesByGenre[index]
                                ?.slice(0, 15)
                                ?.map((movie) => (
                                    <Grid
                                        item
                                        xs={4}
                                        sm={2.4}
                                        key={movie.id}
                                        component={Link}
                                        href={`movie/${movie.id}`}
                                        p={0.5}
                                        sx={{ backgroundColor: "black" }}
                                    >
                                        <MovieCard {...movie} />
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                ))}
        </Box>
    );
};

export default MovieList;
