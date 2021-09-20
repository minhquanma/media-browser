import {
  STATIC_PATH,
  FILE_DIR,
  SCREENSHOT_PATH,
  SCREENSHOT_DIR,
} from "./commons/const.js";

import {
  getFileListApi,
  getVideoPreviewApi,
} from "./controllers/file-controller.js";

import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Add static folder
app.use(STATIC_PATH, express.static(FILE_DIR));
app.use(SCREENSHOT_PATH, express.static(SCREENSHOT_DIR));

app.get("/fileList", getFileListApi(app));
app.post("/videoPreview", getVideoPreviewApi);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port: ${process.env.PORT}`)
);
