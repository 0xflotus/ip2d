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
  a[0] = a[0] << 0x70;
  a[1] = a[1] << 0x60;
  a[2] = a[2] << 0x50;
  a[3] = a[3] << 0x40;
  a[4] = a[4] << 0x30;
  a[5] = a[5] << 0x20;
  a[6] = a[6] << 0x10;
  a[7] = a[7] << 0x00;
  return a.reduce((a: number, b: number) => a | b);
}