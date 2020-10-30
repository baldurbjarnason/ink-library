const { sapper, setup } = require("./sapper/server/server.js");

const PORT = process.env.PORT || 8080;

const app = setup(sapper);
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

module.exports = app;
