import React, { ReactNode } from "react";
import NavBar from "../components/NavBar";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

interface MainProps {
	children: ReactNode;
}

const main = ({ children }: { children: ReactNode }) => {
	return (
		<Box sx={{ color: "white" }}>
			<NavBar></NavBar>
			<Container maxWidth="lg">{children}</Container>
		</Box>
	);
};

export default main;
