const Task = require('./../../models/task')

module.exports.one = function (req, res) {
  const taskId = req.body.id;

  Task.remove({ _id: taskId }, function (err, response) {
    if( err ) {
      throw err;
    }

    res.json(response);
  })
}
