'use strict';

import assert from 'assert';

import __data from './data';
import databaseGet from 'server/function/databaseGet';
import entityCreate, { inputValidate } from 'server/router/post/entityCreate';
import entityDelete from 'server/router/post/entityDelete';
import constant from 'server/function/constant';
import schemaPropertyFromObjectGet from 'test/function/schemaPropertyFromObjectGet';
import ajvGet from 'server/function/ajvGet';

describe(__data.text, () => {
  let database;

  before(async () => {
    database = await databaseGet(false);
  });

  after(() => {
    return database.end();
  });

  describe(__data.describe[0].text, () => {
    const _data = __data.describe[0];

    it(_data.it[0].text, () => {
      const data = _data.it[0];

      return inputValidate(data.argument.body).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[1].text, () => {
      const data = _data.it[1];

      return inputValidate(data.argument.body).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });
  });

  describe(__data.describe[1].text, () => {
    const _data = __data.describe[1];

    let entity01;

    after(() => {
      return entity01 && entityDelete({ id: entity01.id }, database);
    });

    it(_data.it[0].text, () => {
      const data = _data.it[0];

      return entityCreate(data.argument.body, database)
        .then((result) => {
          entity01 = result;

          return result;
        })
        .then((result) => {
          const schema = {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern: constant.PATTERN.ID
              },
              ...schemaPropertyFromObjectGet(data.argument.body),
              createdAt: {
                type: 'string',
                format: 'date-time'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time'
              }
            },
            required: [
              'id',
              ...Object.keys(data.argument.body),
              'createdAt',
              'updatedAt'
            ],
            additionalProperties: false
          };

          const validate = ajvGet().compile(schema);

          const valid = validate(result);

          return assert.equal(valid, true);
        });
    });
  });
});
