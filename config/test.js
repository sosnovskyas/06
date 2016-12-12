'use strict';
module.exports = {
  host: '127.0.0.1',
  port: 5000,
  mongoose: {
    uri: 'mongodb://127.0.0.1/hw6',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize: 5
      }
    }
  },

};