'use strict';

import { Router } from 'express';

import post from './post';

export default (database) => {
  return Router({ caseSensitive: true })
    .use('/post', post(database));
};
