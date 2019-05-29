## ip2d
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

It's a simple lightweight zero cost library to convert an IP address to a decimal value and vice versa.

### Usage

```javascript
const {from_str, to_str} = require("ip2d");

console.log(from_str("127.0.0.1")); // --> 2130706433

console.log(to_str(2130706433)); // --> 127.0.0.1
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/0xflotus"><img src="https://avatars3.githubusercontent.com/u/26602940?v=4" width="100px;" alt="0xflotus"/><br /><sub><b>0xflotus</b></sub></a><br /><a href="https://github.com/0xflotus/ip2d/commits?author=0xflotus" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!