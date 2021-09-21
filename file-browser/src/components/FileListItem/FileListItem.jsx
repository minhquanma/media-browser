import { useEffect, useState, useMemo, memo } from "react";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { format } from "date-fns";
import { formatFileSize } from "utils/format";

const FileListItem = ({ onOpenDialog, fileItem, padding = 0 }) => {
  const [isExpand, setExpand] = useState(false);

  useEffect(() => {
    setExpand(fileItem.status === "expanded");
  }, []);

  const handleClick = () => {
    setExpand((value) => !value);

    if (!fileItem.isDirectory) {
      onOpenDialog?.(fileItem);
    }
  };

  const renderChildren = () => {
    if (fileItem.children.length) {
      return fileItem.children.map((fileItemChild) => {
        return (
          <FileListItem
            onOpenDialog={onOpenDialog}
            fileItem={fileItemChild}
            padding={2 + padding}
          />
        );
      });
    }
  };

  const sizeInMB = useMemo(
    () => (fileItem.isDirectory ? `` : formatFileSize(fileItem.size)),
    [fileItem.size]
  );

  const lastModified = `Last update: ${format(
    new Date(fileItem.modifiedDateTime),
    " hh:mm - MM/dd/yy"
  )}`;

  const style = useMemo(
    () => ({
      pl: 1 + padding,
    }),
    [padding]
  );

  const ExpandIcon = isExpand ? ExpandLess : ExpandMore;

  return (
    <>
      <ListItemButton button onClick={handleClick} sx={style}>
        <ListItemAvatar>
          <Avatar>
            {fileItem.isDirectory ? (
              <FolderOpenIcon />
            ) : (
              <InsertDriveFileIcon />
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={fileItem.name}
          secondary={
            <>
              {lastModified} {sizeInMB}
            </>
          }
        />
        {fileItem.isDirectory && <ExpandIcon />}
      </ListItemButton>
      <Collapse in={isExpand} timeout="auto" unmountOnExit>
        {renderChildren()}
      </Collapse>
    </>
  );
};

export default memo(FileListItem);
