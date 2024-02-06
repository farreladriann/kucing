const express = require('express')
const router = express.Router();
const TimController = require('../controller/TimLombaController')



// Router user (Repal)
router.route('/:namaLomba').post(TimController.createTim)
router.route('/:idTim').delete(TimController.deleteTim)
router.route('/join-tim').post(TimController.joinTim)
router.route('/:idTim/generate-new-token').patch(TimController.generateNewToken)
/* 
    - POST buat tim (body : Nama tim, jenjang pendidikan, jenis lomba, nama tim, ketuanya), nanti bikin tokeninvitation random <NamaTim>-<RandomUUID>
    (bikin middleware agar nama tim g boleh ada karakter unik), tambah tim yang mengikuti pada jenisLomba
    note : cek jg jika tim sudah terdaftar lomba ini ato g, cuman bisa satu anggota per jenis lomba
    - PATCH regenerate token invitation baru (protected middleware) -> (pastiin user pada ketua tim) -> generate token baru gantiin token sebelumnya
    - POST Join Tim dengan body : {tokenInvitation} pastiin maksimal anggota tim adalah 2 (update sheets)
    note : cek jg jika orang sudah terdaftar jenis lomba ini ato g, cuman bisa satu orang per jenis lomba
    - POST Upload file berkasnya pakai multer dan diupload ke drive, delete yg lama misal dia coba menggantikan
    - POST Upload file & jsonnya body: {bank, atasNamaPembayaran, norek} bukti pembayaran pakai multer dan diupload ke drive, delete yg lama misal dia coba menggantikan
*/

// Router user (Wafi)

    //- GET Tim dengan params _id tim 
    router.get('/:id', TimController.getTim)
    //- POST komentar pada model tim dan untuk mengubah verifikasi berkas pada tim
    router.post('komentar', TimController.getTim)
    //- POST Untuk mengubah verifikasi berkas pada user
    




module.exports = router