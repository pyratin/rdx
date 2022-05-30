'use strict';

import constant from 'server/function/constant';
import entityByIdGet from 'server/router/function/entityByIdGet';

export default (input, database) => {
  const collectionName = constant.DATABASE.POST_COLLECTION_NAME;

  return entityByIdGet(input, collectionName, database);
};
