import {
  mappingHeading,
  mergeUrlImg,
  randomColorTailWind,
  rankByPoint,
} from "@/lib/common";

describe("mappingHeading", () => {
  test("returns correct heading for known keyUrls", () => {
    expect(mappingHeading("now_playing")).toBe("Now Playing");
    expect(mappingHeading("popular")).toBe("Popular");
    expect(mappingHeading("top_rated")).toBe("Top Rated");
    expect(mappingHeading("upcoming")).toBe("Upcoming");
    expect(mappingHeading("movie")).toBe("Discover Movies");
    expect(mappingHeading("airing_today")).toBe("Airing Today");
  });

  test('returns "Unknown heading" for unknown keyUrl', () => {
    expect(mappingHeading("unknown")).toBe("Unknow heading");
  });
});

describe("mergeUrlImg", () => {
  test("returns merged URL with valid keyUrl", () => {
    const keyUrl = "/path/to/image.jpg";
    const expectedUrl = "http://image.tmdb.org/t/p/w500/path/to/image.jpg";
    expect(mergeUrlImg(keyUrl)).toBe(expectedUrl);
  });

  test("returns an empty string for empty keyUrl", () => {
    expect(mergeUrlImg("")).toBe("");
  });
});

describe("randomColorTailWind", () => {
  test("returns a random color class", () => {
    const colorsClass = [
      "bg-rose-300 text-rose-700",
      "bg-purple-300 text-purple-700",
      "bg-violet-300 text-violet-700",
      "bg-blue-300 text-blue-700",
      "bg-emerald-300 text-elue-700",
      "bg-orange-300 text-orange-700",
      "bg-gray-300 text-gray-700",
    ];
    const randomColor = randomColorTailWind();

    expect(colorsClass).toContain(randomColor);
  });
});

describe("rankByPoint", () => {
  test("returns correct CSS class for point > 7", () => {
    expect(rankByPoint(8)).toBe("!border-green-500");
    expect(rankByPoint(10)).toBe("!border-green-500");
  });

  test("returns correct CSS class for 5 < point <= 7", () => {
    expect(rankByPoint(6)).toBe("!border-yellow-500");
    expect(rankByPoint(7)).toBe("!border-yellow-500");
  });

  test("returns correct CSS class for point <= 5", () => {
    expect(rankByPoint(4)).toBe("!border-red-500");
    expect(rankByPoint(2)).toBe("!border-red-500");
  });
});
