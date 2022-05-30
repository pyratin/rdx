'use strict';

import React, { useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  entityCreateSelector,
  onEntityCreateInputHandle,
  entityCreate
} from 'client/store/post';
import errorShow from 'client/Route/function/errorShow';
import errorClear from 'client/Route/function/errorClear';

const EntityCreate = () => {
  const dispatch = /** @type {any} */ (useDispatch());

  const [loading, error, input] = useSelector((state) => {
    return entityCreateSelector(state);
  });

  const ref = useRef();

  const onErrorHandle = useCallback(() => {
    return error ? errorShow(error, ref.current) : errorClear(ref.current);
  }, [error]);

  useEffect(() => {
    onErrorHandle();
  }, [onErrorHandle]);

  const onChangeHandle = (event) => {
    return dispatch(
      onEntityCreateInputHandle({
        key: $(event.target).attr('data-key'),
        value: event.target.value
      })
    );
  };

  const _entityCreate = () => {
    return dispatch(entityCreate(input));
  };

  const onSubmitHandle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    !loading && _entityCreate();
  };

  const formRender = () => {
    return (
      <form ref={ref} onSubmit={onSubmitHandle}>
        <div className='inputGroup mb-3'>
          <textarea
            rows={1}
            className='formControl form-control'
            placeholder='what is on your mind?'
            data-key='text'
            value={input.text}
            onChange={onChangeHandle}
          ></textarea>

          <div className='invalidFeedback invalid-feedback'></div>
        </div>

        <div className='btnGroup d-flex justify-content-end'>
          <button type='submit' className='btn btn-outline-primary'>
            post
          </button>
        </div>
      </form>
    );
  };

  const _render = () => {
    return <div className='py-3'>{formRender()}</div>;
  };

  return <div className='EntityCreate'>{_render()}</div>;
};

export default EntityCreate;
