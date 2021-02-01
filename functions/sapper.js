const serverless = require('serverless-http');
const { sapper, setup } = require(`../__sapper__/server/server.js`);
const app = setup(sapper);

module.exports.handler = serverless(app);

