import {toIPv4, fromIPv4, toIPv6, fromIPv6} from "./"

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
  IPv6 Testing
*/

test("should be 1", () => {
  expect(fromIPv6("::1")).toBe(BigInt(1));
});

test("should be 44996461372433492606259129078766914650", () => {
  expect(fromIPv6("21DA:D4:0:2F4C:2BC:FF:FE18:4C5A")).toBe(BigInt(44996461372433492606259129078766914650));
});

test("should be 42541956123769884636017138956568135816", () => {
  expect(fromIPv6("2001:4860:4860::8888")).toBe(BigInt(42541956123769884636017138956568135816));
});

test("should be ::1", () => {
  expect(toIPv6(BigInt(1))).toBe("::1");
});

test("should be 21DA:D4:0:2F4C:2BC:FF:FE18:4C5A", () => {
  expect(toIPv6(BigInt(44996461372433492606259129078766914650))).toBe("21DA:D4:0:2F4C:2BC:FF:FE18:4C5A");
});

test("should be 2001:4860:4860::8888", () => {
  expect(toIPv6(BigInt(42541956123769884636017138956568135816))).toBe("2001:4860:4860::8888");
});