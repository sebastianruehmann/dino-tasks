const Tasklist = require('./../../models/tasklist')

module.exports.one = function (req, res) {
  const newTasklist = new Tasklist({
      title: req.body.title,
      description: req.body.description
  });

  newTasklist.save(function (err, response) {
      if( err ) throw err;

      res.json(response);
  })
}
