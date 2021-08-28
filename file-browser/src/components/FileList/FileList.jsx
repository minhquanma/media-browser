import { useEffect, useState, useMemo, useRef } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header";
import List from "@material-ui/core/List";

import FileListItem from "components/FileListItem/FileListItem";
import VideoDialog from "components/VideoDialog/VideoDialog";
import { getFileList } from "api/file.api";
import { SORTS } from "constants/options";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function FileList() {
  const classes = useStyles();
  const [dialogData, setDialogData] = useState(null);
  const [sortBy, setSortBy] = useState(SORTS.DATE_ASC);
  const [files, setFiles] = useState([]);

  const originalFiles = useRef([]);

  useEffect(() => {
    async function runAsync() {
      const data = await getFileList();
      originalFiles.current = data;
      setFiles(data);
    }

    runAsync();
  }, []);

  const sortedFiles = useMemo(() => {
    switch (sortBy) {
      case SORTS.DATE_ASC:
        return [...files].sort(
          (a, b) => new Date(b.modifiedDateTime) - new Date(a.modifiedDateTime)
        );
      case SORTS.DATE_DESC:
        return [...files].sort(
          (a, b) => new Date(a.modifiedDateTime) - new Date(b.modifiedDateTime)
        );
      default:
        return files;
    }
  }, [files, sortBy]);

  const handleOpenDialog = (fileItem) => {
    setDialogData(fileItem);
  };

  const handleDialogClose = () => {
    setDialogData(null);
  };

  const handleSortChange = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleSearch = (searchKey) => {
    if (!searchKey) {
      setFiles(originalFiles.current);
    } else {
      setFiles(
        originalFiles.current.filter((file) =>
          file.name.toLowerCase().includes(searchKey.toLowerCase())
        )
      );
    }
  };

  const renderFileItems = () => {
    return sortedFiles.map((fileItem) => {
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
        subheader={
          <Header
            onSortChange={handleSortChange}
            onSearch={handleSearch}
          ></Header>
        }
        className={classes.root}
      >
        {renderFileItems()}
      </List>
    </>
  );
}
