'use strict';

import React, { useCallback, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactInfiniteScroller from 'react-infinite-scroller';

import {
  entityCollectionGet,
  entityCollectionGetSelector
} from 'client/store/post';
import EntityCreate from 'client/Route/Post/component/EntityCreate';
import EntityCollectionItem from 'client/Route/Post/component/EntityCollectionItem';
import EntityCollectionEmpty from 'client/Route/component/EntityCollectionEmpty';
import LoadingInline from 'client/Route/component/LoadingInline';

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

  const entityCollectionEmptyRender = () => {
    return !entityCollection.length && <EntityCollectionEmpty name='post' />;
  };

  const entityCreateRender = () => {
    return <EntityCreate />;
  };

  const dividerRender = (py = 1, mt = 3) => {
    return <div className={`py-${py} mt-${mt} border-top bg-light`}></div>;
  };

  const entityRender = (entity, index) => {
    return (
      <Fragment key={entity.id}>
        <EntityCollectionItem post={entity} />
        {index < entityCollection.length - 1 && dividerRender(0)}
      </Fragment>
    );
  };

  const entityCollectionRender = () => {
    return entityCollection.map((entity, index) => {
      return entityRender(entity, index);
    });
  };

  const reactInfiniteScrollerRender = () => {
    return (
      <ReactInfiniteScroller loadMore={onLoadMoreHandle} hasMore={hasMore}>
        {entityCollectionRender()}
      </ReactInfiniteScroller>
    );
  };

  const loadingRender = () => {
    return (
      loading && (
        <div className='d-flex justify-content-center m-3'>
          <LoadingInline />
        </div>
      )
    );
  };

  const _render = () => {
    return (
      <div>
        {entityCreateRender()}
        {dividerRender()}
        {entityCollectionEmptyRender()}
        {reactInfiniteScrollerRender()}
        {loadingRender()}
      </div>
    );
  };

  return <div className='EntityCollection'>{_render()}</div>;
};

export default EntityCollection;
