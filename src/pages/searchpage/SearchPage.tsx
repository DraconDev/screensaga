import React from "react";
import MainLayout from "../../layout/MainLayout";
import { SEARCH_URL, getMovies } from "../../utils/movieUtils";
import useSWR from "swr";
import { Box, Link, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";

type Props = {
	search: string | undefined;
};

const SearchPage = ({ search }: Props) => {
	const { data, error, isLoading } = useSWR(SEARCH_URL + search, getMovies);
	const filteredResults = data?.filter((movie) => movie.backdrop_path);

	const imageBaseUrl = "https://image.tmdb.org/t/p/";
	const imageSize = "original";

	const router = useRouter();

	return (
		<MainLayout>
			{filteredResults?.map((movie) => (
				<Paper
					elevation={3}
					// component={Link}
					// href={`movie/${movie.id}`}
					// underline="none"
					onClick={() => router.push(`/movie/${movie.id}`)}
					sx={{
						m: 1,
						height: "23vh",
						borderRadius: "3px",
						display: "flex",
						my: 3,
						backgroundColor: "#222",
						color: "white",
						p: 0.2,
						overflow: "hidden",
						transition: "transform 0.12s ease-in-out",
						"&:hover": {
							transform: "scale(1.03)",
						},
					}}
				>
					<img
						src={`${imageBaseUrl}${imageSize}${movie.backdrop_path}`}
						alt=""
						height="100%"
					/>
					<Box sx={{ p: 1, width: "100%" }}>
						<Box
							sx={{
								mb: 1,
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Typography variant="h6">
								{movie.title.length > 80
									? movie.title.slice(0, 80) + "..."
									: movie.title}
							</Typography>
							<Typography variant="h6">
								Rating: {movie.vote_average.toFixed(1)}/10
							</Typography>
						</Box>
						<Typography variant="body2" sx={{ width: "100%" }}>
							{movie.overview.length > 222
								? movie.overview.slice(0, 222) + "..."
								: movie.overview}
						</Typography>
					</Box>
				</Paper>
			))}
		</MainLayout>
	);
};

export default SearchPage;
