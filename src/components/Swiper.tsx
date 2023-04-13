import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { POPULAR_URL, getMovies } from "../utils/movieUtils";
import useSWR from "swr";

type Props = {};

const Swiper = (props: Props) => {
	const { data, error, isLoading } = useSWR(POPULAR_URL, getMovies);

	const imageBaseUrl = "https://image.tmdb.org/t/p/";
	const imageSize = "original";

	const filteredData = data?.filter((movie) => movie.backdrop_path);

	return (
		<Box sx={{ textAlign: "center", height: "100%" }}>
			<Carousel animation="fade" indicators={false}>
				{filteredData?.map((movie) => (
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
							src={`${imageBaseUrl}${imageSize}${[
								movie.backdrop_path,
							]}`}
							alt={movie.title}
							width="100%"
							height="100%"
							style={{ objectFit: "cover" }}
						/>
						<Typography variant="h4">{movie.title}</Typography>
					</Paper>
				))}
			</Carousel>
		</Box>
	);
};

export default Swiper;
