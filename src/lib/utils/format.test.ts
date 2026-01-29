import { describe, it, expect } from "vitest";
import { formatNumber, formatRate } from "./format";

describe("formatNumber", () => {
  it("formats millions", () => {
    expect(formatNumber(2_500_000)).toBe("2.5M");
  });
  it("formats thousands", () => {
    expect(formatNumber(42_300)).toBe("42.3K");
  });
  it("formats small numbers", () => {
    expect(formatNumber(123)).toBe("123");
  });
});

describe("formatRate", () => {
  it("formats rate per 100K", () => {
    expect(formatRate(12.345)).toBe("12.3 per 100K");
  });
  it("supports custom decimals", () => {
    expect(formatRate(12.345, 2)).toBe("12.35 per 100K");
  });
});
