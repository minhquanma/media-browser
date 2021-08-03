import { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header";
import List from "@material-ui/core/List";

import FileListItem from "components/FileListItem/FileListItem";
import VideoDialog from "components/VideoDialog/VideoDialog";
import { getFileList } from "api/file.api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function FileList() {
  const classes = useStyles();
  const [dialogData, setDialogData] = useState<any>(null);

  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    async function runAsync() {
      const data = await getFileList();
      setFiles(data);
    }

    runAsync();
  }, []);

  const handleOpenDialog = (fileItem: any) => {
    setDialogData(fileItem);
  };

  const handleDialogClose = () => {
    setDialogData(null);
  };

  const renderFileItems = () => {
    return files.map((fileItem: any) => {
      return (
        <FileListItem onOpenDialog={handleOpenDialog} fileItem={fileItem} />
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
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={<Header></Header>}
        className={classes.root}
      >
        {renderFileItems()}
      </List>
    </>
  );
}
