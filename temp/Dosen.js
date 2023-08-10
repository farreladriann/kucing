const mongoose = require('mongoose')

const dosenSchema = new mongoose.Schema({
    Nama: {
        type: String,
        required: true
    },
    Jenis: {
        type: String,
        enum: ['Tendik', 'Dosen', 'tendik', 'dosen'],
        required: true
    },
    isAmbilKaos: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const Dosen = mongoose.model('Dosen', dosenSchema)

module.exports = Dosen