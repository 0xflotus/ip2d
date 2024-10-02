import { toIPv4, fromIPv4, toIPv6, fromIPv6 } from "./";

/* 
  IPv4 Testing 
*/

test("Should be the same", () => {
  expect(fromIPv4(toIPv4(1))).toBe(1);
  expect(toIPv4(fromIPv4("44.2.4.0"))).toBe("44.2.4.0");
  expect(toIPv4(fromIPv4(toIPv4(fromIPv4("44.2.4.0"))))).toBe("44.2.4.0");
});

test("should be 127.0.0.1", () => {
  expect(toIPv4(2130706433)).toBe("127.0.0.1");
});

test("should be 2130706433", () => {
  expect(fromIPv4("127.0.0.1")).toBe(2130706433);
});

test("Should be 9.9.9.9", () => {
  expect(toIPv4(151587081)).toBe("9.9.9.9");
});

test("Should be 151587081", () => {
  expect(fromIPv4("9.9.9.9")).toBe(151587081);
  expect(fromIPv4("9.9.9.8")).toBe(151587080);
});

test("should throw error", () => {
  expect(() => fromIPv4("test")).toThrow();
});

test("should be the same", () => {
  expect(toIPv4(4294967295)).toBe("255.255.255.255");
  expect(toIPv4(0xffffffff)).toBe("255.255.255.255");
  expect(toIPv4(-1)).toBe("255.255.255.255");
});

test("should be 9.9.9.8", () => {
  expect(toIPv4(0xff09090908)).toBe("9.9.9.8");
});

test("should also be 9.9.9.9", () => {
  expect(toIPv4(0x09090909)).toBe("9.9.9.9");
});

test("arithmetic example", () => {
  expect(fromIPv4("10.10.3.2") + 12).toBe(fromIPv4("10.10.3.14"));
  expect(toIPv4(fromIPv4("3.5.22.9") + 4)).toBe("3.5.22.13");
  expect(toIPv4(fromIPv4("3.5.22.255") + 22)).toBe("3.5.23.21");
});

/*
  IPv4 Additional Testing 
*/

test("should be 0.0.0.0", () => {
  expect(toIPv4(0)).toBe("0.0.0.0");
});

test("should be 0", () => {
  expect(fromIPv4("0.0.0.0")).toBe(0);
});

test("should throw error for invalid IPv4 format", () => {
  expect(() => fromIPv4("999.999.999.999")).toThrow();
  expect(() => fromIPv4("abcd")).toThrow();
  expect(() => fromIPv4("192.168.0.256")).toThrow();
  expect(() => fromIPv4("192.168.-1.1")).toThrow();
});

test("should handle IPv4 with leading zeros", () => {
  expect(fromIPv4("192.168.001.001")).toBe(fromIPv4("192.168.1.1"));
  expect(toIPv4(fromIPv4("001.002.003.004"))).toBe("1.2.3.4");
});

test("should throw error for negative numbers (except -1)", () => {
  expect(() => toIPv4(-2)).toThrow();
  expect(() => toIPv4(-100)).toThrow();
});

test("should throw error for incomplete IPv4 strings", () => {
  expect(() => fromIPv4("192.168")).toThrow();
  expect(() => fromIPv4("255.255")).toThrow();
});

/*
  IPv6 Testing
*/

test("should be 1", () => {
  expect(fromIPv6("::1")).toBe(1n);
});

test("should be 44996461372433492606259129078766914650", () => {
  expect(fromIPv6("21da:d4::2f4c:2bc:ff:fe18:4c5a")).toBe(44996461372433492606259129078766914650n);
});

test("should be 42541956123769884636017138956568135816", () => {
  expect(fromIPv6("2001:4860:4860::8888")).toBe(42541956123769884636017138956568135816n);
});

test("should be ::1", () => {
  expect(toIPv6(1n)).toBe("::1");
});

test("should be 21da:d4::2f4c:2bc:ff:fe18:4c5a", () => {
  expect(toIPv6(44996461372433492606259129078766914650n)).toBe("21da:d4::2f4c:2bc:ff:fe18:4c5a");
});

test("should be 2001:4860:4860::8888", () => {
  expect(toIPv6(42541956123769884636017138956568135816n)).toBe("2001:4860:4860::8888");
});

/*
  IPv6 Additional Testing
*/

test("should be ::", () => {
  expect(toIPv6(BigInt(0))).toBe("::");
});

test("should be 0", () => {
  expect(fromIPv6("::")).toBe(BigInt(0));
});

test("should throw error for invalid IPv6 format", () => {
  expect(() => fromIPv6("2001:4860::z888")).toThrow(); // invalid character
  expect(() => fromIPv6("abcd")).toThrow(); // too short
  expect(() => fromIPv6("1200::AB00::BA0")).toThrow(); // double "::"
  expect(() => fromIPv6("::1::")).toThrow(); // misplaced "::"
});

test("should handle IPv6 with leading zeros", () => {
  expect(fromIPv6("0001:0000:0000:0000:0000:0000:0000:0001")).toBe(BigInt(1));
  expect(toIPv6(BigInt(1))).toBe("::1");
  expect(toIPv6(BigInt(42541956123769884636017138956568135816n))).toBe("2001:4860:4860::8888");
});

test("should throw error for numbers beyond IPv6 range", () => {
  const maxIPv6Value = BigInt("340282366920938463463374607431768211455"); // 2^128 - 1
  expect(() => toIPv6(maxIPv6Value + BigInt(1))).toThrow();
  expect(() => fromIPv6("340282366920938463463374607431768211456")).toThrow(); // beyond 128-bit
});

test("should throw error for negative BigInt", () => {
  expect(() => toIPv6(BigInt(-1))).toThrow();
  expect(() => fromIPv6("-1")).toThrow();
});

test("should throw error for incomplete IPv6 strings", () => {
  expect(() => fromIPv6("2001:4860")).toThrow();
  expect(() => fromIPv6("::1::")).toThrow();
});
