const router = require('express').Router();

router.use('/auth/', require('./users'));
router.use('/urls/', require('./urls'));

module.exports = router;
