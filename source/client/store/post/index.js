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
    entityUpdate: {
      loading: false,
      error: null,
      id: null,
      input: null
    },
    entityDelete: {
      loading: false,
      error: null,
      id: null
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

export const entityUpdate = createAsyncThunk(
  'post/update',
  /** @type {(any) => any} */
  ({ id, changes: body }) => {
    return window
      .fetch(`/post/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then((result) => {
        return result.json();
      });
  }
);

export const entityDelete = createAsyncThunk(
  'post/delete',
  /** @type{(any) => any} */
  (id) => {
    return window
      .fetch(`/post/${id}`, {
        method: 'DELETE'
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
    },
    onEntityUpdateTriggerHandle: (state, action) => {
      state.action.entityUpdate.id = action.payload;

      const { text } = entityAdapter
        .getSelectors()
        .selectById(state, action.payload);

      state.action.entityUpdate.input = { text };
    },
    onEntityUpdateCancelHandle: (state) => {
      state.action.entityUpdate.id = null;

      state.action.entityUpdate.error = null;

      state.action.entityUpdate.input = null;
    },
    onEntityUpdateInputHandle: (state, action) => {
      state.action.entityUpdate.input[action.payload.key] =
        action.payload.value;
    },
    onEntityDeleteTriggerHandle: (state, action) => {
      state.action.entityDelete.id = action.payload;
    },
    onEntityDeleteCancelHandle: (state) => {
      state.action.entityDelete.id = null;

      state.action.entityDelete.error = null;
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
      .addCase(entityUpdate.pending, (state) => {
        state.action.entityUpdate.loading = true;

        state.action.entityUpdate.error = null;
      })
      .addCase(entityUpdate.fulfilled, (state, action) => {
        state.action.entityUpdate.loading = false;

        action.payload._error
          ? (state.action.entityUpdate.error = action.payload)
          : entityAdapter.updateOne(state, action.payload);
      })
      .addCase(entityDelete.pending, (state) => {
        state.action.entityDelete.loading = true;

        state.action.entityDelete.error = null;
      })
      .addCase(entityDelete.fulfilled, (state, action) => {
        state.action.entityDelete.loading = false;

        action.payload._error
          ? (state.action.entityDelete.error = action.payload)
          : entityAdapter.removeOne(state, action.payload.id);
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

export const {
  onEntityCreateInputHandle,
  onEntityUpdateTriggerHandle,
  onEntityUpdateCancelHandle,
  onEntityUpdateInputHandle,
  onEntityDeleteTriggerHandle,
  onEntityDeleteCancelHandle
} = slice.actions;

export default slice.reducer;

export const entitySelector = entityAdapter.getSelectors((state) => state.post);

export const entityCreateSelector = (state) => {
  const { loading, error, input } = state.post.action.entityCreate;

  return [loading, error, input];
};

export const entityUpdateSelector = (state) => {
  const { loading, error, id, input } = state.post.action.entityUpdate;

  return [loading, error, id, input];
};

export const entityDeleteSelector = (state) => {
  const { loading, error, id } = state.post.action.entityDelete;

  return [loading, error, id];
};

export const entityCollectionGetSelector = (state) => {
  const { loading, error } = state.post.action.entityCollectionGet;

  const hasMore = state.post.meta.hasMore;

  const entityCollection = entitySelector.selectAll(state);

  return [loading, error, hasMore, entityCollection];
};
