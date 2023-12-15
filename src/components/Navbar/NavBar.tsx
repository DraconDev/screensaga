import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <>
                <AppBar
                    position="fixed"
                    sx={{
                        display: "flex",
                        height: "full",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            // mui max width
                            maxWidth: "1152px",
                            gap: 1,
                            p: 1,
                        }}
                    >
                        <NavButtons
                            text="Saga"
                            route="/"
                        />
                        <NavSearch
                            searchField={searchField}
                            setSearchField={setSearchField}
                        />
                        <NavButtons
                            text="Random"
                            route="/recommendations/"
                        />
                    </Toolbar>
                </AppBar>
            </>
        </Box>
    );
}
