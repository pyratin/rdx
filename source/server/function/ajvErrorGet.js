'use strict';

const errorSourceGet = (errorInstancePath) => {
  switch (errorInstancePath) {
    case '':
      return 'root';

    default:
      return errorInstancePath.replace(/^\//, '');
  }
};

export default (__error) => {
  const _error = __error.map((e) => {
    return {
      source: errorSourceGet(e.instancePath),
      message: e.message
    };
  });

  return {
    _error,
    status: 400
  };
};
