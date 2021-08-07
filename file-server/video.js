import ffmpeg from "fluent-ffmpeg";
import { secondsToHours } from "./commons/time.js";
import { SCREENSHOT_DIR } from "./commons/const.js";

const getRandomIntegerInRange = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
};

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

export const createScreenshots = async ({
  fileName,
  inputPath,
  url,
  shots = 10,
}) => {
  const { durationInSeconds } = await getVideoInfo(inputPath);

  const { hours } = secondsToHours(durationInSeconds);

  if (hours >= 4) {
    shots = 30;
  } else if (hours >= 3) {
    shots = 25;
  } else if (hours >= 2) {
    shots = 20;
  } else {
    shots = 15;
  }

  const seconds = createSteps(durationInSeconds, shots);

  return Promise.all(
    seconds.map((second) => {
      return new Promise(async (resolve, reject) => {
        ffmpeg()
          .input(inputPath)
          .inputOptions([`-ss ${second}`])
          .outputOptions(["-vframes 1", "-q:v 6"])
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

function createSteps(input, stepCount) {
  const step = Math.round(input / stepCount);
  const steps = [];

  for (let i = step; i < input; i += step) {
    steps.push(i);
  }
  return steps;
}
