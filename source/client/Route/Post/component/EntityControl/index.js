'use strict';

import React from 'react';

import EntityUpdateTrigger from 'client/Route/Post/component/EntityUpdateTrigger';
import EntityDeleteTrigger from 'client/Route/Post/component/EntityDeleteTrigger';

const Control = (props) => {
  const entityUpdateTriggerRender = () => {
    return <EntityUpdateTrigger post={props.post} />;
  };

  const entityDeleteTriggerRender = () => {
    return <EntityDeleteTrigger post={props.post} />;
  };

  const dropdownRender = () => {
    return (
      <div className='dropdown'>
        <button className='btn btn-link p-0 m-0' data-bs-toggle='dropdown'>
          <i className='fa fa-chevron-down fa-fw'></i>
        </button>

        <ul className='dropdown-menu'>
          {entityUpdateTriggerRender()}

          <div className='dropdown-divider'></div>

          {entityDeleteTriggerRender()}
        </ul>
      </div>
    );
  };

  const _render = () => {
    return <div>{dropdownRender()}</div>;
  };

  return <div className='Control'>{_render()}</div>;
};

export default Control;
