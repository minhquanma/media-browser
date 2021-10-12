import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import { secondsToHours } from "commons/time.js";
import { SCREENSHOT_DIR } from "commons/const.js";

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

async function generateScreenshots({ inputPath, outputPath, seeking }) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputPath)
      .inputOptions([`-ss ${seeking}`])
      .outputOptions(["-vframes 1", "-q:v 6"])
      .noAudio()
      .output(outputPath)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
}

export function createSteps(input, stepCount) {
  const step = Math.round(input / stepCount);
  const steps = [];

  for (let i = step; i < input; i += step) {
    steps.push(i);
  }
  return steps;
}

export function createShotCount(hours) {
  let shots = 12;

  if (hours >= 4) {
    shots = 25;
  } else if (hours >= 3) {
    shots = 20;
  } else if (hours >= 2) {
    shots = 15;
  }

  return shots;
}

export function makeCreateScreenShots({
  generateScreenshots,
  getVideoInfo,
  secondsToHours,
  createShotCount,
  createSteps,
}) {
  return async function createScreenshots({ fileName, inputPath, url }) {
    const { durationInSeconds } = await getVideoInfo(inputPath);
    const { hours } = secondsToHours(durationInSeconds);

    const shots = createShotCount(hours);
    const seeks = createSteps(durationInSeconds, shots);

    const urlList = [];

    for (const seeking of seeks) {
      const imgName = `${fileName}_${seeking}.jpg`;
      const outputPath = `./${SCREENSHOT_DIR}/${imgName}`;

      if (fs.existsSync(outputPath)) {
        urlList.push({
          url: `${url}/${imgName}`,
        });
      } else {
        await generateScreenshots({
          inputPath,
          outputPath,
          seeking,
        }).catch(() => {
          urlList.push({
            url: null,
          });
        });

        urlList.push({
          url: `${url}/${imgName}`,
        });
      }
    }

    return urlList;
  };
}

export const createScreenshots = makeCreateScreenShots({
  generateScreenshots,
  getVideoInfo,
  secondsToHours,
  createShotCount,
  createSteps,
});
