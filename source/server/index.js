'use strict';

import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import databaseGet from './function/databaseGet';
import queryParse from './function/queryParse';
import router from './router';

(async () => {
  const nodeEnv = process.env.NODE_ENV;

  dotenv.config({ path: `.env.${nodeEnv}` });

  const port = process.env.PORT;

  const database = await databaseGet(true);

  return express()
    .set('view engine', 'ejs')
    .set('views', path.join(process.cwd(), 'source/server/view'))
    .use(express.json())
    .use(queryParse)
    .use('/', router(database))
    .get('*', (request, response) => {
      return response.render('index', { title: process.env.npm_package_name });
    })
    .listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`${nodeEnv}-server: http://localhost:${port}`);
    });
})();
