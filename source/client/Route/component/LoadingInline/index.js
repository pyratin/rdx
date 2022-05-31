'use strict';

import React from 'react';

const LoadingInline = () => {
  const __render = () => {
    return (
      <div>
        <i className='fa fa-spinner fa-fw fa-spin'></i>
      </div>
    );
  };

  const _render = () => {
    return <div>{__render()}</div>;
  };

  return <div className='LoadingInline'>{_render()}</div>;
};

export default LoadingInline;
