'use strict';

import React from 'react';

const EntityCollectionEmpty = (props) => {
  const __render = () => {
    return <div>no {props.name} to show...</div>;
  };

  const _render = () => {
    return <div>{__render()}</div>;
  };

  return <div className='EntityCollectionEmpty'>{_render()}</div>;
};

export default EntityCollectionEmpty;
