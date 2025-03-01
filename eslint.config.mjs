import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import globals from "globals";
import * as tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/cdk.out", "**/build/*", "**/dist/*", "**/*.js"],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:prettier/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "plugin:@typescript-eslint/recommended",
    ),
  ),
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },

    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ".",
        },
      },
    },

    rules: {
      "lines-between-class-members": [
        "error",
        "always",
        { exceptAfterSingleLine: true },
      ],

      "prettier/prettier": [
        "error",
        {
          insertPragma: false,
          requirePragma: false,
        },
      ],

      "max-len": [
        "error",
        {
          code: 130,
        },
      ],

      "no-undef": "error",
      curly: "error",
      "@typescript-eslint/no-unused-vars": ["error"],

      "@typescript-eslint/no-namespace": [
        "error",
        {
          allowDeclarations: true,
        },
      ],

      "import/namespace": "warn",

      "import/order": [
        "error",
        {
          groups: ["builtin", "external", ["sibling", "parent"], "index"],
        },
      ],

      "object-curly-spacing": ["error", "always"],
      "object-shorthand": ["warn", "properties"],
    },
  },
];
