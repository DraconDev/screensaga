import SearchIcon from "@mui/icons-material/Search";
import { Box, Input } from "@mui/material";
import router from "next/router";

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
                height: "2.5rem",
                m: 1,

                alignItems: "start",
                width: "100%",
                flex: { sx: 1, sm: 1 },
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
                    p: 1,
                }}
                value={searchField}
                onChange={(event) => setSearchField(event.target.value)}
            />
            <button
                onClick={() => {
                    if (searchField.length > 2) {
                        router.push(`/search/${searchField}`);
                    }
                }}
                // add hover pointer
                style={{
                    backgroundColor: "primary.dark",
                    border: "none",
                    cursor: "pointer",
                    height: "100%",
                    width: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <SearchIcon sx={{ height: "2rem", width: "2rem" }} />
            </button>
        </Box>
    );
};

export default NavSearch;
