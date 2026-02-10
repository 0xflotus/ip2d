import pluginJs from "@eslint/js";
import deMorgan from "eslint-plugin-de-morgan";

export default [
  pluginJs.configs.recommended,
  deMorgan.configs.recommended,
];
