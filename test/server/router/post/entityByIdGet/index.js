'use strict';

import assert from 'assert';

import __data from './data';
import databaseGet from 'server/function/databaseGet';
import entityByIdGet, { inputValidate } from 'server/router/post/entityByIdGet';
import entityCreate from 'server/router/post/entityCreate';
import entityDelete from 'server/router/post/entityDelete';

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
      return entityByIdGet(
        { id: entity01.id },
        database
      ).then((result) => {
        return assert.deepEqual(result, entity01);
      });
    });
  });
});
