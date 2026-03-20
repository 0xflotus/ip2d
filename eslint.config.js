"use strict";

import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import plugin from "eslint-plugin-hex-under";

export default [
  {
    ...js.configs.all,
    ignores: ["coverage", "node_modules", "dist"],
    rules: {
      "no-magic-numbers": "off",
    },
  },
  {
    files: ["*.test.js"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.all.rules,
      "vitest/require-to-throw-message": "off",
    },
  },
  {
    plugins: {
      "hex-under": plugin,
    },
    rules: {
      "hex-under/hex-under": [
        "warn",
        {
          limit: 255,
          skipBigInt: false,
        },
      ],
      "hex-under/octal-under": [
        "warn",
        {
          limit: 511,
          skipBigInt: false,
        },
      ],
      "hex-under/binary-under": [
        "warn",
        {
          limit: 15,
          skipBigInt: false,
        },
      ],
    },
  },
];
