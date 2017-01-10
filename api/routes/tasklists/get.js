const Tasklist = require('./../../models/tasklist')
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
  const tasklistId = req.params.id;

  Tasklist.findOne({
    '_id': tasklistId
  }, function (err, response) {
    if( err ) {
      throw err;
    }

    Task.find({
      '_tasklistId': req.params.id
    }).
    select('-_tasklistId').
    sort('subject').
    exec(function (err, tasksResponse) {
      response = response.toJSON();
      response.tasks = tasksResponse;

      res.json(response);
    })
  })
}
