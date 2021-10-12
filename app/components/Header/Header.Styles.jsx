import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
    },
    margin: {
      margin: theme.spacing(1),
    },
    sortInput: {
      minWidth: 50,
    },
    spacer: {
      padding: theme.spacing(1),
    },
  })
);

export default useStyles;
