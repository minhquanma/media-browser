import { STATIC_PATH, SCREENSHOT_PATH } from "commons/const.js";
import {
  getFileListByRootPaths,
  getFileListByPaths,
  getRootPathList,
} from "services/file-service.js";
import { readConfig } from "services/config-service.js";
import { createScreenshots } from "services/video-service.js";
import express from "express";
import md5 from "md5";

export function makeGetFileListApi({ getFileListByRootPaths, readConfig }) {
  return (app) => (req, res) => {
    const { rootPaths, excludedExtension } = readConfig();

    // Generate & add path to express static
    rootPaths.forEach((rootPath) => {
      const dynamicPath = `${STATIC_PATH}/${rootPath.id}`;

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

export function makeGetRootPathListApi({ getRootPathList, readConfig }) {
  return (app) => (req, res) => {
    const { rootPaths } = readConfig();

    // Generate & add path to express static
    rootPaths.forEach((rootPath) => {
      const dynamicPath = `${STATIC_PATH}/${rootPath.id}`;

      app.use(dynamicPath, express.static(rootPath.path));
    });

    const requestedUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}${STATIC_PATH}`;

    const items = getRootPathList(requestedUrl, rootPaths);

    res.send(items);
  };
}

export function makeGetFileListByPathApi({ getFileListByPaths, readConfig }) {
  return (app) => (req, res) => {
    const { rootPaths, excludedExtension } = readConfig();
    const { rootId, paths } = req.body;

    // Generate & add path to express static
    rootPaths.forEach((rootPath) => {
      const dynamicPath = `${STATIC_PATH}/${rootPath.path}`;

      app.use(dynamicPath, express.static(rootPath.path));
    });

    const requestedUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}${STATIC_PATH}`;

    const items = getFileListByPaths({
      url: requestedUrl,
      rootId: rootId,
      rootPaths: rootPaths,
      paths: paths,
      excludedExtension,
    });

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
export const getRootPathListApi = makeGetRootPathListApi({
  getRootPathList,
  readConfig,
});
export const getFileListByPathApi = makeGetFileListByPathApi({
  getFileListByPaths,
  readConfig,
});
export const getVideoPreviewApi = makeGetVideoPreviewApi({ createScreenshots });
