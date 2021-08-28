import { useEffect, useState, useMemo, memo } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import { ListItemSecondaryAction } from "@material-ui/core";

import { format } from "date-fns";

type FileListItemProps = {
  onOpenDialog?: Function | undefined;
  fileItem: any;
  padding?: number | undefined;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const FileListItem = ({
  onOpenDialog,
  fileItem,
  padding = 0,
}: FileListItemProps) => {
  const classes = useStyles();
  const [isExpand, setExpand] = useState(false);

  const handleClick = () => {
    setExpand((value) => !value);

    if (!fileItem.isDirectory) {
      onOpenDialog?.(fileItem);
    }
  };

  const renderChildren = () => {
    if (fileItem.children.length) {
      return fileItem.children.map((fileItemChild: any) => {
        return (
          <FileListItem
            onOpenDialog={onOpenDialog}
            fileItem={fileItemChild}
            padding={8 + padding}
          />
        );
      });
    }
  };

  const sizeInMB = useMemo(
    () =>
      fileItem.isDirectory
        ? ``
        : `${Math.round(fileItem.size / 1024 / 1024).toFixed(2)} MB`,
    [fileItem.size]
  );

  const lastModified = `Last update: ${format(
    new Date(fileItem.modifiedDateTime),
    " hh:mm - MM/dd/yy"
  )}`;

  const style = useMemo(
    () => ({
      paddingLeft: 10 + padding,
    }),
    [padding]
  );

  const ExpandIcon = isExpand ? ExpandLess : ExpandMore;

  return (
    <>
      <ListItem button onClick={handleClick} style={style}>
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
      </ListItem>
      <Collapse in={isExpand} timeout="auto" unmountOnExit>
        {renderChildren()}
      </Collapse>
    </>
  );
};

export default memo(FileListItem);
