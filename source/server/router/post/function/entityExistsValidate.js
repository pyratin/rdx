'use strict';

import entityByIdGet from './entityByIdGet';

export default async (input, database) => {
  const [[result]] = await entityByIdGet(input, database);

  if (!result) {
    throw {
      _error: [
        {
          source: 'entity',
          message: 'not found'
        }
      ],
      status: 404
    };
  }

  return result;
};
