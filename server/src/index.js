import * as dotenv from "dotenv";
dotenv.config();

import ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
ffmpeg.setFfprobePath(process.env.FFPROBE_PATH);

import { SCREENSHOT_PATH, SCREENSHOT_DIR } from "commons/const.js";

import express from "express";
import cors from "cors";

import {
  getFileListApi,
  getVideoPreviewApi,
} from "./controllers/file-controller.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Add static folder
app.use(SCREENSHOT_PATH, express.static(SCREENSHOT_DIR));

app.get("/fileList", getFileListApi(app));
app.post("/videoPreview", getVideoPreviewApi);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port: ${process.env.PORT}`)
);
