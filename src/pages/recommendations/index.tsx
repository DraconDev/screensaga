import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import MovieCard from "../../components/MovieCard";
import MainLayout from "../../layout/MainLayout";
import { getListOfGenres, searchRecommendations } from "../../utils/movieUtils";
import { Genres } from "@component/types/Movie";

const Recommendations = () => {
    const { data: movieGenre } = useSWR<Genres[]>("genres", getListOfGenres);
    const [searchGenre, setSearchGenre] = useState("");
    const { data, mutate } = useSWR(searchGenre, searchRecommendations);

    console.log(data, movieGenre, "data & genres");

    const router = useRouter();
    return (
        <MainLayout>
            <Typography
                color="initial"
                sx={{
                    fontWeight: "500",
                    mt: 1,
                    textAlign: "center",
                    fontSize: "4vh",
                }}
            >
                Pick a genre
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    placeItems: "center",
                    m: 1,
                }}
            >
                {movieGenre &&
                    movieGenre?.map((genre) => (
                        <Button
                            variant="contained"
                            color="primary"
                            key={genre.id}
                            sx={{ p: 0.5, m: 0.5, fontSize: "1.4vh" }}
                            onClick={() => {
                                setSearchGenre(genre.id.toString());
                                mutate();
                            }}
                        >
                            {genre.name}
                        </Button>
                    ))}
            </Box>
            <Grid container>
                {data?.map((movie) => (
                    <Grid
                        xs={4}
                        md={4}
                        key={movie.id}
                        p={0.4}
                        onClick={() => router.push(`/movie/${movie.id}`)}
                        // height="70vh"
                    >
                        <Typography
                            color="initial"
                            sx={{
                                fontSize: "2vh",
                                height: "3rem",
                                overflow: "hidden",
                            }}
                        >
                            {movie.title}
                        </Typography>
                        <MovieCard {...movie} />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    p: 0.5,
                                    width: "100%",
                                    justifyContent: "end",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    color="initial"
                                    sx={{ fontSize: "2vh" }}
                                >
                                    {movie.vote_average.toFixed(1)}
                                </Typography>
                            </Box>
                            {/* <Typography
                                variant="body1"
                                sx={{
                                    p: 1,
                                    display: { xs: "none", sm: "block" },
                                }}
                            >
                                {movie.overview}
                            </Typography> */}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </MainLayout>
    );
};

export default Recommendations;
