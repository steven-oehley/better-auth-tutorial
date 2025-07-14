// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import securityPlugin from "eslint-plugin-security";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import sortKeysFixPlugin from "eslint-plugin-sort-keys-fix";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // Global ignore patterns - NO .eslintignore file needed in flat config!
  {
    ignores: [
      // Build outputs
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      ".vercel/**",
      ".turbo/**",

      // Generated code
      "coverage/**",
      "prisma/generated/**",
      "src/generated/**",
      "generated/**",
      ".contentlayer/**",

      // Config files
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "tailwind.config.*",
      "postcss.config.*",

      // Cache and temporary files
      ".eslintcache",
      ".cache/**",
      "tmp/**",
      "temp/**",
      ".env*",

      // Package manager files
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",

      // Public assets
      "public/**",
    ],
  },

  // Next.js recommended configuration using compat
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),

  // Main configuration for all JS/TS files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
        runtime: "automatic",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          paths: ["src"],
        },
      },
      next: {
        rootDir: ".",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "@next/next": nextPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "sort-keys-fix": sortKeysFixPlugin,
      prettier: prettierPlugin,
      security: securityPlugin,
      sonarjs: sonarjsPlugin,
    },
    rules: {
      // ===== CORE ESLINT RULES =====
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-unused-vars": "off", // Handled by TypeScript
      "no-undef": "off", // Handled by TypeScript
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",

      // ===== TYPESCRIPT RULES =====
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // ===== REACT RULES =====
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // Using TypeScript
      "react/jsx-uses-react": "off", // Not needed in Next.js
      "react/jsx-uses-vars": "error",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": ["error", "never"],

      // ===== REACT HOOKS RULES =====
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ===== IMPORT ORGANIZATION =====
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports
            ["^\\u0000"],
            // Node.js builtins
            ["^node:"],
            // React and Next.js
            ["^react", "^react-dom", "^next"],
            // External packages
            ["^@?\\w"],
            // Internal packages (using @/ alias)
            ["^@/"],
            // Parent imports
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-unresolved": "error",
      "import/no-cycle": "error",

      // ===== ACCESSIBILITY RULES =====
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",

      // ===== NEXT.JS SPECIFIC RULES =====
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      "@next/next/no-unwanted-polyfillio": "error",
      "@next/next/no-page-custom-font": "error",

      // ===== SECURITY RULES =====
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-regexp": "warn",
      "security/detect-unsafe-regex": "error",

      // ===== CODE QUALITY RULES =====
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/no-duplicate-string": ["warn", { threshold: 3 }],
      "sonarjs/no-identical-functions": "error",
      "sonarjs/prefer-immediate-return": "error",

      // ===== OBJECT SORTING =====
      "sort-keys-fix/sort-keys-fix": "warn",

      // ===== PRETTIER INTEGRATION =====
      "prettier/prettier": [
        "error",
        {},
        {
          usePrettierrc: true,
          fileInfoOptions: {
            withNodeModules: false,
          },
        },
      ],
    },
  },

  // Specific rules for TypeScript files
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    },
  },

  // Configuration files
  {
    files: ["**/*.config.{js,ts,mjs}"],
    rules: {
      "import/no-default-export": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  // Test files
  {
    files: ["**/*.{test,spec}.{js,ts,jsx,tsx}", "**/__tests__/**/*"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "sonarjs/no-duplicate-string": "off",
    },
  },
];

export default eslintConfig;
