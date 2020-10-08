const fs = require("fs")

if (process.env.APP_ENGINE_YAML) {
  fs.writeFileSync("app.yaml", process.env.APP_ENGINE_YAML)
}