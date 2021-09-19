import "./App.css";
import React from "react";
import FileList from "components/FileList/FileList";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@emotion/react";

const theme = {};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <FileList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
