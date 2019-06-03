type IPAddress = string;

function from_str(str: IPAddress): number {
  return str
    .split(".")
    .map(Number)
    .reduce((a: number, b: number) => (a << 8) | b);
}

function to_str(num: number): IPAddress {
  return [24, 16, 8, 0].map((a: number) => (num >> a) & 0xff).join(".");
}

export = {
  from_str,
  to_str
};
