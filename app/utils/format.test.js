import { formatFileSize } from "./format";

test("formatFileSize in KB", () => {
  const input = 1024;
  const expected = "1 KB";

  expect(formatFileSize(input)).toBe(expected);
});

test("formatFileSize in MB", () => {
  const input = 2000000;
  const expected = "1.91 MB";

  expect(formatFileSize(input)).toBe(expected);
});

test("formatFileSize in GB", () => {
  const input = 2000000000;
  const expected = "1.86 GB";

  expect(formatFileSize(input)).toBe(expected);
});
