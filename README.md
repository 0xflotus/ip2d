# ip2d

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![Known Vulnerabilities](https://snyk.io/test/github/0xflotus/ip2d/badge.svg?targetFile=package.json)](https://snyk.io/test/github/0xflotus/ip2d?targetFile=package.json)
[![npm version](https://badge.fury.io/js/ip2d.svg)](https://badge.fury.io/js/ip2d)

`ip2d` is a lightweight JavaScript library designed to convert IP addresses (both IPv4 and IPv6) and their numeric equivalents. It offers zero-cost conversions between IP address formats, making it ideal for performance-sensitive applications.

## Features
- Convert IPv4 to Decimal
- Convert Decimal to IPv4
- Convert IPv6 to BigInt
- Convert BigInt to IPv6

## Installation

Install via npm:

```bash
npm install ip2d
```


## Usage Examples
# Basic IPv4 to Decimal Conversion
Convert an IPv4 address to its decimal form:

```javascript
const { from, to } = require("ip2d");

console.log(from("127.0.0.1")); // Output: 2130706433
```
# Basic Decimal to IPv4 Conversion
Convert a decimal number back to an IPv4 address:

```javascript
console.log(to(2130706433)); // Output: "127.0.0.1"
```

# IPv6 to BigInt Conversion
Convert an IPv6 address string into a BigInt:

```typescript
import { fromIPv6 } from "ip2d";
const bigIntValue = fromIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
console.log(bigIntValue);  // Output: A BigInt representation of the IPv6 address
```

# BigInt to IPv6 Conversion
Convert a BigInt back into an IPv6 address string:

```typescript
import { toIPv6 } from "ip2d";

const ipv6Address = toIPv6(BigInt("42540766411282592856906245548098208148"));
console.log(ipv6Address);  // Output: "2001:db8:85a3::8a2e:370:7334"
```

## Code Implementation
The primary functions responsible for the library's functionality are defined in ==index.ts==.

# IPv4 Conversion Functions
`from()`:

    -Converts an IPv4 address (like 127.0.0.1) into a decimal (like 2130706433).
    -This function splits the IP address by dots, processes each part as an integer, and combines them into a single 32-bit integer.
`to()`:

    -Converts a decimal number back into an IPv4 address.
    -The function works by reversing the process, splitting the 32-bit integer into four 8-bit segments and formatting it as an IPv4 string.

```javascript
export const from = (ip: string): number => {
  return ip.split('.')
           .map(Number)
           .reduce((acc, octet) => (acc << 8) + octet);
};

export const to = (num: number): string => {
  return [(num >> 24) & 255, (num >> 16) & 255, (num >> 8) & 255, num & 255].join('.');
};
```
## IPv6 Conversion Functions
`fromIPv6()`:

    -Converts an IPv6 address string (like 2001:0db8:85a3:0000:0000:8a2e:0370:7334) into a BigInt.
    -The string is split into hexadecimal sections, which are then combined into a 128-bit integer.
`toIPv6()`:

    -Converts a BigInt back into an IPv6 address.
    -This function splits the 128-bit integer into eight 16-bit segments, formats them as hexadecimal, and joins them to form the final IPv6 string.
```typescript
import { isIPv6 } from "net";

type IPv6Address = string;

/**
 * Converts an IPv6 address string to a BigInt.
 * @param str - A valid IPv6 address as a string.
 * @returns The IPv6 address as a BigInt.
 * @throws Error if the input is not a valid IPv6 address.
 */
export const fromIPv6 = (str: IPv6Address): bigint => {
  if (!isIPv6(str)) {
    throw new Error("str should be a valid IPv6 address.");
  }

  const sections = str.split(":");

  // Handle IPv6 abbreviation (::) by filling in the appropriate number of zeros
  const emptySectionIndex = sections.indexOf("");
  if (emptySectionIndex !== -1) {
    const numZeros = 8 - sections.length + 1;
    sections.splice(emptySectionIndex, 1, ...new Array(numZeros).fill("0"));
  }

  return sections.reduce((acc: bigint, section: string) => {
    return (acc << 16n) + BigInt(parseInt(section || "0", 16));
  }, 0n);
};

/**
 * Converts a BigInt back to an IPv6 address string.
 * @param num - A BigInt representing the IPv6 address.
 * @returns The IPv6 address as a string.
 */
export const toIPv6 = (num: bigint): IPv6Address => {
  const sections = [];

  for (let i = 0; i < 8; i++) {
    sections.unshift(((num >> BigInt(i * 16)) & 0xFFFFn).toString(16));
  }

  // Rebuilds the address while collapsing any consecutive sections of 0 into "::"
  const ipv6 = sections.join(":").replace(/(^|:)0(:0)*(:|$)/, "::").replace(/:{3,}/, "::");

  return ipv6;
};
```

## Package Configuration
The repository includes several configuration files for project management and testing.

`package.json`
This file contains the configuration of the package, including the metadata, scripts for building and testing, and dependencies.

-Scripts:

    -build: Compiles TypeScript code using tsc.
    -test: Runs unit tests using Jest.
    -lint: Runs tslint on the TypeScript code.
    -size: Checks the size of the JavaScript bundle using bundlesize.
-Dependencies:

    -TypeScript, TSLint, Jest, and various tools for managing package size.
```json
{
  "name": "ip2d",
  "version": "1.2.1",
  "main": "index.js",
  "author": "0xflotus",
  "repository": {
    "type": "git",
    "url": "https://github.com/0xflotus/ip2d.git"
  },
  "scripts": {
    "build": "tsc index.ts",
    "test": "jest test.ts",
    "lint": "tslint index.ts",
    "size": "bundlesize --files index.js --max-size 1kb"
  },
  "devDependencies": {
    "typescript": "5.6.2",
    "jest": "29.7.0",
    "bundlesize": "0.18.2",
    "tslint": "6.1.3"
  }
}
```
### TypeScript Configuration (tsconfig.json)
The `tsconfig.json` file specifies the TypeScript compiler options, including the target language, module type, and output directory.

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}
```
## Jest Testing Configuration
Jest is configured to run tests with coverage collection and strict thresholds:

```json
"jest": {
  "verbose": true,
  "collectCoverage": true,
  "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 0
    }
  }
}
```
## Security Considerations
The repository includes a `SECURITY.md` file for reporting vulnerabilities. The project also integrates with Snyk for checking known vulnerabilities in dependencies.

```bash
[![Known Vulnerabilities](https://snyk.io/test/github/0xflotus/ip2d/badge.svg?targetFile=package.json)](https://snyk.io/test/github/0xflotus/ip2d?targetFile=package.json)
```
## License
This library is licensed under the MIT License, allowing you to use, modify, and distribute the code with minimal restrictions.

You can view the full license here.

## Stargazers over time

[![Stargazers over time](https://starchart.cc/0xflotus/ip2d.svg)](https://starchart.cc/0xflotus/ip2d)

This README includes detailed documentation and usage instructions for the `ip2d` library.









