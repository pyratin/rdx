'use strict';

import idValidate from 'server/router/function/idValidate';
import entityExistsValidate from 'server/router/post/function/entityExistsValidate';

export const inputValidate = async (params, database) => {
  let entity;

  try {
    idValidate(params.id);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    entity = await entityExistsValidate(params.id, database);
  } finally {
    // eslint-disable-next-line no-empty
  }

  return { entity };
};

export default async (params, database) => {
  let entity;

  try {
    ({ entity } = await inputValidate(params, database));
  } catch (error) {
    return error;
  }

  return entity;
};
