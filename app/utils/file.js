import { SORTS } from "constants/options";

export const formatFileSize = (sizeInBytes, decimals = 2) => {
  if (!sizeInBytes) return "Unknown";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));

  return (
    parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  );
};

export const sortAllFiles = (files, sortBy) => {
  const sortedFiles = files;

  switch (sortBy) {
    case SORTS.DATE_ASC:
      sortedFiles.sort(
        (a, b) =>
          new Date(b.modifiedDateTime).getTime() -
          new Date(a.modifiedDateTime).getTime()
      );
      break;
    case SORTS.DATE_DESC:
      sortedFiles.sort(
        (a, b) =>
          new Date(a.modifiedDateTime).getTime() -
          new Date(b.modifiedDateTime).getTime()
      );
      break;
    default:
      // newest first
      sortedFiles.sort((a, b) => a.name > b.name);
      break;
  }

  return sortedFiles;
};
