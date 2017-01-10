const Task = require('./../../models/task')

module.exports.one = function (req, res) {
  const query = {
      subject: req.body.subject,
      description: req.body.description,
      state: req.body.state,
      deadline: req.body.deadline
  }

  if(typeof req.body._tasklistId !== 'undefined') {
      query._tasklistId = req.body._tasklistId
  }

  Task.findByIdAndUpdate(req.params.id, {
      $set: query
  }, function (err, response) {
      if( err ) throw err;

      res.json(response);
  })
}
