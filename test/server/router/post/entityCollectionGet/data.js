'use strict';

export default {
  text: 'post: entityCollectionGet',
  describe: [
    {
      text: 'inputValidate',
      before: [],
      it: [
        {
          text: 'limit, offset: must have required property',
          argument: {
            query: {}
          },
          error: {
            _error: [
              {
                source: 'root',
                message: "must have required property 'limit'"
              },
              {
                source: 'root',
                message: "must have required property 'offset'"
              }
            ],
            status: 400
          }
        },
        {
          text: 'limit: must be >= 1',
          argument: {
            query: {
              limit: 0,
              offset: 0
            }
          },
          error: {
            _error: [
              {
                source: 'limit',
                message: 'must be >= 1'
              }
            ],
            status: 400
          }
        },
        {
          text: 'offset: must be >= 0',
          argument: {
            query: {
              limit: 1,
              offset: -1
            }
          },
          error: {
            _error: [
              {
                source: 'offset',
                message: 'must be >= 0'
              }
            ],
            status: 400
          }
        }
      ]
    },
    {
      text: 'default',
      before: [
        {
          text: 'entityCreate',
          argument: {
            body: {
              text: 'entity01-text'
            }
          }
        },
        {
          text: 'entityCreate',
          argument: {
            body: {
              text: 'entity02-text'
            }
          }
        },
        {
          text: 'entityCreate',
          argument: {
            body: {
              text: 'entity03-text'
            }
          }
        }
      ],
      it: [
        {
          text: 'result: { collection: [ entity03 ], meta: { query: { ... }, hasMore: true } }',
          argument: {
            query: {
              limit: 1,
              offset: 0
            }
          }
        },
        {
          text: 'result: { collection: [ entity02 ], meta: { query: { ... }, hasMore: true } }',
          argument: {
            query: {
              limit: 1,
              offset: 1
            }
          }
        },
        {
          text: 'result: { collection: [ entity01 ], meta: { query: { ... }, hasMore: false } }',
          argument: {
            query: {
              limit: 1,
              offset: 2
            }
          }
        }
      ]
    }
  ]
};
