import { expect } from '@esm-bundle/chai';
import {source$, notebooks$, notes$, tags$, library$, reader$, chapter$, getIdsFromNames} from '../state/state'

it('Get Ids from names', () => {
  const tags = [{name: "CoolTagBro!", id: "imatagnotanumber"}]
  const ids = getIdsFromNames(["CoolTagBro!", "UnCoolBro!"], tags)
  expect(ids).to.deep.equal(["imatagnotanumber"])
})