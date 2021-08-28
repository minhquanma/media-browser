import { useState } from "react";
import { SORT_OPTIONS, SORTS } from "constants/options";
import useStyles from "./Header.Styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

function Header({ onSortChange, onSearch }) {
  const classes = useStyles();
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
    <div className={classes.root}>
      <FormControl className={classes.margin}>
        <TextField
          label="Enter your search key here"
          variant="outlined"
          size="small"
          value={searchKey}
          onChange={handleSearchChange}
          onKeyPress={handleSearchKeyPress}
        />
      </FormControl>
      <span className={classes.spacer}></span>
      <FormControl className={classes.margin}>
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
      </FormControl>
    </div>
  );
}

export default Header;
