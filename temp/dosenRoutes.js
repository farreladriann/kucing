const router = require('express').Router()
const dosenController = require('../controllers/dosenController')

router.route('/')
    .get(dosenController.getAllDosen)
    .post(dosenController.tambahSatuDosen)
    .patch(dosenController.updateDosen)
    .delete(dosenController.deleteDosen)

router.route('/:id')
    .get(dosenController.getOneDosen)

module.exports = router;