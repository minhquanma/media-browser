import fs from "fs";
import path from "path";
import md5 from "md5";

export const getFileListByRootPaths = ({
  requestedUrl,
  rootPaths,
  excludedExtension,
}) => {
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

export const createRoutePath = ({ rootId, paths, fileName }) => {
  const joinedQueryPath = paths?.join("/");

  return joinedQueryPath
    ? `${rootId}/${joinedQueryPath}/${fileName}`
    : `${rootId}/${fileName}`;
};

export const getFileListByPaths = ({
  url,
  rootId,
  rootPath,
  paths = [],
  excludedExtension,
}) => {
  const inputPath = `${rootPath}\\${paths.join("\\")}`;

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

        const routePath = createRoutePath({
          rootId,
          paths,
          fileName,
        });

        return [
          {
            isDirectory: stats.isDirectory(),
            url: `${url}/${routePath}`,
            path: `/${routePath}`,
            pathOnDisk: filePath,
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

export const getRootPathList = (requestedUrl, rootPaths = []) => {
  const items = rootPaths.map((rootPath) => {
    try {
      // Read all files in path
      const stats = fs.statSync(rootPath.path);

      // Root item
      return {
        isDirectory: true,
        isRoot: true,
        size: stats.size,
        name: rootPath.name,
        path: rootPath.id,
        pathOnDisk: rootPath.path,
        modifiedDateTime: stats.mtime,
        url: null,
      };
    } catch (statSyncErr) {
      return {
        isDirectory: true,
        isRoot: true,
        size: 0,
        name: "(directory not found) " + rootPath.name,
        path: "",
        pathOnDisk: "",
        modifiedDateTime: null,
        url: null,
      };
    }
  });

  return items;
};

export const searchFileListByPaths = ({
  url,
  rootId,
  rootPath,
  paths,
  excludedExtension = [],
  search = "",
}) => {
  const searchResults = [];
  const inputPath = paths ? `${rootPath}\\${paths.join("\\")}` : rootPath;

  console.log(url);
  try {
    const files = fs.readdirSync(inputPath);

    for (const fileName of files) {
      const filePath = path.join(inputPath, fileName);

      // Getting information for a dir
      try {
        const stats = fs.statSync(filePath);

        // If this path is a directory => drill down folder by calling itself recursively
        if (stats.isDirectory()) {
          searchResults.push(
            ...searchFileListByPaths({
              url,
              rootId,
              rootPath,
              paths: [...paths, fileName],
              excludedExtension,
              search,
            })
          );
        }

        // Skip if file name is in excluding list
        if (excludedExtension.includes(fileName.split(".").pop())) {
          continue;
        }

        // Skip if not meet search criteria
        if (!fileName.toLowerCase().includes(search.toLowerCase())) {
          continue;
        }

        const routePath = createRoutePath({
          rootId,
          paths,
          fileName,
        });

        searchResults.push({
          isDirectory: stats.isDirectory(),
          url: `${url}/${routePath}`,
          path: `/${routePath}`,
          pathOnDisk: filePath,
          name: fileName,
          size: stats.size,
          modifiedDateTime: stats.mtime,
        });
      } catch (statSyncErr) {
        continue;
      }
    }

    return searchResults;
  } catch (readDirError) {
    return [];
  }
};

export const searchAllRootFiles = ({
  url,
  rootPaths,
  excludedExtension,
  search,
}) => {
  const results = rootPaths.reduce((previousValue, currentValue) => {
    previousValue.push(
      ...searchFileListByPaths({
        url,
        rootId: currentValue.id,
        rootPath: currentValue.path,
        paths: [],
        excludedExtension,
        search,
      })
    );
    return previousValue;
  }, []);

  return results;
};
