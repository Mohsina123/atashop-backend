/***
  * REQUIRED PARAMETERS
***/
exports.REQUIRED_PARAMETERS = {

  // USERS
  'POST_/userBasics/': {
    body: [
      { name: 'name', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'place', type: 'string' },
      { name: 'phone', type: 'string' },
      { name: 'password', type: 'string' },
    ]
  }, 

  'POST_/userBasics/login': {
    body: [
      { name: 'email', type: 'string' },
      { name: 'password', type: 'string' }
    ]
  },

  'GET_/userBasics/': {
   
  },

  'GET_/userBasics/:id': {
    params: [
      { name: 'id', type: 'string' },
    ]
  },
  
  'PUT_/userBasics/:id': {
    body: [
      { name: 'name', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'place', type: 'string' },
      { name: 'phone', type: 'string' },
    ]
  },

  'DELETE_/userBasics/:id': {
    params: [
      { name: 'id', type: 'string' },
    ]
  },

  'GET_/userBasics/:id/receipt': {
    params: [
      { name: 'id', type: 'string' },
    ]
  },

  'GET_/userBasics/send-email/:id': {
    params: [
      { name: 'id', type: 'string' },
    ]
  },

};
