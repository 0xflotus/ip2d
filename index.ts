import { isIPv4 } from "net";

type IPAddress = string;

export const from_str = (str: IPAddress): number => {
  if (!isIPv4(str)) {
    throw new Error("str should be a valid IPv4 address.");
  }
  return str
    .split(".")
    .map(Number)
    .reduce((a: number, b: number) => (a << 8) | b);
}

export const to_str = (num: number): IPAddress => {
  return [24, 16, 8, 0].map((a: number) => (num >> a) & 0xff).join(".");
}
