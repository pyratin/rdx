'use strict';

import React, { useCallback, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactInfiniteScroller from 'react-infinite-scroller';

import {
  entityCollectionGet,
  entityCollectionGetSelector
} from 'client/store/post';
import EntityCreate from 'client/Route/Post/component/EntityCreate';

const EntityCollection = () => {
  let limit = 1;

  const dispatch = /** @type {any} */ (useDispatch());

  const [loading, , hasMore, entityCollection] = useSelector((state) => {
    return entityCollectionGetSelector(state);
  });

  const _entityCollectionGet = useCallback(
    (query) => {
      return dispatch(entityCollectionGet(query));
    },
    [dispatch]
  );

  useEffect(() => {
    _entityCollectionGet({
      limit,
      offset: 0
    });
  }, [_entityCollectionGet, limit]);

  const onLoadMoreHandle = () => {
    return (
      !loading &&
      _entityCollectionGet({
        limit,
        offset: entityCollection.length
      })
    );
  };

  const entityCreateRender = () => {
    return <EntityCreate />;
  };

  const entityRender = (entity) => {
    return (
      <Fragment key={entity.id}>
        <div>{entity.text}</div>
      </Fragment>
    );
  };

  const entityCollectionRender = () => {
    return entityCollection.map((entity) => {
      return entityRender(entity);
    });
  };

  const reactInfiniteScrollerRender = () => {
    return (
      <ReactInfiniteScroller loadMore={onLoadMoreHandle} hasMore={hasMore}>
        {entityCreateRender()}
        {entityCollectionRender()}
      </ReactInfiniteScroller>
    );
  };

  const _render = () => {
    return <div>{reactInfiniteScrollerRender()}</div>;
  };

  return <div className='EntityCollection'>{_render()}</div>;
};

export default EntityCollection;
