const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const productsRouter = require('./products');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);

// test api route
router.post('/test', function(req, res){
  res.json({ requestBody: req.body });
});

module.exports = router;
