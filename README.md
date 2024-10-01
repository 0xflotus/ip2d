## ip2d
[![Known Vulnerabilities](https://snyk.io/test/github/0xflotus/ip2d/badge.svg?targetFile=package.json)](https://snyk.io/test/github/0xflotus/ip2d?targetFile=package.json)
[![npm version](https://badge.fury.io/js/ip2d.svg)](https://badge.fury.io/js/ip2d)

It's a simple lightweight zero cost library to convert an IP address to a decimal value and vice versa.

### Usage

```javascript
const {from, to} = require("ip2d");

console.log(from("127.0.0.1")); // --> 2130706433

console.log(to(2130706433)); // --> 127.0.0.1
```


## Stargazers over time

[![Stargazers over time](https://starchart.cc/0xflotus/ip2d.svg)](https://starchart.cc/0xflotus/ip2d)
