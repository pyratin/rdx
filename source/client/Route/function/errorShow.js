'use strict';

const _errorShow = ({ source, message }, refCurrent) => {
  return $(refCurrent)
    .find(`[data-key="${source}"]`)
    .addClass('is-invalid')
    .parents('.inputGroup')
    .find('.invalidFeedback')
    .text(message);
};

export default (error, refCurrent) => {
  return error._error.map((e) => {
    return _errorShow(e, refCurrent);
  });
};
