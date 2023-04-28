import useSWR from "swr";
import { Box, Grid, Link, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import { POPULAR_URL, getMovies } from "../utils/movieUtils";

const MovieList = () => {
    const { data } = useSWR(POPULAR_URL, getMovies);
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
            <Grid container spacing={0}>
                {data?.map((movie) => (
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
        </Box>
    );
};

export default MovieList;
