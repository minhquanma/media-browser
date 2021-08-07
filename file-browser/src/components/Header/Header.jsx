import { useState } from "react";
import { FILTER_OPTIONS, FILTERS } from "constants/options";
import useStyles from "./Header.Styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

function Header({}) {
  const classes = useStyles();
  const [filter, setFilter] = useState(FILTERS.DATE_ASC);

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.margin}>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Sort by"
          value={filter}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        >
          {FILTER_OPTIONS.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <span className="spacer"></span>
      <FormControl className={classes.margin}>
        <TextField
          label="Enter your search key here"
          variant="outlined"
          size="small"
        />
      </FormControl>
    </div>
  );
};

export default Header;
