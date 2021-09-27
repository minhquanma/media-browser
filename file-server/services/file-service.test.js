import { getFileList } from "./file-service.js";

const folderName = process.cwd() + "\\services\\file-service.test";

describe("getFileList", () => {
  test("should return all items in test folder", () => {
    console.log(folderName);
    const results = getFileList("url", folderName, "");

    const expectedItems = 4;

    expect(results.length).toBe(expectedItems);
  });

  test("should exclude items with ext: *.abc in test folder", () => {
    console.log(folderName);
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
