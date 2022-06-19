import { getFileList, getFileListByPath } from "api/file.api";
import { useState } from "react";
import Container from "@mui/material/Container";
import AppLayout from "components/AppLayout/AppLayout";
import { getSession } from "next-auth/client";
import { SORTS } from "constants/options";
import RootList from "components/RootList/RootList";
import Typography from "@mui/material/Typography";
import RootListItem from "components/RootList/RootListItem";
import VideoDialog from "components/VideoDialog/VideoDialog";
import { sortAllFiles } from "utils/file";
import { isEmpty } from "lodash";
import { IconButton, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/router";
// export async function getServerSideProps(context) {
//   const { paths, search, sortBy } = context.query;

//   console.log(new Date().toUTCString(), { paths });

//   try {
//     const { accessToken } = await getSession(context);

//     const files = await getFileList({ accessToken });

//     const filteredFiles = searchAllFiles(files, search);
//     const sortedFiles = sortAllFiles(filteredFiles, sortBy);

//     return {
//       props: {
//         data: sortedFiles,
//         sortByQuery: sortBy ?? "",
//         searchQuery: search ?? "",
//       }, // will be passed to the page component as props
//     };
//   } catch (apiErr) {
//     return {
//       props: {
//         data: [],
//         sortByQuery: "",
//         searchQuery: "",
//       },
//     };
//   }
// }

// function searchAllFiles(files, searchKey) {
//   if (!searchKey) {
//     return files;
//   }

//   let searchResult = [];

//   searchResult = files.filter((file) => {
//     return file.name.toLowerCase().includes(searchKey.toLowerCase());
//   });

//   files.forEach((file) => {
//     searchResult.push(...searchAllFiles(file.children, searchKey));
//   });

//   return searchResult;
// }

// function sortAllFiles(files, sortBy) {
//   const sortedFiles = files;

//   switch (sortBy) {
//     case SORTS.ALPHABET:
//       sortedFiles.sort((a, b) => {
//         if (a.name < b.name) {
//           return -1;
//         }
//         if (a.name > b.name) {
//           return 1;
//         }
//         return 0;
//       });
//       break;
//     case SORTS.DATE_ASC:
//       sortedFiles.sort(
//         (a, b) =>
//           new Date(b.modifiedDateTime).getTime() -
//           new Date(a.modifiedDateTime).getTime()
//       );
//       break;
//     case SORTS.DATE_DESC:
//       sortedFiles.sort(
//         (a, b) =>
//           new Date(a.modifiedDateTime).getTime() -
//           new Date(b.modifiedDateTime).getTime()
//       );
//       break;
//     default:
//       // newest first
//       sortedFiles.sort(
//         (a, b) =>
//           new Date(b.modifiedDateTime).getTime() -
//           new Date(a.modifiedDateTime).getTime()
//       );
//       break;
//   }

//   sortedFiles.forEach((file) => {
//     if (file.children) {
//       sortAllFiles(file.children, sortBy);
//     }
//   });

//   return sortedFiles;
// }

// function Home({ data }) {
//   return (
//     <AppLayout>
//       <Container maxWidth="md">
//         <FileList files={data} />
//       </Container>
//     </AppLayout>
//   );
// }

export async function getServerSideProps(context) {
  const { paths, search, sortBy } = context.query;

  try {
    const { accessToken } = await getSession(context);

    const [rootId, ...restPaths] = paths;

    // Search for file if search query is passed
    const isSearch = !!search;

    const { name, data } = await getFileListByPath({
      accessToken,
      rootId: rootId,
      paths: restPaths.join(","),
      search,
    });

    const sortedFiles = sortAllFiles(data, sortBy);

    return {
      props: { isSearch: isSearch, name: name, data: sortedFiles },
    };
  } catch (apiErr) {
    return {
      props: { name: "Error", data: [] },
    };
  }
}

function Home({ name, data, isSearch }) {
  const router = useRouter();
  const [dialogData, setDialogData] = useState(null);

  const handleOpenDialog = (fileItem) => {
    setDialogData(fileItem);
  };

  const handleDialogClose = () => {
    setDialogData(null);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
          <IconButton aria-label="delete" onClick={handleBack}>
            <ArrowBackIosNewIcon color="primary" />
          </IconButton>
          <Typography variant="h5" component="h5">
            {isSearch ? `Search results in ${name}` : name}
          </Typography>
        </Box>
        <Typography variant="h6" component="h5">
          {isEmpty(data) && "No files found"}
        </Typography>
        <RootList>
          {data.map((item) => (
            <RootListItem
              key={item.pathOnDisk}
              item={item}
              onOpenDialog={handleOpenDialog}
            ></RootListItem>
          ))}
        </RootList>
      </Container>
      <VideoDialog
        open={!!dialogData}
        fileItem={dialogData}
        onClose={handleDialogClose}
      />
    </AppLayout>
  );
}

Home.auth = true;

export default Home;
