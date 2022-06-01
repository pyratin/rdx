'use strict';

import React from 'react';
import { useDispatch } from 'react-redux';

import { onEntityDeleteTriggerHandle } from 'client/store/post';

const EntityDeleteTrigger = (props) => {
  const dispatch = useDispatch();

  const onClickHandle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    return dispatch(onEntityDeleteTriggerHandle(props.post.id));
  };

  const iconRender = () => {
    return (
      <div className='me-1'>
        <i className='fa fa-square-minus'></i>
      </div>
    );
  };

  const dropdownItemRender = () => {
    return (
      <li>
        <a href='#' className='d-flex dropdown-item' onClick={onClickHandle}>
          {iconRender()}
          delete
        </a>
      </li>
    );
  };

  const _render = () => {
    return <div>{dropdownItemRender()}</div>;
  };

  return <div className='EntityDeleteTrigger'>{_render()}</div>;
};

export default EntityDeleteTrigger;
