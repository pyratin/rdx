'use strict';

export default (query) => {
  return Object.entries(query)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
};
