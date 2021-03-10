const fs = require("fs");

if (process.env.GOOGLE_KEYFILE) {
  fs.writeFileSync("keyfile.json", process.env.GOOGLE_KEYFILE);
  console.log("saved a secret");
} else {
  console.log("did not save a secret");
}
