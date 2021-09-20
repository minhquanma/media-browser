import fs from "fs";
import path from "path";

export const getFileListByPath = (url, paths, excludedExtension) => {
  const items = paths.map((path) => {
    const stats = fs.statSync(path);

    // Root item
    return {
      isDirectory: true,
      name: path,
      path: path,
      modifiedDateTime: stats.mtime,
      url: "",
      children: getFileList(url, path, excludedExtension),
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
        ? getFileList(url + "/" + fileName, filePath)
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
