'use strict';

export default (input) => {
  return Object.entries(input).reduce((memo, [key, value]) => {
    return {
      ...memo,
      [key]: { const: value }
    };
  }, {});
};
