import "./App.css";
import React from "react";
import FileList from "components/FileList/FileList";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container maxWidth="sm">
      <FileList />
    </Container>
  );
}

export default App;
