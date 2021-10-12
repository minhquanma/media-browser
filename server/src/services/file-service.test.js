import { getFileList, getFileListByRootPaths } from "./file-service.js";

const folderName = process.cwd() + "\\src\\services\\file-service.test";

const mockupRootPaths = [
  {
    name: "Test existing folder",
    status: "collapsed",
    path: folderName,
  },
  {
    name: "Test not existing folder",
    status: "collapsed",
    path: "Mr.Bean",
  },
];

describe("getFileList", () => {
  test("should return all items in test folder", () => {
    const results = getFileList("url", folderName, "");
    console.log(folderName);
    const expectedItems = 4;

    expect(results.length).toBe(expectedItems);
  });

  test("should exclude items with ext: *.abc in test folder", () => {
    const results = getFileList("url", folderName, "abc");

    const expectedItems = 3;

    expect(results.length).toBe(expectedItems);
  });

  test("should return no items", () => {
    const results = getFileList("url", "monkey", "abc");

    const expectedItems = 0;

    expect(results.length).toBe(expectedItems);
  });
});

describe("getFileListByRootPaths", () => {
  test("should return all items in root paths", () => {
    const results = getFileListByRootPaths("url", mockupRootPaths, "");

    const expectedItems = 2;

    expect(results.length).toBe(expectedItems);
  });

  test("should return all items in first children", () => {
    const results = getFileListByRootPaths("url", mockupRootPaths, "");

    const expectedItems = 4;

    const items = results[0].children.length;

    expect(items).toBe(expectedItems);
  });

  test("should exclude items with ext: *.abc in first children", () => {
    const results = getFileListByRootPaths("url", mockupRootPaths, "abc");

    const expectedItems = 3;

    const items = results[0].children.length;

    expect(items).toBe(expectedItems);
  });

  test("should return no items", () => {
    const results = getFileListByRootPaths("url", [], "abc");

    const expectedItems = 0;

    expect(results.length).toBe(expectedItems);
  });
});
