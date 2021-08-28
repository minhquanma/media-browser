import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import placeHolderImg from "assets/placeholder.jpg";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles({
  container: {
    height: 180,
    width: 320,
    position: "relative",
  },
  image: {
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  leftButton: {
    position: "absolute",
    bottom: 0,
    left: 100,
  },
  rightButton: {
    position: "absolute",
    bottom: 0,
    right: 100,
  },
});

export function Carousel({ images = [{ url: placeHolderImg }] }) {
  const classes = useStyles();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleBackClick = () => {
    if (selectedImageIndex === 0) {
      setSelectedImageIndex(images.length - 1);
    } else {
      setSelectedImageIndex((value) => value - 1);
    }
  };

  const handleRightClick = () => {
    if (selectedImageIndex === images.length - 1) {
      setSelectedImageIndex(0);
    } else {
      setSelectedImageIndex((value) => value + 1);
    }
  };

  const imageUrl = images[selectedImageIndex]?.url || placeHolderImg;

  return (
    <div className={classes.container}>
      <img className={classes.image} src={imageUrl} />
      <IconButton
        aria-label="delete"
        className={classes.leftButton}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="delete"
        className={classes.rightButton}
        onClick={handleRightClick}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </div>
  );
}
