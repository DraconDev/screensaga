import { Autocomplete, TextField, MenuItem } from "@mui/material";
import React from "react";

const SearchDropdown = () => {
	const [value, setValue] = React.useState("");

	return (
		<Autocomplete
			freeSolo
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue ?? "");
			}}
			options={["testing"]}
			renderInput={(params) => (
				<TextField {...params} label="Search" variant="outlined" />
			)}
			renderOption={(option) => <MenuItem>{}</MenuItem>}
		/>
	);
};

export default SearchDropdown;
