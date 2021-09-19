import { useEffect, useState, useMemo, useRef } from "react";
import Header from "components/Header/Header";
import List from "@mui/material/List";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FileListItem from "components/FileListItem/FileListItem";
import VideoDialog from "components/VideoDialog/VideoDialog";
import { getFileList } from "api/file.api";
import { SORTS } from "constants/options";

export default function FileList() {
  const [dialogData, setDialogData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(SORTS.DATE_ASC);
  const [files, setFiles] = useState([]);

  const originalFiles = useRef([]);

  useEffect(() => {
    async function runAsync() {
      setLoading(true);
      const data = await getFileList();

      // Original files for frontend data filtering
      originalFiles.current = data;

      setFiles(data);
      setLoading(false);
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
      >
        {renderFileItems()}
      </List>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
