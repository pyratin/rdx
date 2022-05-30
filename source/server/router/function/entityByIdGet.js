'use strict';

export default (input, collectionName, database) => {
  return database.execute(
    `
      select * from ${collectionName} where id=?
    `.trim(),
    [input]
  );
};
