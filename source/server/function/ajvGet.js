'use strict';

import ajvFormats from 'ajv-formats';
import Ajv from 'ajv';

let ajv;

const _ajvGet = () => {
  return ajvFormats(new Ajv({ allErrors: true }));
};

export default () => {
  ajv ??= _ajvGet();

  return ajv;
};
