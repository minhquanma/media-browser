import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import placeHolderImg from "assets/placeholder.jpg";
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
  navigationContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
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
  number: {},
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
      <div className={classes.navigationContainer}>
        <span className={classes.number}>
          {selectedImageIndex + 1}/{images.length}
        </span>
      </div>
      <IconButton
        color="primary"
        aria-label="previous"
        className={classes.leftButton}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>

      <IconButton
        color="primary"
        aria-label="next"
        className={classes.rightButton}
        onClick={handleRightClick}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </div>
  );
}
