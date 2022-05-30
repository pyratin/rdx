'use strict';

import { validate } from 'uuid';

export default (input) => {
  const result = validate(input);

  if (!result) {
    throw {
      _error: [
        {
          source: 'id',
          message: 'invalid'
        }
      ],
      status: 400
    };
  }
};
