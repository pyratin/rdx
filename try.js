'use strict';

import isomorphicFetch from 'isomorphic-fetch';
import {
  createEntityAdapter,
  createSlice,
  configureStore,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

const entityAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    return (
      DateTime.fromSQL(a.createdAt).toMillis() -
      DateTime.fromSQL(b.createdAt).toMillis()
    );
  }
});

const queryStringGet = (query) => {
  return Object.entries(query)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
};

const entityCollectionGet = createAsyncThunk(
  '/post/collectionGet',
  /** @type {(query: object) => object} */
  (query) => {
    return isomorphicFetch(
      `http://localhost:3000/post?${queryStringGet(query)}`
    ).then((result) => {
      return result.json();
    });
  }
);

const slice = createSlice({
  name: 'post',
  initialState: entityAdapter.getInitialState({
    meta: {}
  }),
  reducers: {},
  extraReducers: (builder) => {
    return builder.addCase(entityCollectionGet.fulfilled, (state, action) => {
      entityAdapter.upsertMany(state, action.payload.collection);

      state.meta = action.payload.meta;
    });
  }
});

const store = configureStore({
  reducer: {
    post: slice.reducer
  }
});

store.dispatch(entityCollectionGet({ limit: 1, offset: 0 }));

setTimeout(() => {
  // eslint-disable-next-line no-console
  console.log(store.getState());
}, 1000);
