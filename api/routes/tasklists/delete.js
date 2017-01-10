const Tasklist = require('./../../models/tasklist')

module.exports.one = function (req, res) {
  const tasklistId = req.params.id;

  Tasklist.findByIdAndUpdate(tasklistId, {
      $set: {
          title: req.body.title,
          description: req.body.description
      }
  }, function (err, response) {
      if( err ) throw err;

      res.json(response);
  })
}
