import ApiService from "services/api.service";

const MOCK_DATA = [
  {
    isDirectory: true,
    size: 10240000,
    name: "Mock file item",
    modifiedDateTime: Date.now(),
    children: [
      {
        isDirectory: false,
        size: 10240000,
        name: "Mock file item child",
        modifiedDateTime: Date.now(),
        children: [],
      },
    ],
  },
  {
    isDirectory: false,
    size: 10240000,
    name: "Mock file item 2",
    modifiedDateTime: Date.now(),
    children: [],
  },
];

export async function getFileList() {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(MOCK_DATA);
  //   }, 3000);
  // });
  return await ApiService.get("/fileList");
}
