import pluginJs from "@eslint/js";
import eslintPluginHexUnder from "eslint-plugin-hex-under";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  pluginJs.configs.recommended,
  {
    plugins: {
      "hex-under": eslintPluginHexUnder,
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      "hex-under/hex-under": ["warn", { limit: 255 }],
      "hex-under/hex-under-bigint": "warn",
    },
  },
];