'use strict';

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  entityUpdateSelector,
  onEntityUpdateCancelHandle
} from 'client/store/post';
import EntityDisplay from 'client/Route/Post/component/EntityDisplay';
import EntityControl from 'client/Route/Post/component/EntityControl';
import Modal from 'client/Route/component/Modal';
import EntityUpdate from 'client/Route/Post/component/EntityUpdate';

const EntityCollectionItem = (props) => {
  const dispatch = useDispatch();

  const [, , id] = useSelector((state) => {
    return entityUpdateSelector(state);
  });

  const onModalHideHandle = useCallback(() => {
    return dispatch(onEntityUpdateCancelHandle());
  }, [dispatch]);

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
      id === props.post.id && (
        <Modal title='edit' onModalHide={onModalHideHandle}>
          <EntityUpdate post={props.post} />
        </Modal>
      )
    );
  };

  const _render = () => {
    return (
      <div>
        {_entityDisplayRender()}
        {entityUpdateRender()}
      </div>
    );
  };

  return <div className='EntityCollectionItem'>{_render()}</div>;
};

export default EntityCollectionItem;
