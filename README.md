## ip2d

It's a simple lightweight zero cost library to convert an IP address to a decimal value and vice versa.

### Usage

```javascript
const {from_str, to_str} = require("ip2d");

console.log(from_str("127.0.0.1")); // --> 2130706433

console.log(to_str(2130706433)); // --> 127.0.0.1
```
