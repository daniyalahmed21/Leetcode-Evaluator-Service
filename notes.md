# NPM Scripts Overview

```json
 "scripts": {
    "build": "npx tsc",
    "watch": "npx tsc -w",
    "prestart": "npm run build",
    "start": "npx nodemon dist/index.js",
    "dev" : "npx concurrently \"npm run watch\" \"npm run start\""
  },
````

##  build

```json
"build": "npx tsc"
````

Uses the **TypeScript compiler (tsc)** to transpile `.ts` files into `.js`. Output files are placed in the `dist/` folder. Run this manually when you want a one-time compilation.


## watch

```json
"watch": "npx tsc -w"
```

Runs the **TypeScript compiler in watch mode**. It automatically recompiles files whenever a change is detected.


##  prestart

```json
"prestart": "npm run build"
```

This script runs automatically before the `start` script, ensuring the latest TypeScript code is compiled before starting the server.


##  start

```json
"start": "npx nodemon dist/index.js"
```

Starts the compiled app using **nodemon**. It watches the built JavaScript (`dist/index.js`) for changes and automatically restarts the server if the file changes, which is useful for development.


##  dev

```json
"dev": "npx concurrently \"npm run watch\" \"npm run start\""
```

Runs both the `watch` and `start` scripts at the same time using **concurrently**. This setup is ideal for development:

  * `tsc -w` watches and recompiles TypeScript.
  * `nodemon` watches and restarts the server.
    The result is an automatic rebuild and server restart whenever your code changes.


## Tools Used

  * **tsc**: TypeScript Compiler
  * **nodemon**: Watches and restarts Node.js applications automatically
  * **concurrently**: Allows multiple scripts to run in parallel

