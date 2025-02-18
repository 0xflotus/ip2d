import pluginJs from "@eslint/js";
import eslintPluginHexUnder from "eslint-plugin-hex-under";
import tseslint from "typescript-eslint";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
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
