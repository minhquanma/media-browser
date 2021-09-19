import { useState } from "react";
import { SORT_OPTIONS, SORTS } from "constants/options";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

function Header({ onSortChange, onSearch }) {
  const [sortBy, setSortBy] = useState(SORTS.DATE_ASC);
  const [searchKey, setSearchKey] = useState("");
  function handleSortChange(e) {
    setSortBy(e.target.value);
    onSortChange(e.target.value);
  }

  function handleSearchChange(e) {
    setSearchKey(e.target.value);
  }

  function handleSearchKeyPress(e) {
    if (e.key === "Enter") {
      onSearch(searchKey);
    }
  }

  return (
    <Box
      sx={{
        padding: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        label="Enter your search key here"
        variant="outlined"
        size="small"
        value={searchKey}
        onChange={handleSearchChange}
        onKeyPress={handleSearchKeyPress}
      />
      <span className="spacer"></span>
      <TextField
        id="outlined-select-currency-native"
        select
        label="Sort by"
        value={sortBy}
        onChange={handleSortChange}
        variant="outlined"
        size="small"
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default Header;
