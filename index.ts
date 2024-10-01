import { isIPv6 } from "net";

type IPv6Address = string;

/**
 * Converts an IPv6 address string to a BigInt.
 * @param str - A valid IPv6 address as a string.
 * @returns The IPv6 address as a BigInt.
 * @throws Error if the input is not a valid IPv6 address.
 */
export const fromIPv6 = (str: IPv6Address): bigint => {
  if (!isIPv6(str)) {
    throw new Error("str should be a valid IPv6 address.");
  }

  const sections = str.split(":");

  // Handle IPv6 abbreviation (::) by filling in the appropriate number of zeros
  const emptySectionIndex = sections.indexOf("");
  if (emptySectionIndex !== -1) {
    const numZeros = 8 - sections.length + 1;
    sections.splice(emptySectionIndex, 1, ...new Array(numZeros).fill("0"));
  }

  return sections.reduce((acc: bigint, section: string) => {
    return (acc << 16n) + BigInt(parseInt(section || "0", 16));
  }, 0n);
};

/**
 * Converts a BigInt back to an IPv6 address string.
 * @param num - A BigInt representing the IPv6 address.
 * @returns The IPv6 address as a string.
 */
export const toIPv6 = (num: bigint): IPv6Address => {
  const sections = [];

  for (let i = 0; i < 8; i++) {
    sections.unshift(((num >> BigInt(i * 16)) & 0xFFFFn).toString(16));
  }

  // Rebuilds the address while collapsing any consecutive sections of 0 into "::"
  const ipv6 = sections.join(":").replace(/(^|:)0(:0)*(:|$)/, "::").replace(/:{3,}/, "::");

  return ipv6;
};
