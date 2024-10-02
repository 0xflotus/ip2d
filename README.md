# ip2d

[![Known Vulnerabilities](https://snyk.io/test/github/0xflotus/ip2d/badge.svg?targetFile=package.json)](https://snyk.io/test/github/0xflotus/ip2d?targetFile=package.json)
[![npm version](https://badge.fury.io/js/ip2d.svg)](https://badge.fury.io/js/ip2d)

`ip2d` is a lightweight JavaScript library designed to convert IP addresses (both IPv4 and IPv6) and their numeric equivalents. It offers zero-cost conversions between IP address formats, making it ideal for performance-sensitive applications.

## Features

* Convert IPv4 to Decimal
* Convert Decimal to IPv4
* Convert IPv6 to BigInt
* Convert BigInt to IPv6

## Installation

Install via npm:

```bash
npm install ip2d
```

## Usage Examples

### Basic IPv4 to Decimal Conversion

Convert an IPv4 address to its decimal form:

```javascript
const { fromIPv4 } = require("ip2d");

console.log(fromIPv4("127.0.0.1")); // Output: 2130706433
```

### Basic Decimal to IPv4 Conversion

Convert a decimal number back to an IPv4 address:

```javascript
const { toIPv4 } = require("ip2d");

console.log(toIPv4(2130706433)); // Output: "127.0.0.1"
```

### IPv6 to BigInt Conversion

Convert an IPv6 address string into a BigInt:

```typescript
import { fromIPv6 } from "ip2d";

const bigIntValue = fromIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334");

console.log(bigIntValue);  // Output: A BigInt representation of the IPv6 address
```

### BigInt to IPv6 Conversion

Convert a BigInt back into an IPv6 address string:

```typescript
import { toIPv6 } from "ip2d";

const ipv6Address = toIPv6(BigInt("42540766411282592856906245548098208148"));

console.log(ipv6Address);  // Output: "2001:db8:85a3::8a2e:370:7334"
```

## Security Considerations

The repository includes a `SECURITY.md` file for reporting vulnerabilities. The project also integrates with Snyk for checking known vulnerabilities in dependencies.

## License

This library is licensed under the MIT License, allowing you to use, modify, and distribute the code with minimal restrictions.

You can view the full license [here](./LICENSE).

## Stargazers over time

[![Stargazers over time](https://starchart.cc/0xflotus/ip2d.svg)](https://starchart.cc/0xflotus/ip2d)








