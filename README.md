# GJTiquia.com

my personal site

## some context

built with Astro, using the Deno runtime for fun
- ref: https://deno.com/blog/build-astro-with-deno

## commands

all commands are run from the root of the project, from a terminal:

| Command                         | Action                                           |
| :------------------------------ | :----------------------------------------------- |
| `deno install --allow-scripts`  | Installs dependencies                            |
| `deno task`                     | See all available tasks                          |
| `deno task dev`                 | Starts local dev server at `localhost:4321`      |
| `deno task build`               | Build your production site to `./dist/`          |
| `deno task preview`             | Preview your build locally, before deploying     |
| `deno task astro ...`           | Run CLI commands like `astro add`, `astro check` |
| `deno task astro -- --help`     | Get help using the Astro CLI                     |

## project structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.
