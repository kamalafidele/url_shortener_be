const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const JWTService = require('../../services/JWTService');
const UrlService = require('../../services/UrlService');

const jwt = JWTService.verifyToken;

router.delete('/:id', jwt, [check('id', 'id of url is required')], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  await UrlService.deleteUrlById(id);

  return res.status(200).json({ status: 'Deleted successfully' });
});

module.exports = router;
