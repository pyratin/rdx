'use strict';

import constant from 'server/function/constant';
import entityDelete from 'server/router/function/entityDelete';

export default (input, database) => {
  const collectionName = constant.DATABASE.POST_COLLECTION_NAME;

  return entityDelete(input, collectionName, database);
};
