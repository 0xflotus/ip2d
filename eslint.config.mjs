import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.ts"],
    ignores: ["**/*.js"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
