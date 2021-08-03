import useStyles from "./Header.Styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { FILTER_OPTIONS } from "constants/options";

const Header: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl className={classes.margin}>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Sort by"
          value={1}
          onChange={() => {}}
          variant="outlined"
          size="small"
        >
          {FILTER_OPTIONS.map((option) => (
            <MenuItem key={option.id} value={option.name}>
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
