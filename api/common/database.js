const mongoose = require('mongoose')
const settings = require('../settings')
const log = require('./logging')

module.exports = function () {
  var dbHost = 'mongodb://localhost/' + settings.database;
  mongoose.connect(dbHost);

  mongoose.connection.on('error', function (err) {
   log.error(err)
  });
}
