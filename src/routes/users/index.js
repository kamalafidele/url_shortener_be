const router = require('express').Router();

router.use('/', require('./post.login'));
router.use('/', require('./post.signup'));

module.exports = router;
