import { STATIC_PATH, SCREENSHOT_PATH } from "../commons/const.js";
import { getFileListByRootPaths } from "../services/file-service.js";
import { readConfig } from "../services/config-service.js";
import { createScreenshots } from "../services/video-service.js";
import express from "express";
import md5 from "md5";

export function makeGetFileListApi({ getFileListByRootPaths, readConfig }) {
  return (app) => (req, res) => {
    const { rootPaths, excludedExtension } = readConfig();

    // Generate & add path to express static
    rootPaths.forEach((rootPath) => {
      const dynamicPath = `${STATIC_PATH}/${md5(rootPath.path)}`;

      app.use(dynamicPath, express.static(rootPath.path));
    });

    const requestedUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}${STATIC_PATH}`;

    const items = getFileListByRootPaths(
      requestedUrl,
      rootPaths,
      excludedExtension
    );

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
  getFileListByRootPaths,
  readConfig,
});
export const getVideoPreviewApi = makeGetVideoPreviewApi({ createScreenshots });
