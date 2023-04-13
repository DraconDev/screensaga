import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
	justifySelf: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

export default function SearchAppBar() {
	const [searchField, setSearchField] = React.useState("");
	const router = useRouter();

	function handleKeyDown(e: KeyboardEvent) {
		if (e.code === "Enter" && searchField.length > 2) {
			navigate("/search/" + searchField, { replace: true });
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return function cleanup() {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [searchField]);

	return (
		<Box
			sx={{
				flexGrow: 1,
				backgroundColor: (theme) => theme.palette.primary.main,
				mb: 8,
			}}
		>
			<AppBar position="fixed">
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between",

						backgroundColor: (theme) =>
							theme.palette.secondary.main,
					}}
				>
					<Box>
						<Button
							variant="text"
							component={Link}
							to="/"
							sx={{ mx: 1, color: "white" }}
						>
							ScreenSaga
						</Button>
					</Box>
					<Box
						sx={{
							justifySelf: "center",
							flexGrow: 0.5,
							display: "flex",
							placeItems: "center",
						}}
					>
						<Search sx={{ flexGrow: 1 }}>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								sx={{ width: "100%" }}
								inputProps={{ "aria-label": "search" }}
								value={searchField}
								onChange={(event) =>
									setSearchField(event.target.value)
								}
							/>
						</Search>
						<Button
							variant="text"
							// component={Link}
							// to={`/search/${searchField}`}
							onClick={() => {
								if (searchField.length > 2) {
									navigate(`/search/${searchField}`);
								}
							}}
							sx={{ color: "white" }}
						>
							Search
						</Button>
					</Box>
					<Button
						onClick={() => navigate("/recommendations/")}
						sx={{ color: "white", mx: 1 }}
					>
						Movie recommender
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
