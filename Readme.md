# LeetCode Evaluator Service

This project is a a TypeScript backend application that uses Express for its web server and BullMQ for managing background jobs. The project is set up with a comprehensive development environment, including linting, code formatting, and a watch mode for easy development.

## Core Technologies

* **TypeScript**: The primary programming language used for the project, providing static typing for enhanced code quality and maintainability.
* **Node.js & Express**: A fast, unopinionated web framework for Node.js, used to build the server and API endpoints.

---

## Key Libraries and Their Purpose

### Web & API

* **`express`**: The main web framework used to build the REST API.
* **`dotenv`**: A library to load environment variables from a `.env` file, keeping sensitive configuration (like database credentials or API keys) separate from the codebase.

### Background Jobs & Task Management

* **`bullmq`**: A robust, feature-rich, and fast queue system built on top of Redis. It is used for handling background tasks and processing long-running jobs outside of the main request-response cycle.
* **`ioredis`**: A high-performance Redis client for Node.js, used by BullMQ to connect to the Redis server and manage the job queue.
* **`@bull-board/api` & `@bull-board/express`**: These two libraries work together to provide a powerful UI for monitoring BullMQ queues. It's a dashboard that allows you to inspect jobs, check their status (completed, failed, active), and see queue health in real time.

### Development & Tooling

* **`typescript`**: The TypeScript compiler, used to transpile the TypeScript code into JavaScript.
* **`nodemon`**: A utility that automatically restarts the Node.js application when file changes are detected, speeding up development.
* **`concurrently`**: A tool to run multiple scripts concurrently. In this project, it's used to run both the TypeScript compiler in watch mode (`tsc -w`) and `nodemon` at the same time.

### Code Quality & Formatting

* **`eslint`**: A static analysis tool for identifying and reporting on patterns in code. It helps enforce coding standards and find potential bugs.
* **`prettier`**: An opinionated code formatter that enforces a consistent style across the entire codebase.
* **`@typescript-eslint/eslint-plugin` & `@typescript-eslint/parser`**: These packages enable ESLint to lint TypeScript code effectively.
* **`eslint-config-prettier` & `eslint-plugin-prettier`**: These are ESLint configurations that integrate Prettier into the ESLint workflow, ensuring there are no conflicts between formatting rules.

---

## Scripts

* **`npm run lint`**: Runs ESLint to check for code quality issues.
* **`npm run lint:fix`**: Runs ESLint and automatically fixes fixable issues.
* **`npm run build`**: Compiles the TypeScript source code into the `dist` directory.
* **`npm run watch`**: Runs the TypeScript compiler in watch mode, which automatically recompiles files as you save them.
* **`npm run prestart`**: This script runs automatically before `npm start` to ensure the project is built.
* **`npm run start`**: Runs the compiled JavaScript code using Nodemon.
* **`npm run dev`**: Starts the development environment by running the `watch` and `start` scripts concurrently. This allows you to edit TypeScript files and see the changes reflected immediately in the running server.