import { Input } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import { alpha, styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import NavButtons from "./NavButtons";
import NavSearch from "./NavSearch";

export default function SearchAppBar() {
    const [searchField, setSearchField] = React.useState("");
    const router = useRouter();

    function handleKeyDown(e: KeyboardEvent) {
        if (e.code === "Enter" && searchField.length > 2) {
            router.push("/search/" + searchField);
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
                backgroundColor: "primary.dark",
                mb: 8,
                width: "100%",
            }}
        >
            <AppBar position="fixed">
                <Toolbar
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "secondary.dark",
                    }}
                >
                    <Box sx={{ display: "flex" }}>
                        <NavButtons text="Saga" route="/" />
                        <NavButtons text="Picks" route="/recommendations/" />
                    </Box>
                    <NavSearch
                        searchField={searchField}
                        setSearchField={setSearchField}
                    />
                    <Box></Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
