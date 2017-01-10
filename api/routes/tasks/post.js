const Task = require('./../../models/task')

module.exports.one = function (req, res) {
  const newTask = new Task({
      _tasklistId: req.body._tasklistId,
      subject: req.body.subject ? req.body.subject : '',
      description: req.body.description,
      state: req.body.state,
      deadline: req.body.deadline
  });

  newTask.save(function (err, response) {
      if( err ) throw err;

      res.json(response);
  })
}
