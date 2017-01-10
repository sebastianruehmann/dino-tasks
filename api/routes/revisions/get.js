const Revision = require('./../../models/revision')
const Tasklist = require('./../../models/tasklist')

module.exports.list = function (req, res) {
  Revision.find({}, function (err, response) {
    if (err) {
      throw err;
    }

    res.json(response);
  })
}

module.exports.one = function (req, res) {
  const revisionId = req.params.id;

  Revision.findOne({
    '_id': revisionId
  })
  .populate('_tasklistId')
  .exec(function (err, response) {
    if (err) {
      return handleError(err);
    }

    res.json(response)
  })
});
}
