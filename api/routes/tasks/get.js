const Task = require('./../../models/task')

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
