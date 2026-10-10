import t from "tap";
import { fromIPv4, fromIPv6, toIPv4, toIPv6 } from "./dist/index.js";

t.test("ipv4", (t) => {
  t.test("should convert back and forth", (t) => {
    t.equal(fromIPv4(toIPv4(1)), 1);
    t.equal(toIPv4(fromIPv4("44.2.4.0")), "44.2.4.0");
    t.equal(toIPv4(fromIPv4(toIPv4(fromIPv4("44.2.4.0")))), "44.2.4.0");
    t.end();
  });

  t.test("should convert number to ip", (t) => {
    t.equal(toIPv4(2130706433), "127.0.0.1");
    t.equal(toIPv4(151587081), "9.9.9.9");
    t.end();
  });

  t.test("should convert ip to number", (t) => {
    t.equal(fromIPv4("127.0.0.1"), 2130706433);
    t.equal(fromIPv4("9.9.9.9"), 151587081);
    t.equal(fromIPv4("9.9.9.8"), 151587080);
    t.end();
  });

  t.test("should support arithmetic", (t) => {
    t.equal(fromIPv4("10.10.3.2") + 12, fromIPv4("10.10.3.14"));
    t.equal(toIPv4(fromIPv4("3.5.22.9") + 4), "3.5.22.13");
    t.equal(toIPv4(fromIPv4("3.5.22.255") + 22), "3.5.23.21");
    t.end();
  });

  t.test("should handle boundaries", (t) => {
    t.equal(toIPv4(0), "0.0.0.0");
    t.equal(fromIPv4("0.0.0.0"), 0);
    t.equal(fromIPv4("128.0.0.0"), 2147483648);
    t.equal(fromIPv4("200.0.0.1"), 3355443201);
    t.equal(toIPv4(fromIPv4("200.0.0.1")), "200.0.0.1");
    t.equal(fromIPv4("255.255.255.255"), 4294967295);
    t.equal(toIPv4(4294967295), "255.255.255.255");
    t.end();
  });

  t.test("should handle hex values", (t) => {
    t.equal(toIPv4(0xffffffff), "255.255.255.255");
    t.equal(toIPv4(0x09090908), "9.9.9.8");
    t.equal(toIPv4(0x09090909), "9.9.9.9");
    t.end();
  });

  t.test("errors", (t) => {
    t.test("invalid format", (t) => {
      t.throws(() => fromIPv4("999.999.999.999"));
      t.throws(() => fromIPv4("abcd"));
      t.throws(() => fromIPv4("192.168.0.256"));
      t.throws(() => fromIPv4("192.168.-1.1"));
      t.end();
    });

    t.test("invalid structure", (t) => {
      t.throws(() => fromIPv4("192.168"));
      t.throws(() => fromIPv4("255.255"));
      t.throws(() => fromIPv4("192.168.0.252.11"));
      t.throws(() => fromIPv4("192.168.abc.1"));
      t.end();
    });

    t.test("invalid types", (t) => {
      t.throws(() => fromIPv4(123));
      t.throws(() => fromIPv4({}));
      t.throws(() => fromIPv4([]));
      t.throws(() => fromIPv4(null));
      t.throws(() => fromIPv4(undefined));
      t.end();
    });

    t.test("invalid toipv4 input", (t) => {
      t.throws(() => toIPv4(true));
      t.throws(() => toIPv4(-2));
      t.throws(() => toIPv4(-100));
      t.throws(() => toIPv4(NaN));
      t.throws(() => toIPv4(Infinity));
      t.throws(() => toIPv4(1.5));
      t.end();
    });
    t.end();
  });
  t.end();
});

t.test("ipv6", (t) => {
  t.test("should convert from ipv6 to bigint", (t) => {
    t.equal(fromIPv6("::1"), 1n);
    t.equal(fromIPv6("21da:d4::2f4c:2bc:ff:fe18:4c5a"), 44996461372433492606259129078766914650n);
    t.equal(fromIPv6("2001:4860:4860::8888"), 42541956123769884636017138956568135816n);
    t.end();
  });

  t.test("should parse IPv4-embedded IPv6 addresses", (t) => {
    t.equal(fromIPv6("::ffff:192.0.2.1"), (0xffffn << 32n) | 0xc0000201n);
    t.equal(fromIPv6("2001:db8::192.0.2.1"), (0x20010db8n << 96n) | 0xc0000201n);
    t.end();
  });

  t.test("should convert bigint to ipv6", (t) => {
    t.equal(toIPv6(1n), "::1");
    t.equal(toIPv6(44996461372433492606259129078766914650n), "21da:d4::2f4c:2bc:ff:fe18:4c5a");
    t.equal(toIPv6(42541956123769884636017138956568135816n), "2001:4860:4860::8888");
    t.end();
  });

  t.test("should handle max values", (t) => {
    t.equal(toIPv6(2n ** 128n - 1n), "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff");
    t.equal(
      fromIPv6("ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff"),
      340282366920938463463374607431768211455n,
    );
    t.end();
  });

  t.test("should handle compressed forms", (t) => {
    t.equal(toIPv6(340282366841710300967557013911933812735n), "ffff:ffff::ffff:ffff:ffff:ffff");
    t.equal(toIPv6(340282366841710300949110269838224261120n), "ffff:ffff::");
    t.equal(fromIPv6("ffff:ffff::"), 340282366841710300949110269838224261120n);
    t.end();
  });

  t.test("should handle zero", (t) => {
    t.equal(toIPv6(0n), "::");
    t.equal(fromIPv6("::"), 0n);
    t.end();
  });

  t.test("should handle leading zeros", (t) => {
    t.equal(fromIPv6("0000:0000:0000:0000:0000:0000:0000:0001"), 1n);
    t.equal(toIPv6(1n), "::1");
    t.end();
  });

  t.test("errors", (t) => {
    t.test("invalid format", (t) => {
      t.throws(() => fromIPv6("2001:4860::z888"));
      t.throws(() => fromIPv6("abcd"));
      t.throws(() => fromIPv6("1200::AB00::BA0"));
      t.throws(() => fromIPv6("::1::"));
      t.end();
    });

    t.test("out of range", (t) => {
      const max = BigInt("340282366920938463463374607431768211455");
      t.throws(() => toIPv6(max + 1n));
      t.throws(() => fromIPv6("340282366920938463463374607431768211456"));
      t.end();
    });

    t.test("negative values", (t) => {
      t.throws(() => toIPv6(-1n));
      t.throws(() => fromIPv6("-1"));
      t.end();
    });

    t.test("invalid structure", (t) => {
      t.throws(() => fromIPv6("2001:4860"));
      t.throws(() => fromIPv6("::1::"));
      t.throws(() => fromIPv6("2001:4860:4860:::8888"));
      t.throws(() => fromIPv6(":2001:4860:4860::8888"));
      t.end();
    });

    t.test("malformed input", (t) => {
      t.throws(() => fromIPv6("2001:4860:4860::8888::"));
      t.throws(() => fromIPv6("2001:4860:4860::8888:"));
      t.throws(() => fromIPv6("2001:4860:4860::8888:zzzz"));
      t.throws(() => fromIPv6("2001:4860:4860::8888:12345"));
      t.throws(() => fromIPv6("2001:4860g:4860:0000:8888:8888:3333::"));
      t.end();
    });

    t.test("invalid types", (t) => {
      t.throws(() => fromIPv6(123));
      t.throws(() => fromIPv6({}));
      t.throws(() => fromIPv6([]));
      t.throws(() => fromIPv6(null));
      t.throws(() => fromIPv6(undefined));
      t.end();
    });

    t.test("invalid toipv6 input", (t) => {
      t.throws(() => toIPv6(true));
      t.end();
    });
    t.end();
  });
  t.end();
});
