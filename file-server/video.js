import ffmpeg from "fluent-ffmpeg";

import { SCREENSHOT_DIR } from "./commons/const.js";

const getVideoInfo = (inputPath) => {
  return new Promise((resolve, reject) => {
    return ffmpeg.ffprobe(inputPath, (error, videoInfo) => {
      if (error) {
        return reject(error);
      }

      const { duration, size } = videoInfo.format;

      return resolve({
        size,
        durationInSeconds: Math.floor(duration),
      });
    });
  });
};

const getRandomIntegerInRange = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
};

export const createScreenshots = async ({
  fileName,
  inputPath,
  url,
  shots = 12,
}) => {
  const { durationInSeconds } = await getVideoInfo(inputPath);

  const seconds = createSteps(durationInSeconds, shots);

  return Promise.all(
    seconds.map((second) => {
      return new Promise(async (resolve, reject) => {
        ffmpeg()
          .input(inputPath)
          .inputOptions([`-ss ${second}`])
          .outputOptions(["-vframes 1", "-q:v 3"])
          .noAudio()
          .output(`./${SCREENSHOT_DIR}/${fileName}_${second}.jpg`)
          .on("end", () => {
            resolve({
              url: `${url}/${fileName}_${second}.jpg`,
            });
          })
          .on("error", reject)
          .run();
      });
    })
  );
};

// function createScreenshots() {
//   const time = '';
//   const input = '';
//   const output = ''
//   `ffmpeg -ss ${time} -i ${input} -vframes 1 -q:v 3  ${output}`
// }

function createSteps(input, stepCount) {
  const step = Math.round(input / stepCount);
  const steps = [];

  for (let i = step; i < input; i += step) {
    steps.push(i);
  }
  return steps;
}
