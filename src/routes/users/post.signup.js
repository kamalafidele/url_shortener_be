const express = require('express');
const { check, validationResult } = require('express-validator');
const UserService = require('../../services/UserService');

const router = express.Router();

router.post(
  '/register',
  [
    check('firstName', 'FirstName is required').exists(),
    check('lastName', 'LastName is required').exists(),
    check('email').exists().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;
    const mail = email.toLowerCase();

    try {
      const checkMail = await UserService.getUserByEmail(mail);
      if (checkMail) return res.status(400).json({ status: 'Email Already Exist' });

      const user = await UserService.create({
        firstName,
        lastName,
        email: mail,
        password,
      });

      return res.status(200).json({ jwt_token: user.createToken(), user });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;
