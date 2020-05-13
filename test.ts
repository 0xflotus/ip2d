const { from_str, to_str } = require("./");

test("Should be the same", () => {
  expect(from_str(to_str(1))).toBe(1);
  expect(to_str(from_str("44.2.4.0"))).toBe("44.2.4.0");
  expect(to_str(from_str(to_str(from_str("44.2.4.0"))))).toBe("44.2.4.0");
});

test("should be 127.0.0.1", () => {
  expect(to_str(2130706433)).toBe("127.0.0.1");
});

test("should be 2130706433", () => {
  expect(from_str("127.0.0.1")).toBe(2130706433);
});

test("Should be 9.9.9.9", () => {
  expect(to_str(151587081)).toBe("9.9.9.9");
});

test("Should be 151587081", () => {
  expect(from_str("9.9.9.9")).toBe(151587081);
});

test("should throw error", () => {
  expect(() => from_str("test")).toThrow();
});

test("should be the same", () => {
  expect(to_str(4294967295)).toBe("255.255.255.255");
  expect(to_str(0xffffffff)).toBe("255.255.255.255");
  expect(to_str(-1)).toBe("255.255.255.255");
});

test("should be 9.9.9.8", () => {
  expect(to_str(0xff09090908)).toBe("9.9.9.8");
});

test("should also be 9.9.9.9", () => {
  expect(to_str(0x09090909)).toBe("9.9.9.9");
});

test("arithmetic example", () => {
  expect(from_str("10.10.3.2") + 12).toBe(from_str("10.10.3.14"));
  expect(to_str(from_str("3.5.22.9") + 4)).toBe("3.5.22.13");
  expect(to_str(from_str("3.5.22.255") + 2)).toBe("3.5.23.1");
});
