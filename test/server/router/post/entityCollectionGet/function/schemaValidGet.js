'use strict';

import schemaPropertyFromObjectGet from 'test/function/schemaPropertyFromObjectGet';
import ajvGet from 'server/function/ajvGet';

export default (query, entity, hasMore, result) => {
  const schema = {
    type: 'object',
    properties: {
      collection: {
        type: 'array',
        minItems: 1,
        maxItems: 1,
        items: [
          {
            type: 'object',
            properties: schemaPropertyFromObjectGet(entity),
            required: Object.keys(entity),
            additionalProperties: false
          }
        ]
      },
      meta: {
        type: 'object',
        properties: {
          query: {
            type: 'object',
            properties: schemaPropertyFromObjectGet(query),
            required: Object.keys(query)
          },
          hasMore: { const: hasMore },
        },
        required: ['query', 'hasMore'],
        additionalProperties: false
      }
    }
  };

  const validate = ajvGet().compile(schema);

  const valid = validate(result);

  return valid;
};
