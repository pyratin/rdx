'use strict';

export default (id, collectionName, database) => {
  return database
    .execute(
      `
      delete from ${collectionName} \
      where id=?
    `.trim(),
      [id]
    )
    .then(() => {
      return { id };
    });
};
