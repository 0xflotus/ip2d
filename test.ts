const { from, to} = require("./");

test("Should be the same", () => {
  expect(from(to(1))).toBe(1);
  expect(to(from("44.2.4.0"))).toBe("44.2.4.0");
  expect(to(from(to(from("44.2.4.0"))))).toBe("44.2.4.0");
});

test("should be 127.0.0.1", () => {
  expect(to(2130706433)).toBe("127.0.0.1");
});

test("should be 2130706433", () => {
  expect(from("127.0.0.1")).toBe(2130706433);
});

test("Should be 9.9.9.9", () => {
  expect(to(151587081)).toBe("9.9.9.9");
});

test("Should be 151587081", () => {
  expect(from("9.9.9.9")).toBe(151587081);
  expect(from("9.9.9.8")).toBe(151587080);
});

test("should throw error", () => {
  expect(() => from("test")).toThrow();
});

test("should be the same", () => {
  expect(to(4294967295)).toBe("255.255.255.255");
  expect(to(0xffffffff)).toBe("255.255.255.255");
  expect(to(-1)).toBe("255.255.255.255");
});

test("should be 9.9.9.8", () => {
  expect(to(0xff09090908)).toBe("9.9.9.8");
});

test("should also be 9.9.9.9", () => {
  expect(to(0x09090909)).toBe("9.9.9.9");
});

test("arithmetic example", () => {
  expect(from("10.10.3.2") + 12).toBe(from("10.10.3.14"));
  expect(to(from("3.5.22.9") + 4)).toBe("3.5.22.13");
  expect(to(from("3.5.22.255") + 2)).toBe("3.5.23.1");
});
