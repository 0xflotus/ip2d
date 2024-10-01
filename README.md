## ip2d
[![Known Vulnerabilities](https://snyk.io/test/github/0xflotus/ip2d/badge.svg?targetFile=package.json)](https://snyk.io/test/github/0xflotus/ip2d?targetFile=package.json)
[![npm version](https://badge.fury.io/js/ip2d.svg)](https://badge.fury.io/js/ip2d)

It's a simple lightweight zero cost library to convert an IP address to a decimal value and vice versa.

### Usage

```javascript
const { fromIPv4, toIPv4, fromIPv6, toIPv6} = require("ip2d");

console.log(fromIPv4("127.0.0.1")); // --> 2130706433

console.log(toIPv4(2130706433)); // --> 127.0.0.1

console.log(fromIPv6("::1")); // --> 1

console.log(toIPv6(BigInt(1))); // --> ::1
```


## Stargazers over time

[![Stargazers over time](https://starchart.cc/0xflotus/ip2d.svg)](https://starchart.cc/0xflotus/ip2d)
