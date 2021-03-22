# `src/`

This is the core directory where 90% of the project lives.

From the root README

- `src`: This is where most of the code lives excluding the newer state and style code (see below)
  - `src/components`: where most of the app lives
  - `src/routes`: Sapper uses file-based routing using the files in this directory. The `src/routes/sources/**` endpoints also preload state server-side, simplifying state management, which is something the other routes should probably switch to doing long term.
    - `src/routes/_layout.svelte`: this is the main svelte component that wraps every route
  - `src/stores`: where our [Svelte stores](https://svelte.dev/docs#svelte_store) live. This is where the state for most of the endpoints and components is managed
  - `src/auth.js`: sets up authentication
  - `src/client.js`: sets up client-side rendering
  - `src/getToken.js`: a function that's used client-side to acquire the anti-CSRF token used to protect the `api/*` endpoints
  - `src/server.js`: starts the server, integrates auth and server setup
  - `src/service-worker.js`: the basic service worker code
  - `src/setup.js`: sets up the expressjs server app
  - `src/template.html`: the core page template for every single server-rendered page.

Most of the code lives in `src/components` or `src/stores`
