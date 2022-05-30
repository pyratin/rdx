'use strict';

export default {
  text: 'post: entityCreate',
  describe: [
    {
      text: 'inputValidate',
      before: [],
      it: [
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
      before: [],
      it: [
        {
          text: 'result: { id, ...body, createdAt, updatedAt }',
          argument: {
            body: {
              text: 'entity01-text'
            }
          }
        }
      ]
    }
  ]
};
