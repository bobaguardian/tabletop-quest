const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');
const { Router } = require('express');

const router = express.Router();

// validation middleware
const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

// Log in
router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.login({ email, password });

  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  await setTokenCookie(res, user);
  return res.json({ user });
}));

// Log out
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

// Restore session user - will return session user as JSON as key user
// if there is no session, return JSON empty object
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({ user: user.toSafeObject() });
  } else return res.json({});
});

module.exports = router;
