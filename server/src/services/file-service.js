import fs from "fs";
import path from "path";
import md5 from "md5";

export const getFileListByRootPaths = (
  requestedUrl,
  rootPaths,
  excludedExtension
) => {
  const items = rootPaths.map((rootPath) => {
    try {
      const stats = fs.statSync(rootPath.path);

      // Generate path url using md5
      const rootUrl = requestedUrl + "/" + rootPath.id;

      // Root item
      return {
        isDirectory: true,
        isRoot: true,
        status: rootPath.status,
        name: rootPath.name,
        path: rootPath.path,
        modifiedDateTime: stats.mtime,
        url: null,
        children: getFileList(rootUrl, rootPath.path, excludedExtension),
      };
    } catch (statSyncErr) {
      return {
        isDirectory: true,
        isRoot: true,
        status: rootPath.status,
        name: rootPath.name,
        path: rootPath.path,
        modifiedDateTime: null,
        url: null,
        children: [],
      };
    }
  });

  return items;
};

export const getFileList = (url, inputPath, excludedExtension) => {
  try {
    const files = fs.readdirSync(inputPath);

    const fileList = files.flatMap((fileName) => {
      const filePath = path.join(inputPath, fileName);

      // Getting information for a dir
      try {
        const stats = fs.statSync(filePath);

        // Excluding filter
        if (
          excludedExtension &&
          excludedExtension.includes(fileName.split(".").pop())
        ) {
          return [];
        }

        // If this path is a directory => drill down folder by calling itself recursively
        const children = stats.isDirectory()
          ? getFileList(url + "/" + fileName, filePath, excludedExtension)
          : [];

        return [
          {
            isDirectory: stats.isDirectory(),
            children: children,
            url: `${url}/${fileName}`,
            path: filePath,
            name: fileName,
            size: stats.size,
            modifiedDateTime: stats.mtime,
          },
        ];
      } catch (statSyncErr) {
        return [];
      }
    });

    return fileList;
  } catch (readDirError) {
    return [];
  }
};

export const getFileListByPaths = ({
  url,
  rootId,
  rootPaths,
  paths,
  excludedExtension,
}) => {
  try {
    // Get root path from root id
    const rootPath = rootPaths.find((path) => path.id === rootId);

    if (!rootPath) {
      return [];
    }

    const inputPath = `${rootPath.path}\\${paths.join("\\")}`;

    const files = fs.readdirSync(inputPath);

    const fileList = files.flatMap((fileName) => {
      const filePath = path.join(inputPath, fileName);

      // Getting information for a dir
      try {
        const stats = fs.statSync(filePath);

        // Excluding filter
        if (
          excludedExtension &&
          excludedExtension.includes(fileName.split(".").pop())
        ) {
          return [];
        }

        return [
          {
            isDirectory: stats.isDirectory(),
            url: `${url}/${rootId}/${paths.join("/")}/${fileName}`,
            path: filePath,
            name: fileName,
            size: stats.size,
            modifiedDateTime: stats.mtime,
          },
        ];
      } catch (statSyncErr) {
        return [];
      }
    });

    return fileList;
  } catch (readDirError) {
    return [];
  }
};

export const getRootPathList = (requestedUrl, rootPaths) => {
  const items = rootPaths.map((rootPath) => {
    try {
      // Read all files in path
      const stats = fs.statSync(rootPath.path);

      // Root item
      return {
        isDirectory: true,
        isRoot: true,
        status: rootPath.status,
        name: rootPath.name,
        path: rootPath.path,
        modifiedDateTime: stats.mtime,
        url: `${requestedUrl}/${rootPath.id}`,
      };
    } catch (statSyncErr) {
      return {
        isDirectory: true,
        isRoot: true,
        status: rootPath.status,
        name: "(directory not found) " + rootPath.name,
        path: "",
        modifiedDateTime: null,
        url: null,
      };
    }
  });

  return items;
};
