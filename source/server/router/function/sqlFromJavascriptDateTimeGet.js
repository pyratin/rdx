'use strict';

import { DateTime } from 'luxon';

export default (input) => {
  return DateTime.fromJSDate(input)
    .toSQL({ includeOffset: false });
};
