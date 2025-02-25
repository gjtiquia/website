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

## updating Astro

https://docs.astro.build/en/upgrade-astro/

`deno install --allow-scripts astro@latest @astrojs/tailwind@latest`

## notes on building

you may encounter the following error
```
Could not find Sharp. Please install Sharp (`sharp`) manually into your project or migrate to another image service.
```

fix by installing `sharp` manually
```
deno add --allow-scripts npm:sharp
```
(reference: https://docs.astro.build/en/guides/images/#default-image-service)

## QR Code Generator

This website includes a QR code generation feature for any URL. Access it at `/tools/qr` or from the apps page.

### Features

- Generate QR codes for any URL
- Quick links for common pages
- Save and share QR codes easily
- Works entirely client-side with no server processing

### How to Use

1. Navigate to `/tools/qr` directly or from the apps page
2. Enter any URL you want to generate a QR code for
3. The QR code is generated instantly
4. Use the quick links for common pages

## TODO

- ~~qr: eg. `gjtiquia.com/qr/resume` generates a qr code for `gjtiquia.com/resume`~~
- portfolio page
- ux for resume
