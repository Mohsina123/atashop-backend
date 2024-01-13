const mongoose = require('mongoose');
const constants = require('../config/constants');

const autoIncrement = require('mongoose-auto-increment');

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect(constants.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
  mongoose.set('debug', function (coll, method, query) {

   });
});
mongoose.connection.on('error', (err) => {
  throw err;
});

autoIncrement.initialize(mongoose.connection);