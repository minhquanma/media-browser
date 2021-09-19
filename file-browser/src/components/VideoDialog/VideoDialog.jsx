import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Skeleton from "@mui/material/Skeleton";
import { Carousel } from "./Carousel";
import { getVideoPreview } from "api/video.api";

function VideoDialog({ onClose, fileItem, open }) {
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
      <Box
        sx={{
          height: 180,
          width: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <Skeleton variant="rectangular" height="100%" width="100%" />
        ) : (
          <Carousel images={images} />
        )}
      </Box>
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
