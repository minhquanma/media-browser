import * as dotenv from "dotenv";
dotenv.config();

// Config ffmpeg
import ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
ffmpeg.setFfprobePath(process.env.FFPROBE_PATH);

import { SCREENSHOT_PATH, SCREENSHOT_DIR } from "commons/const.js";
import { applyPassportStrategy } from "services/auth-service.js";

import passport from "passport";
import express from "express";
import cors from "cors";

import {
  getFileListApi,
  getVideoPreviewApi,
} from "./controllers/file-controller.js";

import {
  loginApi,
  loginValidation,
  refreshTokenApi,
} from "./controllers/auth-controller.js";

const app = express();

applyPassportStrategy(passport);
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Add static folder
app.use(SCREENSHOT_PATH, express.static(SCREENSHOT_DIR));
app.use(passport.initialize());

app.get(
  "/fileList",
  passport.authenticate("jwt", { session: false }),
  getFileListApi(app)
);
app.post("/videoPreview", getVideoPreviewApi);
app.post("/login", loginValidation, loginApi);
app.post("/refreshToken", refreshTokenApi);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port: ${process.env.PORT}`)
);
