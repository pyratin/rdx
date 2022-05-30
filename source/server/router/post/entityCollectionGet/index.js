'use strict';

import queryValidate from './function/queryValidate';
import entityCollectionGet from 'server/router/post/function/entityCollectionGet';

export const inputValidate = async (query) => {
  try {
    queryValidate(query);
  } finally {
    // eslint-disable-next-line no-empty
  }
};

export default async (query, database) => {
  try {
    await inputValidate(query);
  } catch (error) {
    return error;
  }

  const result = await entityCollectionGet(query, database);

  return result;
};
