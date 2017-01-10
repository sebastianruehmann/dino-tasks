const Tasklist = require('./../../models/tasklist')

module.exports.one = function (req, res) {
  const tasklistId = req.body.id;

  Tasklist.remove({ _id: tasklistId }, function (err, response) {
    if( err ) {
      throw err;
    }

    res.json(response);
  })
}
