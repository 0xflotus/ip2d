import { isIPv4 } from "net";

type IPv4Address = string; 

export const from = (str: IPv4Address): number => {
  if (!isIPv4(str)) {
    throw new Error("str should be a valid IPv4 address.");
  }
  return str
    .split(".")
    .map(Number)
    .reduce((a: number, b: number) => (a << 0x08) | b);
}

export const to = (num: number): IPv4Address => {
  return [0x18, 0x10, 0x08, 0x00].map((a: number) => (num >> a) & 0xFF).join(".");
}
