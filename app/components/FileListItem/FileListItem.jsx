import { useEffect, useState, useMemo, useRef, memo } from "react";

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
import { useInfiniteScroll } from "utils/hooks";

const ChildrenItems = ({ items, onOpenDialog, padding }) => {
  const endRef = useRef();

  const { list, isFullyLoaded } = useInfiniteScroll({
    inputList: items,
    endRef: endRef,
    count: 10,
  });

  const renderChildren = () => {
    return list.map((fileItemChild) => {
      return (
        <FileListItem
          key={fileItemChild.path}
          onOpenDialog={onOpenDialog}
          fileItem={fileItemChild}
          padding={2 + padding}
        />
      );
    });
  };

  return (
    <div>
      {renderChildren()}
      <div ref={endRef}>
        {!isFullyLoaded && (
          <ListItemButton sx={{ mb: 8 }}>
            <ListItemText primary="Scroll to load more" />
          </ListItemButton>
        )}
      </div>
    </div>
  );
};

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
    return list.map((fileItemChild) => {
      return (
        <FileListItem
          key={fileItemChild.path}
          onOpenDialog={onOpenDialog}
          fileItem={fileItemChild}
          padding={2 + padding}
        />
      );
    });
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
      <ListItemButton onClick={handleClick} sx={style}>
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
      <Collapse in={isExpand} unmountOnExit>
        <ChildrenItems
          items={fileItem.children}
          onOpenDialog={onOpenDialog}
          padding={padding}
        />
      </Collapse>
    </>
  );
};

export default memo(FileListItem);
