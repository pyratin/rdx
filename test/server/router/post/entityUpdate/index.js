'use strict';

import assert from 'assert';

import __data from './data';
import databaseGet from 'server/function/databaseGet';
import entityCreate from 'server/router/post/entityCreate';
import entityDelete from 'server/router/post/entityDelete';
import entityUpdate, { inputValidate } from 'server/router/post/entityUpdate';
import constant from 'server/function/constant';
import schemaPropertyFromObjectGet from 'test/function/schemaPropertyFromObjectGet';
import ajvGet from 'server/function/ajvGet';

describe(__data.text, () => {
  let database;

  before(async () => {
    database = await databaseGet(false);
  });

  describe(__data.describe[0].text, () => {
    const _data = __data.describe[0];

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
      const data = _data.it[0];

      return inputValidate(data.argument.params).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[1].text, () => {
      const data = _data.it[1];

      return inputValidate(data.argument.params, null, database).catch(
        (error) => {
          return assert.deepEqual(error, data.error);
        }
      );
    });

    it(_data.it[2].text, () => {
      const data = _data.it[2];

      return inputValidate(
        { id: entity01.id },
        data.argument.body,
        database
      ).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[3].text, () => {
      const data = _data.it[3];

      return inputValidate(
        { id: entity01.id },
        data.argument.body,
        database
      ).catch((error) => {
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
      const data = _data.it[0];

      return entityUpdate(
        { id: entity01.id },
        data.argument.body,
        database
      ).then((result) => {
        const schema = {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              pattern: constant.PATTERN.ID
            },
            ...schemaPropertyFromObjectGet(data.argument.body),
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          },
          required: ['id', ...Object.keys(data.argument.body), 'updatedAt'],
          additionalProperties: false
        };

        const validate = ajvGet().compile(schema);

        const valid = validate(result);

        return assert.equal(valid, true);
      });
    });
  });
});
