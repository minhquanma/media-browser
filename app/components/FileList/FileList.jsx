import { useState, useRef, useEffect } from "react";

import List from "@mui/material/List";
import FileListItem from "components/FileListItem/FileListItem";
import VideoDialog from "components/VideoDialog/VideoDialog";

export default function FileList({ files }) {
  const [dialogData, setDialogData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleOpenDialog = (fileItem) => {
    setDialogData(fileItem);
  };

  const handleDialogClose = () => {
    setDialogData(null);
  };

  const renderFileItems = () => {
    return files.map((fileItem) => {
      return (
        <FileListItem
          key={fileItem.path}
          onOpenDialog={handleOpenDialog}
          fileItem={fileItem}
        />
      );
    });
  };

  return (
    <>
      <VideoDialog
        open={!!dialogData}
        fileItem={dialogData}
        onClose={handleDialogClose}
      />
      <List component="nav" aria-labelledby="nested-list">
        {renderFileItems()}
      </List>
    </>
  );
}
