import { STATIC_PATH, FILE_DIR, SCREENSHOT_PATH } from "../commons/const.js";
import { getFileListByPath } from "../services/file-service.js";
import { readConfig } from "../services/config-service.js";

import { createScreenshots } from "../services/video-service.js";

export function makeGetFileListApi({ getFileListByPath, readConfig }) {
  return function getFileListApi(req, res) {
    const url = `${req.protocol}://${req.hostname}:${process.env.PORT}${STATIC_PATH}`;
    const { paths, excludedExtension } = readConfig();

    const items = getFileListByPath(url, paths, excludedExtension);

    res.send(items);
  };
}

export function makeGetVideoPreviewApi({ createScreenshots }) {
  return async function getVideoPreviewApi(req, res) {
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
  };
}

export const getFileListApi = makeGetFileListApi({
  getFileListByPath,
  readConfig,
});
export const getVideoPreviewApi = makeGetVideoPreviewApi({ createScreenshots });
