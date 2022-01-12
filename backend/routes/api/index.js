const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const productsRouter = require('./products');
const discussionsRouter = require('./discussions');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/discussions', discussionsRouter);

// test api route
router.post('/test', function(req, res){
  res.json({ requestBody: req.body });
});

module.exports = router;
