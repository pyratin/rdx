'use strict';

import constant from 'server/function/constant';
import entityUpdate from 'server/router/function/entityUpdate';

export default (id, input, database) => {
  const collectionName = constant.DATABASE.POST_COLLECTION_NAME;

  return entityUpdate(id, input, collectionName, database);
};
