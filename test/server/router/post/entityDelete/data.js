'use strict';

export default {
  text: 'post: entityDelete',
  describe: [
    {
      text: 'inputValidate',
      before: [],
      it: [
        {
          text: 'id: invalid',
          argument: {
            params: {
              id: 'x'
            }
          },
          error: {
            _error: [
              {
                source: 'id',
                message: 'invalid'
              }
            ],
            status: 400
          }
        },
        {
          text: 'entity: not found',
          argument: {
            params: {
              id: 'bb2b567e-e931-495a-91d4-12dbcd061cb2'
            }
          },
          error: {
            _error: [
              {
                source: 'entity',
                message: 'not found'
              }
            ],
            status: 404
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
        }
      ],
      it: [
        {
          text: 'result: { id }'
        }
      ]
    }
  ]
};
