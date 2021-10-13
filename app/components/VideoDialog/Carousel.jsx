import { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import placeHolderImg from "assets/thumb_placeholder.png";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export function Carousel({ images = [{ url: placeHolderImg }] }) {
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
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "inherit",
          height: "inherit",
        }}
      >
        <Image src={imageUrl} priority={true} width="1024" height="600" />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fffffff0",
            marginBottom: 2,
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            color="primary"
            aria-label="previous"
            onClick={handleBackClick}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <span>
            {selectedImageIndex + 1}/{images.length}
          </span>
          <IconButton
            color="primary"
            aria-label="next"
            onClick={handleRightClick}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
