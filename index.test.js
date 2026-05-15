import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { fromIPv4, fromIPv6, toIPv4, toIPv6 } from "./dist/index.js";

describe("ipv4", () => {
  test("should convert back and forth", () => {
    assert.strictEqual(fromIPv4(toIPv4(1)), 1);
    assert.strictEqual(toIPv4(fromIPv4("44.2.4.0")), "44.2.4.0");
    assert.strictEqual(toIPv4(fromIPv4(toIPv4(fromIPv4("44.2.4.0")))), "44.2.4.0");
  });

  test("should convert number to ip", () => {
    assert.strictEqual(toIPv4(2130706433), "127.0.0.1");
    assert.strictEqual(toIPv4(151587081), "9.9.9.9");
  });

  test("should convert ip to number", () => {
    assert.strictEqual(fromIPv4("127.0.0.1"), 2130706433);
    assert.strictEqual(fromIPv4("9.9.9.9"), 151587081);
    assert.strictEqual(fromIPv4("9.9.9.8"), 151587080);
  });

  test("should support arithmetic", () => {
    assert.strictEqual(fromIPv4("10.10.3.2") + 12, fromIPv4("10.10.3.14"));
    assert.strictEqual(toIPv4(fromIPv4("3.5.22.9") + 4), "3.5.22.13");
    assert.strictEqual(toIPv4(fromIPv4("3.5.22.255") + 22), "3.5.23.21");
  });

  test("should handle boundaries", () => {
    assert.strictEqual(toIPv4(0), "0.0.0.0");
    assert.strictEqual(fromIPv4("0.0.0.0"), 0);
    assert.strictEqual(toIPv4(4294967295), "255.255.255.255");
  });

  test("should handle hex values", () => {
    assert.strictEqual(toIPv4(0xffffffff), "255.255.255.255"); // ignore-hex-under
    assert.strictEqual(toIPv4(0x09090908), "9.9.9.8");
    assert.strictEqual(toIPv4(0x09090909), "9.9.9.9");
  });

  describe("errors", () => {
    test("invalid format", () => {
      assert.throws(() => fromIPv4("999.999.999.999"));
      assert.throws(() => fromIPv4("abcd"));
      assert.throws(() => fromIPv4("192.168.0.256"));
      assert.throws(() => fromIPv4("192.168.-1.1"));
    });

    test("invalid structure", () => {
      assert.throws(() => fromIPv4("192.168"));
      assert.throws(() => fromIPv4("255.255"));
      assert.throws(() => fromIPv4("192.168.0.252.11"));
      assert.throws(() => fromIPv4("192.168.abc.1"));
    });

    test("invalid types", () => {
      assert.throws(() => fromIPv4(123));
      assert.throws(() => fromIPv4({}));
      assert.throws(() => fromIPv4([]));
      assert.throws(() => fromIPv4(null));
      assert.throws(() => fromIPv4(undefined));
    });

    test("invalid toipv4 input", () => {
      assert.throws(() => toIPv4(true));
      assert.throws(() => toIPv4(-2));
      assert.throws(() => toIPv4(-100));
    });
  });
});

describe("ipv6", () => {
  test("should convert from ipv6 to bigint", () => {
    assert.strictEqual(fromIPv6("::1"), 1n);
    assert.strictEqual(
      fromIPv6("21da:d4::2f4c:2bc:ff:fe18:4c5a"),
      44996461372433492606259129078766914650n,
    );
    assert.strictEqual(fromIPv6("2001:4860:4860::8888"), 42541956123769884636017138956568135816n);
  });

  test("should convert bigint to ipv6", () => {
    assert.strictEqual(toIPv6(1n), "::1");
    assert.strictEqual(
      toIPv6(44996461372433492606259129078766914650n),
      "21da:d4::2f4c:2bc:ff:fe18:4c5a",
    );
    assert.strictEqual(toIPv6(42541956123769884636017138956568135816n), "2001:4860:4860::8888");
  });

  test("should handle max values", () => {
    assert.strictEqual(toIPv6(2n ** 128n - 1n), "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff");
    assert.strictEqual(
      fromIPv6("ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff"),
      340282366920938463463374607431768211455n,
    );
  });

  test("should handle compressed forms", () => {
    assert.strictEqual(
      toIPv6(340282366841710300967557013911933812735n),
      "ffff:ffff::ffff:ffff:ffff:ffff",
    );
    assert.strictEqual(toIPv6(340282366841710300949110269838224261120n), "ffff:ffff::");
    assert.strictEqual(fromIPv6("ffff:ffff::"), 340282366841710300949110269838224261120n);
  });

  test("should handle zero", () => {
    assert.strictEqual(toIPv6(0n), "::");
    assert.strictEqual(fromIPv6("::"), 0n);
  });

  test("should handle leading zeros", () => {
    assert.strictEqual(fromIPv6("0000:0000:0000:0000:0000:0000:0000:0001"), 1n);
    assert.strictEqual(toIPv6(1n), "::1");
  });

  describe("errors", () => {
    test("invalid format", () => {
      assert.throws(() => fromIPv6("2001:4860::z888"));
      assert.throws(() => fromIPv6("abcd"));
      assert.throws(() => fromIPv6("1200::AB00::BA0"));
      assert.throws(() => fromIPv6("::1::"));
    });

    test("out of range", () => {
      const max = BigInt("340282366920938463463374607431768211455");
      assert.throws(() => toIPv6(max + 1n));
      assert.throws(() => fromIPv6("340282366920938463463374607431768211456"));
    });

    test("negative values", () => {
      assert.throws(() => toIPv6(-1n));
      assert.throws(() => fromIPv6("-1"));
    });

    test("invalid structure", () => {
      assert.throws(() => fromIPv6("2001:4860"));
      assert.throws(() => fromIPv6("::1::"));
      assert.throws(() => fromIPv6("2001:4860:4860:::8888"));
      assert.throws(() => fromIPv6(":2001:4860:4860::8888"));
    });

    test("malformed input", () => {
      assert.throws(() => fromIPv6("2001:4860:4860::8888::"));
      assert.throws(() => fromIPv6("2001:4860:4860::8888:"));
      assert.throws(() => fromIPv6("2001:4860:4860::8888:zzzz"));
      assert.throws(() => fromIPv6("2001:4860:4860::8888:12345"));
      assert.throws(() => fromIPv6("2001:4860g:4860:0000:8888:8888:3333::"));
    });

    test("invalid types", () => {
      assert.throws(() => fromIPv6(123));
      assert.throws(() => fromIPv6({}));
      assert.throws(() => fromIPv6([]));
      assert.throws(() => fromIPv6(null));
      assert.throws(() => fromIPv6(undefined));
    });

    test("invalid toipv6 input", () => {
      assert.throws(() => toIPv6(true));
    });
  });
});
