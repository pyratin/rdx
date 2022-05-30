'use strict';

import idValidate from 'server/router/function/idValidate';
import entityExistsValidate from 'server/router/post/function/entityExistsValidate';
import entityDelete from 'server/router/post/function/entityDelete';

export const inputValidate = async (params, database) => {
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
};

export default async (params, database) => {
  try {
    await inputValidate(params, database);
  } catch (error) {
    return error;
  }

  const result = await entityDelete(params.id, database);

  return result;
};
