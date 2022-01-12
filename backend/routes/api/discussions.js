const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { User, Discussion } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

module.exports = router;
