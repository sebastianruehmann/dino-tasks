const mongoose = require('mongoose')
const settings = require('../settings.js')

module.exports = function () {
  var dbHost = 'mongodb://localhost/' + settings.database;
  mongoose.connect(dbHost);
}
