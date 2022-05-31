'use strict';

import sqlFromJavascriptDateTimeGet from './sqlFromJavascriptDateTimeGet';

export default (id, _input, collectionName, database) => {
  const input = {
    ..._input,
    updatedAt: sqlFromJavascriptDateTimeGet(new Date())
  };

  const string = Object.keys(input)
    .map((x) => `${x}=?`)
    .join(', ');

  return database
    .execute(
      `
      update ${collectionName} set ${string} where id=?
    `.trim(),
      [...Object.values(input), id]
    )
    .then(() => {
      return {
        id,
        changes: input
      };
    });
};
