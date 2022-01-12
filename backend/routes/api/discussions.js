const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Product, User, Discussion } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
// validation middleware
const validateDiscussion = [
  check('userId')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('No User specified for discussion'),
  check('productId')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('No product specified for discussion.'),
  check('discussion')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Discussion field cannot be empty.'),
  handleValidationErrors,
];

const router = express.Router();

// POST /discussions
router.post('/', validateDiscussion, restoreUser, asyncHandler(async(req, res, next) => {
  // check if user is in session
  const { user } = req;
  if (!user) {
    const err = new Error('You are not logged in');
    err.status = 401;
    err.title = 'You are not logged in';
    err.errors = ['Cannot create discussion if you are not logged in'];
    return next(err);
  }
  const { userId, productId, discussion } = req.body;

  // check if user and product exists in database
  const userdb = await User.findByPk(userId);
  const productdb = await Product.findByPk(productId);
  if (!userdb) {
    const err = new Error('User does not exist in the database.');
    err.status = 403;
    err.title = 'User does not exist in the database';
    err.errors = ['User does not exist in the database'];
    return next(err);
  }

  if (!productdb) {
    const err = new Error('Product does not exist in the database.');
    err.status = 403;
    err.title = 'Product does not exist in the database';
    err.errors = ['Product does not exist in the database'];
    return next(err);
  }

  const discussiondb = await Discussion.create({
    userId,
    productId,
    discussion
  });

  return res.json({ discussion: discussiondb });
}));

// DELETE /discussions/:id
router.delete('/:id', restoreUser, asyncHandler(async (req, res, next) => {
  const { user } = req;
  if (!user) {
    const err = new Error('You are not logged in');
    err.status = 401;
    err.title = 'You are not logged in';
    err.errors = ['Cannot create discussion if you are not logged in'];
    return next(err);
  }


  const id = parseInt(req.params.id, 10);
  const discussion = await Discussion.findByPk(id);
  if (discussion) {
    if (user.id !== discussion.userId) {
      const err = new Error('You are not the owner of this discussion');
      err.status = 403;
      err.title = 'You are not the owner of this discussion';
      err.errors = ['Cannot delete discussion: You are not the owner of this discussion'];
      return next(err);
    }
    console.log(user.id, discussion.userId);
    await discussion.destroy();
    return res.json({ message: 'delete successful' });
  }

  return res.json({ message: 'no discussion found' });
}));

module.exports = router;
