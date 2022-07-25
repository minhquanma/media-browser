import { Box, Typography } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { ListItemButton } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { format } from "date-fns";
import { ITEM_COLOR } from "constants/styles";
import { formatFileSize } from "utils/file";

export default function RootListItem({ item, onOpenDialog = (item) => {} }) {
  let ItemIcon = InsertDriveFileIcon;
  let itemBackground = ITEM_COLOR.FILE.background;
  let itemColor = ITEM_COLOR.FILE.color;
  let itemComponent = "div";
  let itemHref = "";

  if (item.isDirectory) {
    ItemIcon = FolderOpenIcon;
    itemBackground = ITEM_COLOR.FOLDER.background;
    itemColor = ITEM_COLOR.FOLDER.color;
    itemComponent = "a";
    itemHref = item.path;
  }

  const handleListItemClick = () => {
    if (item.isDirectory) return;
    onOpenDialog(item);
  };

  return (
    <ListItemButton
      sx={{
        width: "100%",
        listStyleType: "none",
        padding: "12px",
        border: "2px solid #F0F0F0",
        borderRadius: "10px",
        marginBottom: "12px",
        display: "flex",
        justifyContent: "space-between",
      }}
      component={itemComponent}
      href={itemHref}
      onClick={handleListItemClick}
    >
      {/* icon */}
      <Box
        sx={{
          borderRadius: "15px",
          background: itemBackground,
          padding: "15px",
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: itemColor,
          marginRight: "8px",
        }}
      >
        <ItemIcon />
      </Box>
      {/* text */}
      <Box sx={{ width: "100%" }}>
        <Typography sx={{ fontWeight: "500" }}>{item.name}</Typography>
        <Typography sx={{ color: "#979797", fontSize: 14 }}>
          {`${format(
            new Date(item.modifiedDateTime),
            "hh:mm a - MM/dd/yy"
          )} - ${formatFileSize(item.size)}`}
        </Typography>
      </Box>
      {/* icon */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {item.isDirectory && (
          <ArrowForwardIosOutlinedIcon
            sx={{ fontSize: 16, color: "#c3c3c3" }}
          />
        )}
      </Box>
    </ListItemButton>
  );
}
