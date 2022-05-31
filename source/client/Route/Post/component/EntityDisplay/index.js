'use strict';

import React from 'react';

const EntityDisplay = (props) => {
  const __render = () => {
    return <div className='fs-3 fw-semibold'>{props.post.text}</div>;
  };

  const _render = () => {
    return <div>{__render()}</div>;
  };

  return <div className='EntityDisplay'>{_render()}</div>;
};

export default EntityDisplay;
