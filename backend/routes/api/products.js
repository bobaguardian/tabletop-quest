const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const { Product, User, Discussion } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// validation middleware
const validateProduct = [
  check('userId')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage('You are not logged in.'),
  check('title')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage('Please provide a title.'),
  check('title')
    .isLength({ max: 50 })
    .withMessage('Title cannot be more than 50 characters long.'),
  check('imageSrc')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage('Please provide an image url.'),
  check('imageSrc')
    .isLength({ max: 255 })
    .withMessage('Image url cannot be more than 255 characters long'),
  check('imageSrc')
    .isURL()
    .withMessage('Please provide a valid url.'),
  check('description')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage('Please provide a description.'),
  handleValidationErrors,
];

// GET /products
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    include: User,
    order: [['updatedAt', 'DESC']]
  });
  return res.json({ products });
}));

// POST /products
router.post('/', validateProduct, asyncHandler(async (req, res) => {
  const { userId, title, imageSrc, description } = req.body;
  const product = await Product.create({
    userId,
    title,
    imageSrc,
    description
  });

  return res.json({ product });
}));

// PUT /products/:id
router.put('/:id', validateProduct, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {  title, description, imageSrc } = req.body;
  const product = await Product.findByPk(id);

  // fetch request requires all fields (userId, title, description, imageSrc)
  if (product) {
    await product.update({
      title,
      description,
      imageSrc
    });
    await product.save();
    return res.json({ message: 'update successful' });
  }

  return res.json({ message: 'no product found' });
}));

// DELETE /products/:id
router.delete('/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = await Product.findByPk(id);
  if (product) {
    // Destroy all Discussions for the product first
    const discussions = await Discussion.findAll({
      where: {productId: id}
    });

    for (let i = 0; i < discussions.length; i++) {
      const discussion = discussions[i];
      await discussion.destroy();
    }

    await product.destroy();
    return res.json({ message: 'delete successful' });
  }

  return res.json({ message: 'no product found' });
}));

// GET /products/:id - SINGLE PRODUCT
router.get('/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = await Product.findByPk(id);
  if (product) {
    return res.json({ product });
  }
  return res.json({ message: 'no product found'});
}))

// GET /products/:id/discussions
// Gets all discussions of that associated prodcutId
router.get('/:id/discussions', asyncHandler(async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const discussions = await Discussion.findAll({
    where: { productId },
    include: User,
    order: [['updatedAt', "DESC"]]
  });

  return res.json({ discussions });

}));

// GET /products/search/:query
// Gets all products that match a search query
router.get('/search/:query', asyncHandler(async(req, res) => {
  const searchQuery = req.params.query;
  const products = await Product.findAll({
    where: {title: { [Op.iLike]: '%' + searchQuery + '%'}}
  });
  return res.json({ products });
}))

module.exports = router;
