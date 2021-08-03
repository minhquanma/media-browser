import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ClipLoader from "react-spinners/ClipLoader";

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

export interface VideoDialogProps {
  open: boolean;
  fileItem: any;
  onClose: () => void;
}

function VideoDialog(props: VideoDialogProps) {
  const classes = useStyles();
  const { onClose, fileItem, open } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<any>();

  useEffect(() => {
    async function runAsync() {
      setIsLoading(true);
      const data = await getVideoPreview({
        inputPath: fileItem.path,
        fileName: fileItem.name,
      });
      setIsLoading(false);

      setImages(data);
    }

    open && runAsync();
  }, [open]);

  const handleOpenClick = () => {
    window.open(fileItem.url);
    onClose();
  };

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
        {isLoading ? (
          <ClipLoader color={"navy"} />
        ) : (
          <Carousel images={images} />
        )}
      </div>
      <DialogActions>
        <Button onClick={handleOpenClick} color="primary" autoFocus>
          Open
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default VideoDialog;
