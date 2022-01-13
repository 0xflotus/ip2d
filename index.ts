import { isIPv4, isIPv6 } from "net";
import { normalize } from 'ip6';

type IPAddress = string;
type IP6Address = string;

export const from = (str: IPAddress): number => {
  if (!isIPv4(str)) {
    throw new Error("str should be a valid IPv4 address.");
  }
  return str
    .split(".")
    .map(Number)
    .reduce((a: number, b: number) => (a << 0x8) | b);
}

export const to = (num: number): IPAddress => {
  return [0x18, 0x10, 0x8, 0x0].map((a: number) => (num >> a) & 0xff).join(".");
}

export const from6 = (str: IP6Address): number => {
  if (!isIPv6(str)) {
    throw new Error("str should be a valid IPv6 address.");
  }
  const a = normalize(str)
    .split(':')
    .map((hex: string) => Number(`0x${hex}`));
  a[0] = a[0] << 112;
  a[1] = a[1] << 96;
  a[2] = a[2] << 80;
  a[3] = a[3] << 64;
  a[4] = a[4] << 48;
  a[5] = a[5] << 32;
  a[6] = a[6] << 16;
  return a.reduce((a: number, b: number) => a | b);
}