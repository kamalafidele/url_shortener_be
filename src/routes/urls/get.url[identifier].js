const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const JWTService = require('../../services/JWTService');
const UrlService = require('../../services/UrlService');

router.get(
  '/:uniqueIdentifier',
  [check('uniqueIdentifier', 'uniqueIdentifier of URL is required')],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { uniqueIdentifier } = req.params;
      const url = await UrlService.getUrlByUniqueIdentifier(uniqueIdentifier);
      if (url) {
        await UrlService.updateUrlById(url._id, { $inc: { clicks: 1 } });
      }

      const expired = url ? new Date() > new Date(url.expirationDate) : false;
      return res.status(200).json({ url, expired });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;
