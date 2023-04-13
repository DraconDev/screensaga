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
				{movieGenre &&
					movieGenre?.map((genre) => (
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
						onClick={() => router.push(`/movie/${movie.id}`)}
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
								onClick={() =>
									router.push(`/movie/${movie.id}`)
								}
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
