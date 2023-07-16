const express = require('express');
const router = express.Router();
const refreshTokenController = require('../../controllers/refreshTokenController');
const { get } = require('./employees');

router.route('/')
    .get((req, res, next) => {
        console.log(req.cookies);
        next();
    })
    .get(refreshTokenController.handleRefreshToken);

module.exports = router;