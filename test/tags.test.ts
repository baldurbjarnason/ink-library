import { expect } from "@esm-bundle/chai";
// import {
//   source$,
//   notebooks$,
//   notes$,
//   library$,
//   reader$,
//   chapter$,
// } from "../state/state";
import { tags$, getIdsFromNames } from "../state/tags";

it("Get Ids from names", () => {
  const tags = [{ name: "CoolTagBro!", id: "imatagnotanumber" }];
  const ids = getIdsFromNames(["CoolTagBro!", "UnCoolBro!"], tags);
  expect(ids).to.deep.equal(["imatagnotanumber"]);
});
