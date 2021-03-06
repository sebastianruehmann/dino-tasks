const express = require('express');
const router = express.Router();

const get = require('./get');
const post = require('./post');
const remove = require('./delete');
const put = require('./put');

router.get('/', get.list)
router.get('/:id', get.one)

router.post('/', post.one)

router.delete('/:id', remove.one)

router.put('/:id', put.one)

module.exports = router
