import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,   // allow process, __dirname, etc.
        ...globals.jest    // allow describe, it, expect
      }
    },
    plugins: { js },
    rules: {
      // add custom rules here if needed
    },
    extends: ["js/recommended"]
  }
]);
