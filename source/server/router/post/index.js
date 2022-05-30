'use strict';

import { Router } from 'express';

import constant from 'server/function/constant';
import entityCreate from './entityCreate';
import entityUpdate from './entityUpdate';
import entityDelete from './entityDelete';
import entityCollectionGet from './entityCollectionGet';
import entityByIdGet from './entityByIdGet';

export default (database) => {
  return Router()
    .post('/', (request, response, next) => {
      return entityCreate(request.body, database)
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    })
    .put(`/:id(${constant.PATTERN.ID})`, (request, response, next) => {
      return entityUpdate(request.params, request.body, database)
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    })
    .delete(`/:id(${constant.PATTERN.ID})`, (request, response, next) => {
      return entityDelete(request.params, database)
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    })
    .get('/', (request, response, next) => {
      return entityCollectionGet(request.query, database)
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    })
    .get(`/:id(${constant.PATTERN.ID})`, (request, response, next) => {
      return entityByIdGet(request.params, database)
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    });
};
