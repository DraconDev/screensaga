import { Movie } from "@component/types/Movie";
import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import MainLayout from "../../layout/MainLayout";
import {
    SEARCH_URL,
    getMovies,
    imageOriginalSize,
} from "../../utils/movieUtils";

const SearchPage = () => {
    const router = useRouter();
    const search = router.query.search;
    console.log("search: " + search);
    const { data } = useSWR<Movie[]>(SEARCH_URL + search, getMovies);

    return (
        <MainLayout>
            <Box sx={{ mt: 10 }}>
                {data?.map((movie) => (
                    <Paper
                        elevation={3}
                        onClick={() => router.push(`/movie/${movie.id}`)}
                        sx={{
                            m: 1,
                            height: { xs: "25%", sm: "30vh" },
                            borderRadius: "5px",
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            my: 3,
                            backgroundColor: "#222",
                            color: "white",
                            overflow: "hidden",
                            transition: "transform 0.12s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                        }}
                    >
                        <img
                            src={`${imageOriginalSize}${movie.backdrop_path}`}
                            alt=""
                            height="100%"
                        />

                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    backgroundColor: "secondary.dark",
                                }}
                            >
                                <Typography sx={{ fontSize: "2vh", p: 0.5 }}>
                                    {movie.title.length > 80
                                        ? movie.title.slice(0, 80) + "..."
                                        : movie.title}
                                </Typography>
                                <Typography sx={{ fontSize: "2vh", p: 0.5 }}>
                                    {movie.vote_average.toFixed(1)}/10
                                </Typography>
                            </Box>
                            <Typography
                                sx={{ width: "100%", fontSize: "1.6vh", p: 1 }}
                            >
                                {movie.overview.length > 222
                                    ? movie.overview.slice(0, 222) + "..."
                                    : movie.overview}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </MainLayout>
    );
};

export default SearchPage;
