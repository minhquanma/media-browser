import ApiService from "services/api.service";

export async function getFileList() {
  return await ApiService.get("/fileList");
}
