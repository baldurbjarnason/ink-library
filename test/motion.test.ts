import { expect } from '@esm-bundle/chai';
import {reduceMotion} from '../state/motion'

it('Reduce motion constant', () => {
  expect(reduceMotion).to.be.false
}) 