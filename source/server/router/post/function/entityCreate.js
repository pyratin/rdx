'use strict';

import constant from 'server/function/constant';
import entityCreate from 'server/router/function/entityCreate';

export default async (input, database) => {
  const collectionName = constant.DATABASE.POST_COLLECTION_NAME;

  return entityCreate(input, collectionName, database);
};
