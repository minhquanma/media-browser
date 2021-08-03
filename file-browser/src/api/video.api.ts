import ApiService from "services/api.service";

export async function getVideoPreview(params: any) {
  return await ApiService.post("/videoPreview", params);
}
