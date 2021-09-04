import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Carousel } from "./Carousel";
import { getVideoPreview } from "api/video.api";

const useStyles = makeStyles({
  screenshot: {
    height: 180,
    width: 320,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

function VideoDialog({ onClose, fileItem, open }) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchVideoPreview() {
      if (open) {
        setIsLoading(true);
        setImages([]);

        const data = await getVideoPreview({
          inputPath: fileItem.path,
          fileName: fileItem.name,
        });

        setIsLoading(false);
        setImages(data);
      }
    }

    fetchVideoPreview();
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{fileItem?.name}</DialogTitle>
      <div className={classes.screenshot}>
        {isLoading ? <CircularProgress /> : <Carousel images={images} />}
      </div>
      <DialogActions>
        <Button href={fileItem?.url} color="primary" autoFocus>
          Url
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default VideoDialog;
