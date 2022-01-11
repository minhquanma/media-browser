import { STATIC_PATH, SCREENSHOT_PATH } from "commons/const.js";
import {
  getFileListByRootPaths,
  getFileListByPaths,
  getRootPathList,
  searchAllRootFiles,
  searchFileListByPaths,
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

    const items = getFileListByRootPaths({
      requestedUrl,
      rootPaths,
      excludedExtension,
    });

    res.send(items);
  };
}

export function makeGetRootPathListApi({ getRootPathList, readConfig }) {
  return (app) => (req, res) => {
    const { rootPaths, excludedExtension } = readConfig();
    const { search } = req.query;

    // Generate & add path to express static
    rootPaths.forEach((rootPath) => {
      const dynamicPath = `${STATIC_PATH}/${rootPath.id}`;

      app.use(dynamicPath, express.static(rootPath.path));
    });

    const requestedUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}${STATIC_PATH}`;

    const items = search
      ? searchAllRootFiles({
          url: requestedUrl,
          rootPaths,
          excludedExtension,
          search,
        })
      : getRootPathList(requestedUrl, rootPaths);

    res.send(items);
  };
}

export function makeGetFileListByPathApi({ getFileListByPaths, readConfig }) {
  return (app) => (req, res) => {
    const rootId = req.params.id;
    const paths = req.query.paths?.split(",") || [];
    const search = req.query.search;

    const { rootPaths, excludedExtension } = readConfig();

    // Generate & add path to express static
    rootPaths.forEach((rootPath) => {
      const dynamicPath = `${STATIC_PATH}/${rootPath.path}`;

      app.use(dynamicPath, express.static(rootPath.path));
    });

    const url = `${req.protocol}://${req.hostname}:${process.env.PORT}${STATIC_PATH}`;

    // Get root path from root id
    const rootPath = rootPaths.find((path) => path.id === rootId);

    if (!rootPath) {
      res.send({
        name: "",
        data: [],
      });
      return;
    }

    const items = search
      ? searchFileListByPaths({
          url,
          rootId: rootPath.id,
          rootPath: rootPath.path,
          paths,
          excludedExtension,
          search,
        })
      : getFileListByPaths({
          url,
          rootId: rootId,
          rootPath: rootPath.path,
          paths,
          excludedExtension,
        });

    res.send({
      name: rootPath.name,
      data: items,
    });
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
