const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));//200
});

// router.get('/test(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));//200
// });
// sama aja kea
router.route('/test(.html)?')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));//200
    });

module.exports = router;