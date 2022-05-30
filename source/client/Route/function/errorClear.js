'use strict';

export default (refCurrent) => {
  return $(refCurrent)
    .find('.formControl')
    .removeClass('is-invalid')
    .parents('.inputGroup')
    .find('.invalidFeedback')
    .text('');
};
