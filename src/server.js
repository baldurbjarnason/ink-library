import * as sapper from "@sapper/server";
import { setup as serverSetup } from "./setup.js";

const { NODE_ENV, PORT } = process.env;
const dev = NODE_ENV === "development";

if (dev) {
  const app = serverSetup(sapper);
  app.listen(PORT);
}

function setup(options) {
  return serverSetup(sapper, options);
}

export { sapper, setup };

// Need to set this up to actually use https.
