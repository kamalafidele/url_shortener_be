const router = require('express').Router();
const JWTService = require('../../services/JWTService');
const UrlService = require('../../services/UrlService');

const jwt = JWTService.verifyToken;

router.get('/', jwt, async (req, res, next) => {
  try {
    const urls = await UrlService.getUrlsByUser(req.user._id);

    return res.status(200).json({ urls });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;
