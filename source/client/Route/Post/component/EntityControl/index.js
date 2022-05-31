'use strict';

import React from 'react';

import EntityUpdateTrigger from 'client/Route/Post/component/EntityUpdateTrigger';

const Control = (props) => {
  const entityUpdateTriggerRender = () => {
    return <EntityUpdateTrigger post={props.post} />;
  };

  const dropdownRender = () => {
    return (
      <div className='dropdown'>
        <button className='btn btn-link p-0 m-0' data-bs-toggle='dropdown'>
          <i className='fa fa-chevron-down fa-fw'></i>
        </button>

        <ul className='dropdown-menu'>{entityUpdateTriggerRender()}</ul>
      </div>
    );
  };

  const _render = () => {
    return <div>{dropdownRender()}</div>;
  };

  return <div className='Control'>{_render()}</div>;
};

export default Control;
