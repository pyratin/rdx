'use strict';

import React from 'react';
import { useDispatch } from 'react-redux';

import { onEntityUpdateTriggerHandle } from 'client/store/post';

const EntityUpdateTrigger = (props) => {
  const dispatch = useDispatch();

  const onClickHandle = (event) => {
    event.preventDefault();

    return dispatch(onEntityUpdateTriggerHandle(props.post.id));
  };

  const iconRender = () => {
    return (
      <div className='me-1'>
        <i className='fa fa-edit'></i>
      </div>
    );
  };
  const dropdownItemRender = () => {
    return (
      <li>
        <a className='d-flex dropdown-item' href='#' onClick={onClickHandle}>
          {iconRender()}update
        </a>
      </li>
    );
  };

  const _render = () => {
    return <div>{dropdownItemRender()}</div>;
  };

  return <div className='EntityUpdateTrigger'>{_render()}</div>;
};

export default EntityUpdateTrigger;
