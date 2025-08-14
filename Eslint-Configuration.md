# Configuring ESLint with TypeScript and Express

Configuring ESLint with TypeScript and Express ensures proper linting and code quality in your project. Follow these steps to set up your environment effectively.


## 1\. Initialize the Project and Install Dependencies

First, initialize a new Node.js project and install the necessary packages.

```bash
npm init -y
npm install express
npm install --save-dev typescript @types/node @types/express
npm install --save-dev eslint @eslint/js typescript-eslint
```


## 2\. Configure TypeScript

Generate a `tsconfig.json` file and adjust it for your project's needs.

```bash
npx tsc --init
```

**Adjust `tsconfig.json`** as needed for your project, including `rootDir`, `outDir`, `strict` mode, and `esModuleInterop`. A common configuration might look like this:

```json
{
  "compilerOptions": {
    "target": "es2021",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileName": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```


## 3\. Configure ESLint

Create an ESLint configuration file. The new flat config system (`eslint.config.mjs`) is recommended, but the legacy system (`.eslintrc.cjs`) is also an option.

### For `eslint.config.mjs` (Recommended)

Create `eslint.config.mjs` in your project root:

```javascript
// eslint.config.mjs
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsparser,
      sourceType: "module",
    },

    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
    },

    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "prettier/prettier": "error",
    },
  },
];
```

## 4\. Add Linting Scripts (Optional but Recommended)

Add these scripts to your `package.json` to easily run ESLint from the command line:

```json
"scripts": {
  "lint": "eslint . --ext .ts",
  "lint:fix": "eslint . --ext .ts --fix"
}
```

Now you can run `npm run lint` to check your code and `npm run lint:fix` to automatically fix issues.


## 5\. Integrate with Prettier (Optional)

For consistent code formatting, integrate Prettier with ESLint.

Install Prettier and its ESLint integration:

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

Create a **`.prettierrc`** file for Prettier configuration (e.g., in JSON or YAML format):

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

Finally, **add `plugin:prettier/recommended`** to your ESLint configuration's `extends` array to integrate Prettier rules.

**For `eslint.config.mjs`:**

```javascript
// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig, // Integrates Prettier rules
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Enforce Prettier rules as ESLint errors
      'no-unused-vars': 'warn',
    },
  },
);
```


This comprehensive setup enables ESLint to lint your TypeScript files in an Express project, ensuring high code quality and consistency across your codebase.