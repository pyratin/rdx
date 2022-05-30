'use strict';

import constant from 'server/function/constant';
import entityCollectionGet from 'server/router/function/entityCollectionGet';

export default (_query, database) => {
  const collectionName = constant.DATABASE.POST_COLLECTION_NAME;

  const query = {
    ..._query,
    orderBy: 'createdAt',
    direction: 'desc'
  };

  return entityCollectionGet(query, collectionName, database);
};
