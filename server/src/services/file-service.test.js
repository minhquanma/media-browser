import {
  getFileList,
  getFileListByPaths,
  getFileListByRootPaths,
  getRootPathList,
} from "./file-service.js";

const folderName = process.cwd() + "\\src\\services\\file-service.test";

const mockupRootPaths = [
  {
    id: "111",
    name: "Test existing folder",
    status: "collapsed",
    path: folderName,
  },
  {
    id: "222",
    name: "Test not existing folder",
    status: "collapsed",
    path: "Mr.Bean",
  },
];

describe("getFileList", () => {
  test("should return all items in test folder", () => {
    const results = getFileList("url", folderName, "");

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

describe("getFileListByPaths", () => {
  test("should return all items in test folder", () => {
    const results = getFileListByPaths({
      url: "http://localhost",
      rootId: "111",
      rootPaths: mockupRootPaths,
      paths: ["folder1"],
      excludedExtension: [],
    });

    const expectedItems = 3;

    expect(results.length).toBe(expectedItems);
  });

  test("should exclude items with ext: *.abc in test folder", () => {
    const results = getFileListByPaths({
      url: "http://localhost",
      rootId: "111",
      rootPaths: mockupRootPaths,
      paths: ["folder1"],
      excludedExtension: ["abc"],
    });

    const expectedItems = 2;

    expect(results.length).toBe(expectedItems);
  });

  test("rootpath is empty, should return no items", () => {
    const results = getFileList({
      url: "http://localhost",
      rootId: "111",
      rootPaths: [],
      paths: ["folder1"],
      excludedExtension: [],
    });

    const expectedItems = 0;

    expect(results.length).toBe(expectedItems);
  });

  test("path not exists, should return no items", () => {
    const results = getFileList({
      url: "http://localhost",
      rootId: "111",
      rootPaths: mockupRootPaths,
      paths: ["hello"],
      excludedExtension: [],
    });

    const expectedItems = 0;

    expect(results.length).toBe(expectedItems);
  });
});

describe("getRootPathList", () => {
  const results = getRootPathList("http://localhost", mockupRootPaths);
  console.log(results);
  test("should return all items in test folder", () => {});
});
