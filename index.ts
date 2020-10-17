import { isIPv4 } from "net";

type IPAddress = string;

export const from_str = (str: IPAddress): number => {
  if (!isIPv4(str)) {
    throw new Error("str should be a valid IPv4 address.");
  }
  return str
    .split(".")
    .map(Number)
    .reduce((a: number, b: number) => (a << 0x8) | b);
}

export const to_str = (num: number): IPAddress => {
  return [0x18, 0x10, 0x8, 0x0].map((a: number) => (num >> a) & 0xff).join(".");
}
