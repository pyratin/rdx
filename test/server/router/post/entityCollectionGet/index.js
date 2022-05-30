'use strict';

import assert from 'assert';

import __data from './data';
import databaseGet from 'server/function/databaseGet';
import entityCollectionGet, {
  inputValidate
} from 'server/router/post/entityCollectionGet';
import entityCreate from 'server/router/post/entityCreate';
import entityDelete from 'server/router/post/entityDelete';
import schemaValidGet from './function/schemaValidGet';

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

      return inputValidate(data.argument.query).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[1].text, () => {
      const data = _data.it[1];

      return inputValidate(data.argument.query).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[2].text, () => {
      const data = _data.it[2];

      return inputValidate(data.argument.query).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });
  });

  describe(__data.describe[1].text, () => {
    const _data = __data.describe[1];

    let entity01;

    let entity02;

    let entity03;

    before(() => {
      return entityCreate(_data.before[0].argument.body, database).then(
        (result) => {
          entity01 = result;
        }
      );
    });

    before(() => {
      return entityCreate(_data.before[1].argument.body, database).then(
        (result) => {
          entity02 = result;
        }
      );
    });

    before(() => {
      return entityCreate(_data.before[2].argument.body, database).then(
        (result) => {
          entity03 = result;
        }
      );
    });

    after(() => {
      return entityDelete({ id: entity01.id }, database);
    });

    after(() => {
      return entityDelete({ id: entity02.id }, database);
    });

    after(() => {
      return entityDelete({ id: entity03.id }, database);
    });

    it(_data.it[0].text, () => {
      const data = _data.it[0];

      return entityCollectionGet(data.argument.query, database).then(
        (result) => {
          const valid = schemaValidGet(
            data.argument.query,
            entity03,
            true,
            result
          );

          return assert.equal(valid, true);
        }
      );
    });

    it(_data.it[1].text, () => {
      const data = _data.it[1];

      return entityCollectionGet(data.argument.query, database).then(
        (result) => {
          const valid = schemaValidGet(
            data.argument.query,
            entity02,
            true,
            result
          );

          return assert.equal(valid, true);
        }
      );
    });

    it(_data.it[2].text, () => {
      const data = _data.it[2];

      return entityCollectionGet(data.argument.query, database).then(
        (result) => {
          const valid = schemaValidGet(
            data.argument.query,
            entity01,
            false,
            result
          );

          return assert.equal(valid, true);
        }
      );
    });
  });
});
