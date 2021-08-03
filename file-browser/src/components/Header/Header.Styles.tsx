import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(1),
    },
    sortInput: {
      minWidth: 50,
    },
  })
);

export default useStyles;
