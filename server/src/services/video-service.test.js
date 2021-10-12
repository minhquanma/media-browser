import { createSteps, createShotCount } from "./video-service.js";

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
  // if (hours >= 4) {
  //     shots = 25;
  //   } else if (hours >= 3) {
  //     shots = 20;
  //   } else if (hours >= 2) {
  //     shots = 15;
  //   }
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
