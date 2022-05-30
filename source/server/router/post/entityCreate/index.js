'use strict';

import bodyValidate from './function/bodyValidate';
import entityCreate from 'server/router/post/function/entityCreate';

export const inputValidate = async (body) => {
  try {
    bodyValidate(body);
  } finally {
    // eslint-disable-next-line no-empty
  }
};

export default async (body, database) => {
  try {
    await inputValidate(body);
  } catch (error) {
    return error;
  }

  const result = await entityCreate(body, database);

  return result;
};
