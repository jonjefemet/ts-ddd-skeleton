import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...compat.extends( "eslint:recommended", "plugin:@typescript-eslint/recommended" ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint
    },
    languageOptions: {
      globals: {
        ...globals.node
      },
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "@typescript-eslint/no-empty-interface": "off",
      quotes: [
        "error", "double", {
          allowTemplateLiterals: true
        }
      ],
      "space-infix-ops": [
        "error", {
          int32Hint: false
        }
      ],
      "block-spacing": "off",
      "space-unary-ops": [
        "error"
      ],
      "no-mixed-spaces-and-tabs": "error",
      "space-before-function-paren": [
        "error", "always"
      ],
      "no-trailing-spaces": "error",
      "space-in-parens": [
        "error", "always", {
          exceptions: [
            "{}", "[]", "()", "empty"
          ]
        }
      ],
      "space-before-blocks": "error",
      "comma-spacing": [
        "error", {
          before: false,
          after: true
        }
      ],
      "key-spacing": [
        "error", {
          beforeColon: false,
          afterColon: true
        }
      ],
      "no-multi-spaces": [
        "error", {
          ignoreEOLComments: true
        }
      ],
      "spaced-comment": [
        "error", "always", {
          line: {
            markers: [
              "/"
            ],
            exceptions: [
              "-", "+"
            ]
          },
          block: {
            markers: [
              "!"
            ],
            exceptions: [
              "*"
            ],
            balanced: true
          }
        }
      ],
      "array-bracket-spacing": [
        "error", "always"
      ],
      "array-element-newline": [
        "error", {
          ArrayExpression: "consistent",
          ArrayPattern: {
            minItems: 2
          }
        }
      ],
      "array-bracket-newline": [
        "error", {
          minItems: 1
        }
      ],
      "object-property-newline": [
        "error", {
          allowAllPropertiesOnSameLine: false
        }
      ],
      "object-curly-spacing": [
        "error", "always", {
          arraysInObjects: true,
          objectsInObjects: true
        }
      ],
      "object-curly-newline": [
        "error", {
          ObjectExpression: {
            minProperties: 2,
            multiline: true,
            consistent: true
          },
          ObjectPattern: {
            minProperties: 2,
            multiline: true,
            consistent: true
          },
          ImportDeclaration: "never",
          ExportDeclaration: "never"
        }
      ],
      indent: [
        "error", 2, {
          outerIIFEBody: 2
        }
      ],
      "padding-line-between-statements": [
        "error", {
          blankLine: "always",
          prev: "*",
          next: "return"
        }, {
          blankLine: "always",
          prev: "if",
          next: "*"
        }, {
          blankLine: "always",
          prev: "*",
          next: "if"
        }, {
          blankLine: "always",
          prev: "for",
          next: "*"
        }, {
          blankLine: "always",
          prev: "*",
          next: "for"
        }, {
          blankLine: "always",
          prev: "function",
          next: "function"
        }, {
          blankLine: "never",
          prev: "expression",
          next: "expression"
        }
      ],
      "brace-style": "error",
      "no-empty-pattern": "error",
      "keyword-spacing": "error",
      "no-multiple-empty-lines": [
        "error", {
          max: 1,
          maxBOF: 0,
          maxEOF: 0
        }
      ],
      "multiline-ternary": [
        "error", "always"
      ],
      "comma-dangle": "error",
      "@typescript-eslint/array-type": [
        "error", {
          default: "array-simple"
        }
      ],
      "eslint-disable @typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-namespace": "off",
      "no-console": "error"
    }
  },
  {
    files: [
      "src/context/**/*.ts"
    ],
    ignores: [
      "**/*Types.ts", "**/SharedTypes.ts"
    ],
    rules: {
      "no-console": "off"
    }
  }
];