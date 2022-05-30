'use strict';

import mysql2 from 'mysql2/promise';
import { parseUri } from 'mysql-parse';

const _databaseGet = async (consoleLogFlag) => {
  const databaseUrl = process.env.DATABASE_URL;
  const { scheme, ...option } = parseUri(databaseUrl);

  const database = await mysql2
    .createConnection({
      ...option,
      timezone: 'Z',
      dateStrings: true
    })
    .then((result) => {
      consoleLogFlag &&
        // eslint-disable-next-line no-console
        console.log(`${process.env.NODE_ENV}-database: ${databaseUrl}`);

      return result;
    });

  return database;
};

const postCollectionCreate = (database) => {
  return database.execute(
    `
      create table if not exists post (
        id varchar(100) primary key not null,
        text text not null,
        createdAt datetime(3) not null,
        updatedAt datetime(3) not null
      )
    `.trim()
  );
};

export default async (consoleLogFlag = true) => {
  const database = await _databaseGet(consoleLogFlag);

  await postCollectionCreate(database);

  return database;
};
