import {
  STATIC_PATH,
  FILE_DIR,
  SCREENSHOT_PATH,
  SCREENSHOT_DIR,
} from "./commons/const.js";
import express from "express";
import cors from "cors";

import { getFileList } from "./files.js";
import { createScreenshots } from "./video.js";

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(STATIC_PATH, express.static(FILE_DIR));
app.use(SCREENSHOT_PATH, express.static(SCREENSHOT_DIR));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/fileList", (req, res) => {
  const url = `${req.protocol}://${req.hostname}:${PORT}${STATIC_PATH}`;

  // TODO: hard-coded temporary filter
  const filteredFileList = getFileList(url, FILE_DIR).filter(
    (file) => file.name.split(".").pop() !== "parts"
  );

  res.send(filteredFileList);
});

app.post("/videoPreview", async (req, res) => {
  if (!req.body) {
    res.send(400);
  }

  const { fileName, inputPath } = req.body;

  const url = `${req.protocol}://${req.hostname}:${PORT}${SCREENSHOT_PATH}`;

  const results = await createScreenshots({
    fileName,
    inputPath,
    url,
    shots: 12,
  });

  console.log(results);

  res.status(200).send(results);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
