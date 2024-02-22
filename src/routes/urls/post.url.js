const router = require('express')();
const { v4: uuidv4 } = require('uuid');
const { validationResult, check } = require('express-validator');
const JWTService = require('../../services/JWTService');
const UrlService = require('../../services/UrlService');

const jwt = JWTService.verifyToken;

router.post(
  '/',
  jwt,
  [
    check('original_link', 'Original link is required').exists(),
    check('expirationDate', 'Expiration date is required').exists(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { FE_HOST } = process.env;
    const { original_link, expirationDate } = req.body;

    try {
      const identifier = uuidv4();
      const shareable_link = FE_HOST + identifier;

      const data = { original_link, user: req.user._id, uniqueIdentifier: identifier, expirationDate, shareable_link };
      const createdUrl = await UrlService.save(data);

      return res.status(201).json({ success: true, url: createdUrl });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
);
module.exports = router;
