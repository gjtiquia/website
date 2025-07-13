# Gemini Project Configuration

This file stores project-specific information, configurations, and instructions for the Gemini agent to ensure it can assist effectively and adhere to this project's standards.

## Project Overview

This project is a personal website built with [Astro](https://astro.build/), a modern static site generator. It uses [Tailwind CSS](https://tailwindcss.com/) for styling and [TypeScript](https://www.typescriptlang.org/) for type-checking. The goal of the project is to showcase the user's portfolio, blog, and other relevant information.

## Agent Instructions

- **Conventions:** This project uses [Prettier](https://prettier.io/) for code formatting. Please adhere to the formatting rules defined in the `.prettierrc` file.
- **Dependencies:** The primary dependencies are [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/). Manage dependencies using `pnpm`.
- **Testing:** There is no dedicated testing framework in this project. Instead, it relies on [Astro's built-in type checking (`astro check`)](https://docs.astro.build/en/guides/typescript/#type-checking-in-astro) to ensure code quality. To run the type checker, use the `pnpm run build` command.
- **Commands:**
    - `pnpm dev`: Starts the development server.
    - `pnpm start`: Alias for `pnpm dev`.
    - `pnpm build`: Builds the project for production and runs type-checking.
    - `pnpm preview`: Previews the production build locally.
    - `pnpm astro`: Provides access to the Astro CLI.

## User Preferences

[Note any specific user preferences for interacting with the agent in this project.]