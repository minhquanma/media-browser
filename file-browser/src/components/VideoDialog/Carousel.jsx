import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import placeHolderImg from "assets/thumb_placeholder.png";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles({
  container: {
    height: 180,
    width: 320,
    position: "relative",
    display: "grid",
  },
  thumb: {
    width: "inherit",
    height: "inherit",
    gridArea: "1 / -1",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  navigator: {
    gridArea: "1 / -1",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },
  navigatorBox: {
    backgroundColor: "#fffffff0",
    marginBottom: 6,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
  },
  thumbNo: {},
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
      <div className={classes.thumb}>
        <img className={classes.image} src={imageUrl} />
      </div>
      <div className={classes.navigator}>
        <div className={classes.navigatorBox}>
          <IconButton
            color="primary"
            aria-label="previous"
            className={classes.leftButton}
            onClick={handleBackClick}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <span className={classes.thumbNo}>
            {selectedImageIndex + 1}/{images.length}
          </span>
          <IconButton
            color="primary"
            aria-label="next"
            className={classes.rightButton}
            onClick={handleRightClick}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
