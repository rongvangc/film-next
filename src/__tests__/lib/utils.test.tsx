import { cn, isServer, fallbackDisplayname } from "@/lib/utils";

describe("cn", () => {
  test("returns merged class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  test("handles undefined inputs", () => {
    expect(cn("class1", undefined, "class2")).toBe("class1 class2");
  });

  test("handles empty inputs", () => {
    expect(cn()).toBe("");
  });
});

describe("isServer", () => {
  test("returns true when running on server", () => {
    expect(isServer).toBe(false);
  });
});

describe("fallbackDisplayname", () => {
  test("returns uppercase initials of display name", () => {
    expect(fallbackDisplayname("example")).toBe("EX");
    expect(fallbackDisplayname("anotherExample")).toBe("AN");
  });

  test('returns "UN" when display name is not provided', () => {
    expect(fallbackDisplayname()).toBe("UN");
  });
});
