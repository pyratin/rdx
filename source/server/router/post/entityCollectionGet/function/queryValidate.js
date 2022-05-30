'use strict';

import ajvGet from 'server/function/ajvGet';
import ajvErrorGet from 'server/function/ajvErrorGet';

export default (input) => {
  const schema = {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        minimum: 1
      },
      offset: {
        type: 'integer',
        minimum: 0
      }
    },
    required: ['limit', 'offset'],
    additionalProperties: false
  };

  const validate = ajvGet().compile(schema);

  const valid = validate(input);

  if (!valid) {
    throw ajvErrorGet(validate.errors);
  }
};
