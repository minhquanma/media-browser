import fs from "fs";
import path from "path";
import md5 from "md5";

export const getFileListByRootPaths = (
  requestedUrl,
  rootPaths,
  excludedExtension
) => {
  const items = rootPaths.map((rootPath) => {
    const stats = fs.statSync(rootPath.path);

    // Generate path url using md5
    const rootUrl = requestedUrl + "/" + md5(rootPath.path);

    // Root item
    return {
      isDirectory: true,
      isRoot: true,
      name: rootPath.name,
      path: rootPath.path,
      modifiedDateTime: stats.mtime,
      url: null,
      children: getFileList(rootUrl, rootPath.path, excludedExtension),
    };
  });

  return items;
};

export const getFileList = (url, inputPath, excludedExtension) => {
  const files = fs.readdirSync(inputPath);

  const fileList = files.flatMap((fileName) => {
    const filePath = path.join(inputPath, fileName);

    // Getting information for a dir
    try {
      const stats = fs.statSync(filePath);

      // Excluding filter
      if (excludedExtension.includes(fileName.split(".").pop())) {
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
    } catch (err) {
      return [];
    }
  });

  return fileList;
};
