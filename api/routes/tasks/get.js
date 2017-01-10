const Task = require('./../../models/task')

module.exports.list = function (req, res) {
  Tasklist.find({}, function (err, response) {
    if (err) {
      throw err;
    }

    res.json(response);
  })
}

module.exports.one = function (req, res) {
  const taskId = req.params.id;

  Task.findOne({
    '_id': req.params.id
  }, function (err, response) {
    if( err ) {
      throw err;
    }

    res.json(response);
  })
}
