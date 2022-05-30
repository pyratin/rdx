'use strict';

export default {
  text: 'post: entityUpdate',
  describe: [
    {
      text: 'inputValidate',
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
              id: 'fbb0e99f-faf0-4d56-bd2d-3a522e259189'
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
        },
        {
          text: 'text: must have required property',
          argument: {
            body: {}
          },
          error: {
            _error: [
              {
                source: 'root',
                message: "must have required property 'text'"
              }
            ],
            status: 400
          }
        },
        {
          text: 'text: must NOT have fewer than 1 characters',
          argument: {
            body: {
              text: ''
            }
          },
          error: {
            _error: [
              {
                source: 'text',
                message: 'must NOT have fewer than 1 characters'
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
        }
      ],
      it: [
        {
          text: 'result: { id, ...body, updatedAt }',
          argument: {
            body: {
              text: 'entity01-update'
            }
          }
        }
      ]
    }
  ]
};
