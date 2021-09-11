import ApiService from "services/api.service";

const MOCK_DATA = [
  {
    isDirectory: false,
    size: 10240000,
    name: "Mock file item",
    modifiedDateTime: Date.now(),
    children: [],
  },
];

export async function getFileList() {
  return MOCK_DATA;
  return await ApiService.get("/fileList");
}
