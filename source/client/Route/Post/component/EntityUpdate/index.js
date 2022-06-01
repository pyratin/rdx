'use strict';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  entityUpdateSelector,
  onEntityUpdateInputHandle,
  entityUpdate
} from 'client/store/post';
import EntityForm from 'client/Route/Post/component/EntityForm';

const EntityUpdate = (props) => {
  const dispatch = /** @type {any} */ (useDispatch());

  const [loading, error, id, input] = useSelector((state) => {
    return entityUpdateSelector(state);
  });

  const onChangeHandle = (input) => {
    return dispatch(onEntityUpdateInputHandle(input));
  };

  const _entityUpdate = () => {
    return dispatch(
      entityUpdate({
        id,
        changes: input
      })
    ).then((result) => {
      return !result.payload._error && props.onModalHideTrigger();
    });
  };

  const onSubmitHandle = () => {
    return !loading && _entityUpdate();
  };

  const entityFormRender = () => {
    return (
      <EntityForm
        actionType='entityUpdate'
        loading={loading}
        error={error}
        input={input}
        onChange={onChangeHandle}
        onSubmit={onSubmitHandle}
      />
    );
  };

  const _render = () => {
    return <div>{entityFormRender()}</div>;
  };

  return <div className='EntityUpdate'>{_render()}</div>;
};

export default EntityUpdate;
