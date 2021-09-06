import "./App.css";
import React from "react";
import FileList from "components/FileList/FileList";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container maxWidth="md">
      <FileList />
    </Container>
  );
}

export default App;
