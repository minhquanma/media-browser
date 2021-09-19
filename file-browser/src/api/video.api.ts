import ApiService from "services/api.service";
import placeHolderImg from "assets/thumb_placeholder.png";

const MOCK_VIDEO_PREVIEW = [
  { url: placeHolderImg },
  { url: placeHolderImg },
  { url: placeHolderImg },
];

export async function getVideoPreview(params: any) {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(MOCK_VIDEO_PREVIEW);
  //   }, 1000);
  // });

  return await ApiService.post("/videoPreview", params);
}
