import {
  createSteps,
  createShotCount,
  makeCreateScreenShots,
} from "./video-service.js";

describe("createSteps", () => {
  test("should return correct length", () => {
    const results = createSteps(100, 5);
    const expectedItems = 4;

    expect(results.length).toBe(expectedItems);
  });

  test("should return correct data", () => {
    const results = createSteps(100, 5);
    const expectedItems = [20, 40, 60, 80];

    expect(results).toStrictEqual(expectedItems);
  });
});

describe("createShotCount", () => {
  test("hours >= 4, should return correct length", () => {
    const results = createShotCount(4);
    const expectedItems = 25;

    expect(results).toBe(expectedItems);
  });

  test("hours >= 3, should return correct data", () => {
    const results = createShotCount(3);
    const expectedItems = 20;
    expect(results).toBe(expectedItems);
  });

  test("hours >= 2, should return correct data", () => {
    const results = createShotCount(2);
    const expectedItems = 15;
    expect(results).toBe(expectedItems);
  });

  test("hours < 2, should return correct data", () => {
    const results = createShotCount(1);
    const expectedItems = 12;
    expect(results).toBe(expectedItems);
  });
});

describe("createScreenshots", () => {
  // Mock dependencies
  const generateScreenshots = () => {
    return Promise.resolve();
  };

  const getVideoInfo = () => {
    return Promise.resolve({
      size: 1024 * 1024,
      durationInSeconds: 3600,
    });
  };

  const secondsToHours = () => {
    return {
      remainder: 0,
      hours: 1,
    };
  };

  const createShotCount = (hours) => {
    return 5;
  };

  const createSteps = (durationInSeconds, shots) => {
    return [3, 5, 7, 9];
  };

  const createScreenshots = makeCreateScreenShots({
    generateScreenshots,
    getVideoInfo,
    secondsToHours,
    createShotCount,
    createSteps,
  });

  test("should return correct length", async () => {
    const results = await createScreenshots({
      fileName: "video.mp4",
      inputPath: "path/video.mp4",
      url: "http://localhost:8080",
    });
    const expectedItems = 4;

    expect(results.length).toBe(expectedItems);
  });

  test("should return correct data", async () => {
    const results = await createScreenshots({
      fileName: "video.mp4",
      inputPath: "path/video.mp4",
      url: "http://localhost:8080/ss",
    });

    const expectedItems = [
      {
        url: "http://localhost:8080/ss/video.mp4_3.jpg",
      },
      {
        url: "http://localhost:8080/ss/video.mp4_5.jpg",
      },
      {
        url: "http://localhost:8080/ss/video.mp4_7.jpg",
      },
      {
        url: "http://localhost:8080/ss/video.mp4_9.jpg",
      },
    ];

    expect(results).toStrictEqual(expectedItems);
  });

  test("error, should return correct data", async () => {
    const results = await createScreenshots({
      fileName: "video.mp4",
      inputPath: "path/video.mp4",
      url: "http://localhost:8080/ss",
    });

    const expectedItems = [
      {
        url: "http://localhost:8080/ss/video.mp4_3.jpg",
      },
      {
        url: "http://localhost:8080/ss/video.mp4_5.jpg",
      },
      {
        url: "http://localhost:8080/ss/video.mp4_7.jpg",
      },
      {
        url: "http://localhost:8080/ss/video.mp4_9.jpg",
      },
    ];

    expect(results).toStrictEqual(expectedItems);
  });
});
