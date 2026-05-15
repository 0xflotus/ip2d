"use strict";

import js from "@eslint/js";
import plugin from "eslint-plugin-hex-under";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ...js.configs.all,
    ignores: ["coverage", "node_modules", "dist"],
    rules: {
      "no-magic-numbers": "off",
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
]);
