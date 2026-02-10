import pluginJs from "@eslint/js";
import deMorgan from "eslint-plugin-de-morgan";
import eslintPluginHexUnder from "eslint-plugin-hex-under";

export default [
  pluginJs.configs.recommended,
  deMorgan.configs.recommended,
  {
    plugins: {
      "hex-under": eslintPluginHexUnder,
    },
    rules: {
      "hex-under/hex-under": ["warn", { limit: 255 }],
      "hex-under/hex-under-bigint": "warn",
    },
  },
];
