const express = require('express');
const router = express.Router();

const get = require('./get');
const post = require('./post');
// const delete = require('./delete');
const put = require('./put');

// router.get('/', get.list)
// router.get('/:id', get.one)

router.post('/', post.one)

// router.delete('/:id', delete.one)

router.put('/:id', put.one)

module.exports = router
