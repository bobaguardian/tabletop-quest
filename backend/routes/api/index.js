const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = require('express').Router();

// test api route
router.post('/test', function(req, res){
  res.json({ requestBody: req.body });
});

module.exports = router;
