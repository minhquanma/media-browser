import { useState } from "react";
import { getRootPathList } from "api/file.api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppLayout from "components/AppLayout/AppLayout";
import { getSession } from "next-auth/client";

import RootListItem from "components/RootList/RootListItem";
import VideoDialog from "components/VideoDialog/VideoDialog";
import { isEmpty } from "lodash";
import { sortAllFiles } from "utils/file";
import { Box } from "@mui/material";

export async function getServerSideProps(context) {
  const { search, sortBy } = context.query;

  try {
    const { accessToken } = await getSession(context);

    // Search for file if search query is passed
    const isSearch = !!search;
    const files = await getRootPathList({ accessToken, search });
    const sortedFiles = sortAllFiles(files, sortBy);

    return {
      props: {
        isSearch: isSearch,
        data: sortedFiles,
      }, // will be passed to the page component as props
    };
  } catch (apiErr) {
    return {
      props: {
        data: [],
      },
    };
  }
}

function Home({ data, isSearch }) {
  const [dialogData, setDialogData] = useState(null);

  const handleOpenDialog = (fileItem) => {
    setDialogData(fileItem);
  };

  const handleDialogClose = () => {
    setDialogData(null);
  };
  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Typography variant="h4" component="h4" sx={{ mb: 3 }}>
          {isSearch ? "Search results" : "Root directories"}
        </Typography>
        <Typography variant="h5">
          {isEmpty(data) && "No files found"}
        </Typography>
        <Box>
          {data.map((item) => (
            <RootListItem
              key={item.pathOnDisk}
              item={item}
              onOpenDialog={handleOpenDialog}
            ></RootListItem>
          ))}
        </Box>
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
