'use strict';

import React from 'react';
import { Outlet } from 'react-router-dom';

const Post = () => {
  const outletRender = () => {
    return <Outlet />;
  };

  const _render = () => {
    return <div>{outletRender()}</div>;
  };

  return <div className='Post'>{_render()}</div>;
};

export default Post;
