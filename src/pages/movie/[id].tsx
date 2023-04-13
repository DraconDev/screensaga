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
							p: 2,
							alignItems: "end",
						}}
					>
						<Typography variant="h3">{data.title}</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								placeItems: "end",
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
							{data.genres.map((id: Genres) => (
								<Typography
									variant="h5"
									color="initial"
									sx={{ p: 2 }}
								>
									{id.name}
								</Typography>
							))}
						</Box>
						<Typography variant="h5" color="initial">
							{data.release_date}
						</Typography>
					</Box>
					<Box sx={{ p: 1, display: "flex", width: "100%" }}>
						<img
							src={`${imageOriginalSize}${data.poster_path}`}
							alt=""
							width="30%"
						/>
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
							variant="h5"
							color="initial"
							sx={{ p: 2, lineHeight: 1.75 }}
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
