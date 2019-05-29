const { from_str, to_str } = require("./");

test("should be 127.0.0.1", () => {
  expect(to_str(2130706433)).toBe("127.0.0.1");
});

test("should be 2130706433", () => {
  expect(from_str("127.0.0.1")).toBe(2130706433);
});
