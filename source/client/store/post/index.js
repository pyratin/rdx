'use strict';

import { DateTime } from 'luxon';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import queryStringGet from 'client/function/queryStringGet';

const entityAdapter = createEntityAdapter({
  selectId: (entity) => entity.id,
  sortComparer: (a, b) => {
    return (
      DateTime.fromSQL(b.createdAt).toMillis() -
      DateTime.fromSQL(a.createdAt).toMillis()
    );
  }
});

const initialState = entityAdapter.getInitialState({
  meta: {
    query: null,
    hasMore: true
  },
  action: {
    entityCreate: {
      loading: false,
      error: null,
      input: { text: '' }
    },
    entityCollectionGet: {
      loading: false,
      error: null
    }
  }
});

export const entityCollectionGet = createAsyncThunk(
  'post/collectionGet',
  /** @type {(any) => any} */
  (query) => {
    return window.fetch(`/post?${queryStringGet(query)}`).then((result) => {
      return result.json();
    });
  }
);

export const entityCreate = createAsyncThunk(
  'post/create',
  /** @type {(any) => any} */
  (body) => {
    return window
      .fetch('/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then((result) => {
        return result.json();
      });
  }
);

export const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    onEntityCreateInputHandle: (state, action) => {
      state.action.entityCreate.input[action.payload.key] =
        action.payload.value;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(entityCreate.pending, (state) => {
        state.action.entityCreate.loading = true;

        state.action.entityCreate.error = null;
      })
      .addCase(entityCreate.fulfilled, (state, action) => {
        state.action.entityCreate.loading = false;

        action.payload._error
          ? (state.action.entityCreate.error = action.payload)
          : (() => {
              entityAdapter.upsertOne(state, action.payload);

              state.action.entityCreate.input =
                initialState.action.entityCreate.input;
            })();
      })
      .addCase(entityCollectionGet.pending, (state) => {
        state.action.entityCollectionGet.loading = true;
      })
      .addCase(entityCollectionGet.fulfilled, (state, action) => {
        state.action.entityCollectionGet.loading = false;

        entityAdapter.upsertMany(state, action.payload.collection);

        state.meta = action.payload.meta;
      });
  }
});

export const { onEntityCreateInputHandle } = slice.actions;

export default slice.reducer;

export const entitySelector = entityAdapter.getSelectors((state) => state.post);

export const entityCreateSelector = (state) => {
  const { loading, error, input } = state.post.action.entityCreate;

  return [loading, error, input];
};

export const entityCollectionGetSelector = (state) => {
  const { loading, error } = state.post.action.entityCollectionGet;

  const hasMore = state.post.meta.hasMore;

  const entityCollection = entitySelector.selectAll(state);

  return [loading, error, hasMore, entityCollection];
};
