import { Box, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import useSWR from "swr";
import { POPULAR_URL, getMovies, imageOriginalSize } from "../utils/movieUtils";

const Swiper = () => {
    const { data } = useSWR(POPULAR_URL, getMovies);

    return (
        <Box sx={{ textAlign: "center", height: "100%" }}>
            <Carousel
                animation="fade"
                indicators={false}
            >
                {data?.map((movie) => (
                    <Paper
                        key={movie.id}
                        sx={{
                            p: 0,
                            m: 0,
                            backgroundColor: (theme) =>
                                theme.palette.background.default,
                        }}
                    >
                        <img
                            src={`${imageOriginalSize}${[movie.backdrop_path]}`}
                            alt={movie.title}
                            width="100%"
                            height="100%"
                            style={{ objectFit: "cover" }}
                        />
                        <Typography sx={{ fontSize: "3vh" }}>
                            {movie.title}
                        </Typography>
                    </Paper>
                ))}
            </Carousel>
        </Box>
    );
};

export default Swiper;
