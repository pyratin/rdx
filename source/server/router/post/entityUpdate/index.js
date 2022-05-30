'use strict';

import idValidate from 'server/router/function/idValidate';
import entityExistsValidate from 'server/router/post/function/entityExistsValidate';
import bodyValidate from './function/bodyValidate';
import entityUpdate from 'server/router/post/function/entityUpdate';

export const inputValidate = async (params, body, database) => {
  try {
    idValidate(params.id);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    await entityExistsValidate(params.id, database);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    bodyValidate(body);
  } finally {
    // eslint-disable-next-line no-empty
  }
};

export default async (params, body, database) => {
  try {
    await inputValidate(params, body, database);
  } catch (error) {
    return error;
  }

  const result = await entityUpdate(params.id, body, database);

  return result;
};
