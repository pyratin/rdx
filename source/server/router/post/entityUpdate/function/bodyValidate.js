'use strict';

import bodySchemaPropertyFragment from 'server/router/post/function/bodySchemaPropertyFragment';
import ajvGet from 'server/function/ajvGet';
import ajvErrorGet from 'server/function/ajvErrorGet';

export default (input) => {
  const schema = {
    type: 'object',
    properties: bodySchemaPropertyFragment,
    required: Object.keys(bodySchemaPropertyFragment),
    additionalProperties: false
  };

  const validate = ajvGet().compile(schema);

  const valid = validate(input);

  if (!valid) {
    throw ajvErrorGet(validate.errors);
  }
};
