# `components`

This is a large and somewhat messy directory. Unfortunately a lot of the existing code is unused, left over from the "workspaces" version of Ink.

- `Auth`: this is where sign in and sign up components live
- `img`: convenience components for generating SVG icons. Should probably switch to a `<svg:use>` sprite system at some point to save on bandwidth.
- `notebooks`: the components actually responsible for the notebooks view
- `notes`: the components actually responsible for the notes view
- `pages`: where the outline implementation lives
- `publication`: mostly unused, where the old reader implementation lived
- `reader`: Profile component.
- `source` and its subdirectories are where the new reader UI lives
- `widgets`: generic components that are commonly reused.
- `workspace`: the Library UI. A lot of it's still used but also contains workspaces components that aren't being used
