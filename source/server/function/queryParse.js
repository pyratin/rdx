'use strict';

const valueGet = (value) => {
  switch (true) {
    case !isNaN(Number(value)):
      return Number(value);

    default:
      return value;
  }
};

export default (request, response, next) => {
  request.query = Object.entries(request.query).reduce(
    (memo, [key, _value]) => {
      const value = valueGet(_value);

      return {
        ...memo,
        [key]: value
      };
    },
    {}
  );

  return next();
};
