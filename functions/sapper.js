const serverless = require('serverless-http');
const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
let app
const { sapper, setup } = require("../sapper/server/server.js");
app = setup(sapper);

module.exports.handler = serverless(app);

