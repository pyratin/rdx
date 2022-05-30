'use strict';

const collectionGet = (
  orderBy,
  direction,
  limit,
  offset,
  collectionName,
  database
) => {
  return database.execute(
    `
      select * from ${collectionName} \
      order by ${orderBy} ${direction} \
      limit ${limit} \
      offset ${offset}
    `.trim()
  );
};

const hasMoreGet = (
  orderBy,
  direction,
  limit,
  offset,
  collectionName,
  database
) => {
  return database
    .execute(
      `
      select * from ${collectionName} \
      order by ${orderBy} ${direction} \
      limit 1 \
      offset ${limit + offset}
    `.trim()
    )
    .then(([[result]]) => {
      return !!result;
    });
};

export default async (query, collectionName, database) => {
  const { orderBy, direction, limit, offset } = query;

  const collection = await collectionGet(
    orderBy,
    direction,
    limit,
    offset,
    collectionName,
    database
  ).then(([result]) => {
    return result;
  });

  const hasMore = await hasMoreGet(
    orderBy,
    direction,
    limit,
    offset,
    collectionName,
    database
  );

  return {
    collection,
    meta: {
      query,
      hasMore
    }
  };
};
