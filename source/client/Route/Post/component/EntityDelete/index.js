'use strict';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { entityDeleteSelector, entityDelete } from 'client/store/post';
import LoadingInline from 'client/Route/component/LoadingInline';

const EntityDelete = (props) => {
  const dispatch = /** @type {any} */ (useDispatch());

  const [loading, , id] = useSelector((state) => {
    return entityDeleteSelector(state);
  });

  const loadingInlineRender = () => {
    return (
      loading && (
        <>
          <LoadingInline />
          &nbsp;
        </>
      )
    );
  };

  const _entityDelete = () => {
    return dispatch(entityDelete(id)).then((result) => {
      return !result.payload._error && props.onModalHideTrigger();
    });
  };

  const onSubmitHandle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    return !loading && _entityDelete();
  };

  const formRender = () => {
    return (
      <form onSubmit={onSubmitHandle}>
        <div className='mb-3'>are you sure?</div>

        <div className='d-flex justify-content-end btnGroup'>
          <button type='submit' className='btn btn-outline-primary'>
            {loadingInlineRender()}
            yes
          </button>
        </div>
      </form>
    );
  };

  const _render = () => {
    return <div>{formRender()}</div>;
  };

  return <div className='EntityDelete'>{_render()}</div>;
};

export default EntityDelete;
