'use strict';

import 'bootstrap';
import 'whatwg-fetch';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'client/style/index.scss';
import { store } from 'client/store';
import _Route from './Route';
import Post from './Route/Post';
import PostCollection from './Route/Post/EntityCollection';

const root = createRoot(document.getElementById('viewer'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<_Route />}>
          <Route path='Post' element={<Post />}>
            <Route path='Collection' element={<PostCollection />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
