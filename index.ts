import { isIPv4, isIPv6 } from "net";

type IPv6Address = string;
type IPv4Address = string;

class InvalidIPAddressError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidIPAddressError";
  }
}

class TypeMismatchError extends Error {
  constructor(expectedType: string, receivedType: string) {
    super(`Expected type '${expectedType}', but received type '${receivedType}'.`);
    this.name = "TypeMismatchError";
  }
}

/**
 * Converts an IPv4 address string to a number.
 * @param str - A valid IPv4 address as a string.
 * @returns The IPv4 address as a number.
 * @throws InvalidIPAddressError if the input is not a valid IPv4 address.
 * @throws TypeMismatchError if the input is not a string.
 */
export const fromIPv4 = (str: IPv4Address): number => {
  if (typeof str !== "string") {
    throw new TypeMismatchError("string", typeof str);
  }

  // Normalize by removing leading zeros from each octet
  const normalized = str.split(".").map(octet => String(Number(octet))).join(".");

  if (!isIPv4(normalized)) {
    throw new InvalidIPAddressError(`"${str}" is not a valid IPv4 address.`);
  }

  const parts = normalized.split(".").map(Number);

  if (parts.length !== 4 || parts.some(part => isNaN(part) || part < 0 || part > 255)) {
    throw new InvalidIPAddressError(`"${str}" must consist of 4 octets, each between 0 and 255.`);
  }

  return parts.reduce((a: number, b: number) => (a << 8) | b);
};

/**
 * Converts a number back to an IPv4 address string.
 * @param num - A number representing the IPv4 address.
 * @returns The IPv4 address as a string.
 * @throws TypeMismatchError if the input is not a number.
 * @throws InvalidIPAddressError if the input number is out of range.
 */
export const toIPv4 = (num: number): IPv4Address => {
  if (typeof num !== "number") {
    throw new TypeMismatchError("number", typeof num);
  }
  if (num < -1 || num > 0xFFFFFFFF) {
    throw new InvalidIPAddressError(`"${num}" is not a valid IPv4 number. It must be between 0 and 4294967295.`);
  }
  if (num === -1) {
    return "255.255.255.255";
  }
  return [24, 16, 8, 0].map((shift: number) => (num >> shift) & 0xFF).join(".");
};

/**
 * Converts an IPv6 address string to a BigInt.
 * @param str - A valid IPv6 address as a string.
 * @returns The IPv6 address as a BigInt.
 * @throws InvalidIPAddressError if the input is not a valid IPv6 address.
 * @throws TypeMismatchError if the input is not a string.
 */
export const fromIPv6 = (str: IPv6Address): bigint => {
  if (typeof str !== "string") {
    throw new TypeMismatchError("string", typeof str);
  }
  if (!isIPv6(str)) {
    throw new InvalidIPAddressError(`"${str}" is not a valid IPv6 address.`);
  }

  let sections = str.split(":");
  if (str.includes("::")) {
    const [left, right] = str.split("::");
    const leftSections = left ? left.split(":") : [];
    const rightSections = right ? right.split(":") : [];
    const missingZeros = 8 - (leftSections.length + rightSections.length);
    sections = [...leftSections, ...Array(missingZeros).fill("0"), ...rightSections];
  }

  if (sections.length !== 8) {
    throw new InvalidIPAddressError(`"${str}" does not represent a valid IPv6 address.`);
  }

  const result = sections.reduce((acc: bigint, section: string) => {
    const trimmedSection = section.replace(/^0+/, "") || "0";
    if (!/^[0-9a-fA-F]{1,4}$/.test(trimmedSection)) {
      throw new InvalidIPAddressError(`"${section}" is not a valid IPv6 section.`);
    }
    return (acc << 16n) + BigInt(parseInt(trimmedSection, 16));
  }, 0n);

  const maxIPv6Value = BigInt("340282366920938463463374607431768211455"); // 2^128 - 1
  if (result > maxIPv6Value) {
    throw new InvalidIPAddressError(`"${result}" exceeds the IPv6 address range.`);
  }

  return result;
};

/**
 * Converts a BigInt back to an IPv6 address string.
 * @param num - A BigInt representing the IPv6 address.
 * @returns The IPv6 address as a string.
 * @throws TypeMismatchError if the input is not a BigInt.
 */
export const toIPv6 = (num: bigint): IPv6Address => {
  if (typeof num !== "bigint") {
    throw new TypeMismatchError("bigint", typeof num);
  }

  const maxIPv6Value = BigInt("340282366920938463463374607431768211455"); // 2^128 - 1
  if (num < 0n || num > maxIPv6Value) {
    throw new InvalidIPAddressError(`"${num}" is out of the valid IPv6 range.`);
  }

  const sections = [];
  for (let i = 0; i < 8; i++) {
    sections.unshift(((num >> BigInt(i * 16)) & 0xFFFFn).toString(16));
  }

  const ipv6 = sections.join(":").replace(/(^|:)0(:0)*(:|$)/, "::").replace(/:{3,}/, "::");
  return ipv6;
};
