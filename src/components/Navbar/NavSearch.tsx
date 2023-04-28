import { Box, Input, Button, Link } from "@mui/material";
import router from "next/router";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
    searchField: string;
    setSearchField: (value: string) => void;
};

const NavSearch = ({ searchField, setSearchField }: Props) => {
    return (
        <Box
            className="nav"
            sx={{
                display: "flex",
                backgroundColor: "secondary.light",
                height: "2rem",
                m: 1,
                borderRadius: "5px",
                alignItems: "start",
                width: "100%",
            }}
        >
            <Input
                disableUnderline={true}
                sx={{
                    flexGrow: 1,
                    height: "100%",
                    mx: 2,
                    fontSize: "1rem",
                    display: "flex",
                }}
                value={searchField}
                onChange={(event) => setSearchField(event.target.value)}
            />
            <Link
                onClick={() => {
                    if (searchField.length > 2) {
                        router.push(`/search/${searchField}`);
                    }
                }}
                sx={{ color: "white", p: 0 }}
            >
                <SearchIcon sx={{ height: "2rem", width: "2rem" }} />
            </Link>
        </Box>
    );
};

export default NavSearch;
