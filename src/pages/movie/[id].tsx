import React from "react";
import useSWR from "swr";
import { getMovieById, imageOriginalSize } from "../../utils/movieUtils";
import MainLayout from "../../layout/MainLayout";
import { Box, Typography } from "@mui/material";
import { Genres } from "../../types/Movie";
import VideoPlayer from "../../components/VideoPlayer";
import { useRouter } from "next/router";

const MoviePage = () => {
    const router = useRouter();
    const id = router.query.id;
    const { data } = useSWR(id, getMovieById);

    return (
        <MainLayout>
            {data && (
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            p: 1,
                            alignItems: "end",
                        }}
                    >
                        <Typography sx={{ width: "100%", fontSize: "2vh" }}>
                            {data.title}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                placeItems: "end",
                                width: "40%",
                            }}
                        >
                            <Typography variant="body1" color="initial">
                                Rating: {data.vote_average.toFixed(1)}
                            </Typography>
                            <Typography variant="subtitle2" color="initial">
                                Votes: {data.vote_count}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <img
                            src={`${imageOriginalSize}${data.backdrop_path}`}
                            alt=""
                            width="100%"
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ display: "flex" }}>
                            {data.genres.slice(0, 3).map((id: Genres) => (
                                <Typography
                                    color="initial"
                                    sx={{ p: 0.5, fontSize: "1.7vh" }}
                                >
                                    {id.name}
                                </Typography>
                            ))}
                        </Box>
                        <Typography
                            // variant="h5"
                            color="initial"
                            sx={{ p: 1, fontSize: "2vh" }}
                        >
                            {data.release_date}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            p: 1,
                            display: "flex",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {/* <img
                            src={`${imageOriginalSize}${data.poster_path}`}
                            alt=""
                            width="30%"
                        /> */}
                        <VideoPlayer searchQuery={data.title} />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: 2,
                        }}
                    >
                        <Typography
                            color="initial"
                            sx={{ p: 2, fontSize: "2vh" }}
                        >
                            {data.overview}
                        </Typography>
                    </Box>
                </Box>
            )}
        </MainLayout>
    );
};

export default MoviePage;
