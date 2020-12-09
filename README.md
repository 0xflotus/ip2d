## ip2d
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![Known Vulnerabilities](https://snyk.io/test/github/0xflotus/ip2d/badge.svg?targetFile=package.json)](https://snyk.io/test/github/0xflotus/ip2d?targetFile=package.json)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=0xflotus_ip2d&metric=alert_status)](https://sonarcloud.io/dashboard?id=0xflotus_ip2d)
[![Build Status](https://travis-ci.org/0xflotus/ip2d.svg?branch=master)](https://travis-ci.org/0xflotus/ip2d)
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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/0xflotus"><img src="https://avatars3.githubusercontent.com/u/26602940?v=4" width="100px;" alt="0xflotus"/><br /><sub><b>0xflotus</b></sub></a><br /><a href="https://github.com/0xflotus/ip2d/commits?author=0xflotus" title="Documentation">📖</a> <a href="https://github.com/0xflotus/ip2d/commits?author=0xflotus" title="Code">💻</a> <a href="https://github.com/0xflotus/ip2d/commits?author=0xflotus" title="Tests">⚠️</a> <a href="#projectManagement-0xflotus" title="Project Management">📆</a> <a href="#infra-0xflotus" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-0xflotus" title="Maintenance">🚧</a> <a href="#platform-0xflotus" title="Packaging/porting to new platform">📦</a> <a href="#security-0xflotus" title="Security">🛡️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
