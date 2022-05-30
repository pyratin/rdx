'use strict';

import assert from 'assert';

import __data from './data';
import databaseGet from 'server/function/databaseGet';
import entityDelete, { inputValidate } from 'server/router/post/entityDelete';
import entityCreate from 'server/router/post/entityCreate';
import constant from 'server/function/constant';
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

      return inputValidate(data.argument.params).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[1].text, () => {
      const data = _data.it[1];

      return inputValidate(data.argument.params, database).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });
  });

  describe(__data.describe[1].text, () => {
    const _data = __data.describe[1];

    let entity01;

    before(() => {
      return entityCreate(_data.before[0].argument.body, database).then(
        (result) => {
          entity01 = result;
        }
      );
    });

    after(() => {
      return entityDelete({ id: entity01.id }, database);
    });

    it(_data.it[0].text, () => {
      return entityDelete({ id: entity01.id }, database).then((result) => {
        const schema = {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              pattern: constant.PATTERN.ID
            }
          },
          required: ['id'],
          additionalProperties: false
        };

        const validate = ajvGet().compile(schema);

        const valid = validate(result);

        return assert.deepEqual(valid, true);
      });
    });
  });
});
