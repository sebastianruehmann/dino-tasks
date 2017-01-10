const Revision = require('./../../models/task')

module.exports.one = function (req, res) {
  const revisionId = req.body.id;

  Revision.remove({ _id: revisionId }, function (err, response) {
    if( err ) {
      throw err;
    }

    res.json(response);
  })
}
