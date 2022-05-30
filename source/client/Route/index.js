'use strict';

import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { css } from '@emotion/react';

const Route = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const routeInitialize = useCallback(() => {
    switch (true) {
      case !!location.pathname.match(/^\/$/):
        return navigate('/Post/Collection');
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    routeInitialize();
  }, [routeInitialize]);

  const outletRender = () => {
    return <Outlet />;
  };

  const _render = () => {
    return (
      <div className='d-flex justify-content-center'>
        <div
          className='w-100'
          css={css({
            maxWidth: 576
          })}
        >
          {outletRender()}
        </div>
      </div>
    );
  };

  return <div className='Route'>{_render()}</div>;
};

export default Route;
