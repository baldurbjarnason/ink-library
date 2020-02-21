const {sapper, setup} = require("./__sapper__/build/server/server.js")

const PORT = process.env.PORT || 8080

const app = setup(sapper);
app.listen(PORT, () => console.log(`Listening to port ${PORT}`))

module.exports = app