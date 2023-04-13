import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { genres, searchRecommendations } from "../../utils/movieUtils";
import MainLayout from "../../layout/MainLayout";
import { Movie } from "../../types/Movie";
import { Box, Grid, Link, Typography, Button } from "@mui/material";
import { imageBaseUrl } from "../moviepage/MoviePage";
import MovieCard from "../../components/MovieCard";
import { useNavigate } from "react-router-dom";

type Props = {};

const Recommendations = (props: Props) => {
	const [searchGenre, setSearchGenre] = useState("");
	const { data, mutate, error, isLoading } = useSWR(
		searchGenre,
		searchRecommendations
	);

	const router = useRouter();
	return (
		<MainLayout>
			<Typography
				variant="h3"
				color="initial"
				sx={{
					fontWeight: "500",
					mt: 1,
					textAlign: "center",
				}}
			>
				Pick a genre
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					placeItems: "center",
					m: 3,
				}}
			>
				{genres.map((genre) => (
					<Button
						variant="contained"
						color="primary"
						key={genre.id}
						sx={{ p: 1, m: 1 }}
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
						p={1}
						onClick={() => navigate(`/movie/${movie.id}`)}
						height="70vh"
					>
						<MovieCard {...movie} />
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									p: 0.5,
								}}
							>
								<Typography variant="h6" color="initial">
									{movie.title}
								</Typography>
								<Typography variant="h6" color="initial">
									{movie.vote_average.toFixed(1)}
								</Typography>
							</Box>
							<Typography variant="body1" sx={{ p: 1 }}>
								{movie.overview}
							</Typography>
							<Button
								variant="text"
								color="primary"
								onClick={() => navigate(`/movie/${movie.id}`)}
							>
								Go to
							</Button>
						</Box>
					</Grid>
				))}
			</Grid>
		</MainLayout>
	);
};

export default Recommendations;
