function from_str(str) {
  return str
    .split(".")
    .map(Number)
    .reduce((a, b) => (a << 8) | b);
}

function to_str(num) {
  return [24, 16, 8, 0].map(a => (parseInt(num, 10) >> a) & 0xff).join(".");
}

module.exports = {
  from_str,
  to_str
};
