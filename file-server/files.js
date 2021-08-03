import fs from "fs";
import path from "path";

export const getFileList = (url, inputPath) => {
  const files = fs.readdirSync(inputPath);

  const fileList = files.flatMap((file) => {
    const filePath = path.join(inputPath, file);

    // Getting information for a dir
    try {
      const stats = fs.statSync(filePath);

      const children = stats.isDirectory()
        ? getFileList(url + "/" + file, filePath)
        : [];

      return [
        {
          isDirectory: stats.isDirectory(),
          children: children,
          url: `${url}/${file}`,
          path: filePath,
          name: file,
          size: stats.size,
        },
      ];
    } catch (err) {
      return [];
    }
  });

  return fileList;
};
