import { convertMinsToHours } from "./util-functions";

describe("convertMinsToHours", () => {
  test("converts minutes to hours when minutes are divisible by 60", () => {
    expect(convertMinsToHours(60)).toBe("1 hr");
    expect(convertMinsToHours(120)).toBe("1 hr");
  });

  test("converts minutes to minutes when less than 60", () => {
    expect(convertMinsToHours(30)).toBe("30 min");
    expect(convertMinsToHours(59)).toBe("59 min");
  });

  test("converts minutes to a combination of hours and minutes when greater than 60 and not divisible by 60", () => {
    expect(convertMinsToHours(90)).toBe("1hr 30min");
    expect(convertMinsToHours(145)).toBe("2hr 25min");
  });
});
