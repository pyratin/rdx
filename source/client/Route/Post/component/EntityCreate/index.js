'use strict';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  entityCreateSelector,
  onEntityCreateInputHandle,
  entityCreate
} from 'client/store/post';
import EntityForm from 'client/Route/Post/component/EntityForm';

const EntityCreate = () => {
  const dispatch = /** @type {any} */ (useDispatch());

  const [loading, error, input] = useSelector((state) => {
    return entityCreateSelector(state);
  });

  const onChangeHandle = (input) => {
    return dispatch(onEntityCreateInputHandle(input));
  };

  const _entityCreate = () => {
    return dispatch(entityCreate(input));
  };

  const onSubmitHandle = () => {
    return !loading && _entityCreate();
  };

  const entityFormRender = () => {
    return (
      <EntityForm
        actionType='entityCreate'
        loading={loading}
        error={error}
        input={input}
        onChange={onChangeHandle}
        onSubmit={onSubmitHandle}
      />
    );
  };

  const _render = () => {
    return <div className='py-3'>{entityFormRender()}</div>;
  };

  return <div className='EntityCreate'>{_render()}</div>;
};

export default EntityCreate;
