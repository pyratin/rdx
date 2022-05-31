'use strict';

import React, { useRef, useCallback, useEffect, cloneElement } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';

const Modal = (_props) => {
  const { onModalHide, ...props } = _props;

  const ref = /** @type {any} */ (useRef());

  const onModalHideHandle = useCallback(() => {
    return onModalHide();
  }, [onModalHide]);

  const renderInitialize = useCallback(() => {
    BootstrapModal.getOrCreateInstance(ref.current, { backdrop: true }).show();
  }, []);

  const focusInitialize = useCallback(() => {
    const $el = $(ref.current).find('.formControl');

    const length = /** @type {any} */ ($el.val()).length;

    $el.trigger('focus');

    /** @type {any} */ ($el[0]).setSelectionRange(length, length);
  }, []);

  useEffect(() => {
    const refCurrent = ref.current;

    refCurrent.addEventListener('hide.bs.modal', onModalHideHandle);

    renderInitialize();

    focusInitialize();

    return () => {
      return refCurrent.removeEventListener('hide.bs.modal', onModalHideHandle);
    };
  }, [renderInitialize, focusInitialize, onModalHideHandle]);

  const onModalHideTriggerHandle = () => {
    return BootstrapModal.getOrCreateInstance(ref.current).hide();
  };

  const modalRender = () => {
    return (
      <div ref={ref} className='modal' tabIndex={-1}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{props.title}</h5>

              <button className='btn-close' data-bs-dismiss='modal'></button>
            </div>

            <div className='modal-body'>
              {cloneElement(props.children, {
                onModalHideTrigger: onModalHideTriggerHandle
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const _render = () => {
    return <div>{modalRender()}</div>;
  };

  return <div className='Modal'>{_render()}</div>;
};

export default Modal;
