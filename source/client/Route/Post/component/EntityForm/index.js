'use strict';

import React, { useRef, useCallback, useEffect } from 'react';

import autosize from 'autosize';
import errorShow from 'client/Route/function/errorShow';
import errorClear from 'client/Route/function/errorClear';
import LoadingInline from 'client/Route/component/LoadingInline';

const EntityForm = (props) => {
  const ref = useRef();

  const renderInitialize = useCallback(() => {
    autosize($(ref.current).find('.formControl'));
  }, []);

  const onErrorHandle = useCallback(() => {
    return props.error
      ? errorShow(props.error, ref.current)
      : errorClear(ref.current);
  }, [props.error]);

  useEffect(() => {
    renderInitialize();
  }, [renderInitialize]);

  useEffect(() => {
    onErrorHandle();
  }, [onErrorHandle]);

  const onChangeHandle = (event) => {
    return props.onChange({
      key: $(event.target).attr('data-key'),
      value: event.target.value
    });
  };

  const onSubmitHandle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    return props.onSubmit();
  };

  const loadingInlineRender = () => {
    return (
      props.loading && (
        <>
          <LoadingInline />
          &nbsp;
        </>
      )
    );
  };

  const actionTypeRender = () => {
    switch (props.actionType) {
      case 'entityCreate':
        return 'post';

      case 'entityUpdate':
        return 'update';
    }
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
            value={props.input.text}
            onChange={onChangeHandle}
          ></textarea>

          <div className='invalidFeedback invalid-feedback'></div>
        </div>

        <div className='btnGroup d-flex justify-content-end'>
          <button type='submit' className='d-flex btn btn-outline-primary'>
            {loadingInlineRender()}
            {actionTypeRender()}
          </button>
        </div>
      </form>
    );
  };

  const _render = () => {
    return <div>{formRender()}</div>;
  };

  return <div className='EntityForm'>{_render()}</div>;
};

export default EntityForm;
