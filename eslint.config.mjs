import pluginJs from "@eslint/js";
import deMorgan from "eslint-plugin-de-morgan";
import hexUnder from "eslint-plugin-hex-under";

export default [
  pluginJs.configs.recommended,
  deMorgan.configs.recommended,
  {
    plugins: {
      "hex-under": hexUnder,
    },
    rules: {
      "hex-under/hex-under": ["warn", { limit: 255 }],
      "hex-under/hex-under-bigint": "warn",
    },
  },
];
