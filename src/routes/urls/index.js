const router = require('express').Router();

router.use('/', require('./get.url[identifier]'));
router.use('/', require('./get.urls'));
router.use('/', require('./delete.url'));
router.use('/', require('./post.url'));

module.exports = router;
