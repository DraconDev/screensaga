import {
	Grid,
	Card,
	Button,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Fade,
} from "@mui/material";
import { Movie } from "../types/Movie";
import { useState } from "react";

const imageBaseUrl = "https://image.tmdb.org/t/p/";
const imageSize = "w500";

const MovieCard = ({ title, poster_path }: Movie) => {
	return (
		<Card
			sx={{
				backgroundColor: "black",
				transition: "transform 0.12s ease-in-out",
				"&:hover": {
					transform: "scale(1.03)",
				},
			}}
		>
			<CardMedia
				component="img"
				alt={title}
				// height="300"
				image={`${imageBaseUrl}${imageSize}${[poster_path]}`}
				sx={{}}
			/>
		</Card>
	);
};

export default MovieCard;
