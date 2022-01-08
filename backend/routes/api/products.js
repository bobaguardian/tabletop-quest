const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Product, User } = require('../../db/models');
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
  console.log(products);
  return res.json({ products });
}));

// POST /products
router.post('/', validateProduct, asyncHandler(async (req, res) => {
  const { userId, title, imageSrc, description } = req.body;
  const newProduct = await Product.create({
    userId,
    title,
    imageSrc,
    description
  });

  return res.json({ newProduct });
}));

// fetch('/api/products', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     "XSRF-TOKEN": `CDUp4ooZ--hHE5ebRjhm_kr_vC4-YVgjPRfk`
//   },
//   body: JSON.stringify({
//     userId: 1,
//     title: "Test3 New Product",
//     imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
//     description: "Testing POST /api/products - invalid image src"
//   })
// }).then(res => res.json()).then(data => console.log(data));

// PUT /products/:id
router.put('/:id', validateProduct, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {  title, description, imageSrc } = req.body
  const product = await Product.findByPk(id);

  // TODO: MAKE SURE TO FORM PREFILL ON FRONTEND
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
    await product.destroy();
    return res.json({ message: 'delete successful' });
  }

  return res.json({ message: 'no product found' });
}));



module.exports = router;
