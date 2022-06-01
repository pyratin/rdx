'use strict';

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  entityUpdateSelector,
  entityDeleteSelector,
  onEntityUpdateCancelHandle,
  onEntityDeleteCancelHandle
} from 'client/store/post';
import EntityDisplay from 'client/Route/Post/component/EntityDisplay';
import EntityControl from 'client/Route/Post/component/EntityControl';
import Modal from 'client/Route/component/Modal';
import EntityUpdate from 'client/Route/Post/component/EntityUpdate';
import EntityDelete from 'client/Route/Post/component/EntityDelete';

const EntityCollectionItem = (props) => {
  const dispatch = useDispatch();

  const [ , , entityUpdateId] = useSelector((state) => {
    return entityUpdateSelector(state);
  });

  const [ , , entityDeleteId] = useSelector((state) => {
    return entityDeleteSelector(state);
  });

  const onModalHideHandle = useCallback(() => {
    switch (true) {
      case !!entityUpdateId:
        return dispatch(onEntityUpdateCancelHandle());

      case !!entityDeleteId:
        return dispatch(onEntityDeleteCancelHandle());
    }
  }, [entityUpdateId, entityDeleteId, dispatch]);

  const entityControlRender = () => {
    return (
      <div className='d-flex justify-content-end'>
        <EntityControl post={props.post} />
      </div>
    );
  };

  const entityDisplayRender = () => {
    return <EntityDisplay post={props.post} />;
  };

  const _entityDisplayRender = () => {
    return (
      <div>
        {entityControlRender()}
        {entityDisplayRender()}
      </div>
    );
  };

  const entityUpdateRender = () => {
    return (
      entityUpdateId === props.post.id && (
        <Modal title='edit' onModalHide={onModalHideHandle}>
          <EntityUpdate post={props.post} />
        </Modal>
      )
    );
  };

  const entityDeleteRender = () => {
    return (
      entityDeleteId === props.post.id && (
        <div>
          <Modal title='delete' onModalHide={onModalHideHandle}>
            <EntityDelete post={props.post}/>
          </Modal>
        </div>
      )
    );
  };

  const _render = () => {
    return (
      <div>
        {_entityDisplayRender()}
        {entityUpdateRender()}
        {entityDeleteRender()}
      </div>
    );
  };

  return <div className='EntityCollectionItem'>{_render()}</div>;
};

export default EntityCollectionItem;
