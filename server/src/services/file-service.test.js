// @ts-nocheck
import {
  getRootPathList,
  getFileList,
  getFileListByPaths,
  getFileListByRootPaths,
  searchFileListByPaths,
  createRoutePath,
} from "./file-service.js";

const folderName = process.cwd() + "\\src\\services\\file-service.test";

const mockupRootPaths = [
  {
    id: "111",
    name: "Test existing folder",
    path: folderName,
  },
  {
    id: "222",
    name: "Test not existing folder",
    path: "Mr.Bean",
  },
];

describe("getRootPathList", () => {
  test("should return all items in test folder", () => {
    const results = getRootPathList("http://localhost", mockupRootPaths);

    const expectedItems = 2;

    expect(results.length).toBe(expectedItems);
  });

  test("rootPaths is empty, should return no items ", () => {
    const results = getRootPathList("http://localhost", []);

    const expectedItems = 0;

    expect(results.length).toBe(expectedItems);
  });

  test("malformed input, should return no items ", () => {
    const results = getRootPathList("http://localhost", undefined);

    const expectedItems = 0;

    expect(results.length).toBe(expectedItems);
  });

  test("malformed input, should return no items ", () => {
    const results = getRootPathList(undefined, undefined);

    const expectedItems = 0;

    expect(results.length).toBe(expectedItems);
  });
});

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
    const results = getFileListByRootPaths({
      requestedUrl: "url",
      rootPaths: mockupRootPaths,
      excludedExtension: [],
    });

    const expectedItems = 2;

    expect(results.length).toBe(expectedItems);
  });

  test("should return all items in first children", () => {
    const results = getFileListByRootPaths({
      requestedUrl: "url",
      rootPaths: mockupRootPaths,
      excludedExtension: [],
    });

    const expectedItems = 4;

    const items = results[0].children.length;

    expect(items).toBe(expectedItems);
  });

  test("should exclude items with ext: *.abc in first children", () => {
    const results = getFileListByRootPaths({
      requestedUrl: "url",
      rootPaths: mockupRootPaths,
      excludedExtension: ["abc"],
    });

    const expectedItems = 3;

    const items = results[0].children.length;

    expect(items).toBe(expectedItems);
  });

  test("should return no items", () => {
    const results = getFileListByRootPaths({
      requestedUrl: "url",
      rootPaths: [],
      excludedExtension: [],
    });

    const expectedItems = 0;

    expect(results.length).toBe(expectedItems);
  });
});

describe("getFileListByPaths", () => {
  test("should return all items in real folder", () => {
    const realRootPaths = [
      {
        id: "111",
        name: "Test real folder",
        path: "D:\\",
      },
    ];

    const results = getFileListByPaths({
      url: "http://localhost",
      rootId: "111",
      rootPaths: realRootPaths,
      paths: ["Media", "Movies"],
      excludedExtension: [],
    });

    //console.log(results);

    expect(results);
  });

  test("should return all items in test folder", () => {
    const results = getFileListByPaths({
      url: "http://localhost",
      rootId: "111",
      rootPath: folderName,
      paths: [],
      excludedExtension: [],
    });

    const expectedItems = 4;

    expect(results.length).toBe(expectedItems);
  });

  test("should exclude items with ext: *.abc in test folder", () => {
    const results = getFileListByPaths({
      url: "http://localhost",
      rootId: "111",
      rootPath: folderName,
      paths: ["folder1"],
      excludedExtension: ["abc"],
    });

    const expectedItems = 2;

    expect(results.length).toBe(expectedItems);
  });

  test("input path not exists, should return no items", () => {
    const results = getFileListByPaths({
      url: "http://localhost",
      rootId: "111",
      rootPath: folderName,
      paths: ["hello"],
      excludedExtension: [],
    });

    const expectedItems = 0;

    expect(results.length).toBe(expectedItems);
  });

  test("malformed input, should return no items", () => {
    const results = getFileListByPaths({
      url: undefined,
      rootId: undefined,
      rootPath: undefined,
      paths: undefined,
      excludedExtension: undefined,
    });

    const expectedItems = 0;

    expect(results.length).toBe(expectedItems);
  });
});

describe("createRoutePath", () => {
  test("should return correct data", () => {
    const results = createRoutePath({
      rootId: "111",
      paths: ["hello", "world"],
      fileName: "test.txt",
    });

    const expected = "111/hello/world/test.txt";
    expect(results).toBe(expected);
  });

  test("paths is empty, should return correct data", () => {
    const results = createRoutePath({
      rootId: "111",
      paths: [],
      fileName: "test.txt",
    });

    const expected = "111/test.txt";
    expect(results).toBe(expected);
  });
});

describe("searchFileListByPaths", () => {
  test("should return all items in test folder", () => {
    const results = searchFileListByPaths({
      url: "http://localhost:200",
      rootId: "111",
      rootPath: folderName,
      paths: [],
      excludedExtension: [],
      search: "",
    });

    const expectedItems = 9;

    expect(results.length).toBe(expectedItems);
  });

  test("should exclude items with ext: *.abc in test folder", () => {
    const results = searchFileListByPaths({
      url: "http://localhost:200",
      rootId: "111",
      rootPath: folderName,
      paths: [],
      excludedExtension: ["abc"],
      search: "",
    });

    const expectedItems = 6;
    expect(results.length).toBe(expectedItems);
  });

  test("should only include items with name = file1", () => {
    const results = searchFileListByPaths({
      url: "http://localhost:200",
      rootId: "111",
      rootPath: folderName,
      paths: [],
      excludedExtension: [],
      search: "file1",
    });

    const expectedItems = 4;
    expect(results.length).toBe(expectedItems);
  });

  test("should only include items with name = children", () => {
    const results = searchFileListByPaths({
      url: "http://localhost:200",
      rootId: "111",
      rootPath: folderName,
      paths: [],
      excludedExtension: [],
      search: "children",
    });

    const expectedItems = 2;
    expect(results.length).toBe(expectedItems);
  });

  test("should only include items with sub path = folder1", () => {
    const results = searchFileListByPaths({
      url: "http://localhost:200",
      rootId: "111",
      rootPath: folderName,
      paths: ["folder1"],
      excludedExtension: [],
      search: "",
    });

    console.log(results);
    const expectedItems = 4;
    expect(results.length).toBe(expectedItems);
  });

  test("input path not exists, should return no items", () => {
    const results = searchFileListByPaths({
      url: "http://localhost:200",
      rootId: "111",
      rootPath: "ddd",
      paths: [],
      excludedExtension: [],
      search: "children",
    });

    const expectedItems = 0;
    expect(results.length).toBe(expectedItems);
  });

  test("malformed input, should return no items", () => {
    const results = searchFileListByPaths({
      url: "http://localhost:200",
      rootId: undefined,
      rootPath: undefined,
      paths: undefined,
      excludedExtension: undefined,
      search: undefined,
    });

    const expectedItems = 0;
    expect(results.length).toBe(expectedItems);
  });
});
