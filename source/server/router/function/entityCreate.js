'use strict';

import { v4 as uuidV4 } from 'uuid';

import sqlFromJavascriptDateTimeGet from './sqlFromJavascriptDateTimeGet';

export default (_input, collectionName, database) => {
  const input = {
    id: uuidV4(),
    ..._input,
    createdAt: sqlFromJavascriptDateTimeGet(new Date()),
    updatedAt: sqlFromJavascriptDateTimeGet(new Date())
  };

  const keyString = Object.keys(input).join(', ');

  const valueString = Object.values(input)
    .fill('?')
    .join(', ');

  return database
    .execute(
      `
      insert into ${collectionName} \
      (${keyString}) values (${valueString})
    `.trim(),
      Object.values(input)
    )
    .then(() => {
      return input;
    });
};
