## ip2d

### Usage

```javascript
const {from_str, to_str} = require("ip2d");

console.log(from_str("127.0.0.1")); // --> 2130706433

console.log(to_str(2130706433)); // --> 127.0.0.1
```