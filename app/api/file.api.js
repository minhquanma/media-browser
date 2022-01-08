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

export async function getFileList({ accessToken }) {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(MOCK_DATA);
  //   }, 3000);
  // });

  return await ApiService.get("/fileList", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getRootPathList({ accessToken, search = "" }) {
  return await ApiService.get("/rootPathList", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: { search },
  });
}

export async function getFileListByPath({
  accessToken,
  rootId,
  paths,
  search,
}) {
  return await ApiService.get("/fileList/" + rootId, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: { paths, search },
  });
}
