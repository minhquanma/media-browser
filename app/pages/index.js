import { getFileList } from "api/file.api";
import Container from "@mui/material/Container";
import FileList from "components/FileList/FileList";

import { SORTS } from "constants/options";

export async function getServerSideProps(context) {
  const { search, sortBy } = context.query;

  const files = await getFileList();

  const filteredFiles = searchAllFiles(files, search);
  const sortedFiles = sortAllFiles(filteredFiles, sortBy);

  return {
    props: {
      data: sortedFiles,
      sortByQuery: sortBy ?? "",
      searchQuery: search ?? "",
    }, // will be passed to the page component as props
  };
}

function searchAllFiles(files, searchKey) {
  if (!searchKey) {
    return files;
  }

  let searchResult = [];

  searchResult = files.filter((file) => {
    return file.name.toLowerCase().includes(searchKey.toLowerCase());
  });

  files.forEach((file) => {
    searchResult.push(...searchAllFiles(file.children, searchKey));
  });

  return searchResult;
}

function sortAllFiles(files, sortBy) {
  const sortedFiles = files;

  switch (sortBy) {
    case SORTS.ALPHABET:
      sortedFiles.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      break;
    case SORTS.DATE_ASC:
      sortedFiles.sort(
        (a, b) => new Date(b.modifiedDateTime) - new Date(a.modifiedDateTime)
      );
      break;
    case SORTS.DATE_DESC:
      sortedFiles.sort(
        (a, b) => new Date(a.modifiedDateTime) - new Date(b.modifiedDateTime)
      );
      break;
    default:
      // newest first
      sortedFiles.sort(
        (a, b) => new Date(b.modifiedDateTime) - new Date(a.modifiedDateTime)
      );
      break;
  }

  sortedFiles.forEach((file) => {
    if (file.children) {
      sortAllFiles(file.children, sortBy);
    }
  });

  return sortedFiles;
}

export default function Home({ data }) {
  return (
    <Container maxWidth="md">
      <FileList files={data} />
    </Container>
  );
}
