import { STATIC_PATH, FILE_DIR, SCREENSHOT_PATH } from "../commons/const.js";
import { getFileList } from "../services/file-service.js";
import { createScreenshots } from "../services/video-service.js";

export function getFileListApi(req, res) {
  const url = `${req.protocol}://${req.hostname}:${process.env.PORT}${STATIC_PATH}`;

  // TODO: hard-coded temporary filter
  const filteredFileList = getFileList(url, FILE_DIR).filter(
    (file) => file.name.split(".").pop() !== "parts"
  );

  res.send(filteredFileList);
}

export async function getVideoPreviewApi(req, res) {
  if (!req.body) {
    res.send(400);
  }

  const { fileName, inputPath } = req.body;

  const url = `${req.protocol}://${req.hostname}:${process.env.PORT}${SCREENSHOT_PATH}`;

  const results = await createScreenshots({
    fileName,
    inputPath,
    url,
  });

  res.status(200).send(results);
}
