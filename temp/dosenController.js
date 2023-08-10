const Dosen = require("../models/Dosen");

exports.getAllDosen = async (req, res, next) => {
    try {
        const allDosen = await Dosen.find().lean();
        res.json(allDosen);
    } catch (err) {
        next(err); //kesalahan ditanggung server
    }
};

exports.tambahSatuDosen = async (req, res, next) => {
    try {
        const { Nama, Jenis, isAmbilKaos } = req.body;
        if (!Nama || !Nama.length)
            return res.status(400).json({ message: "Nama requested" });
        else if (!Jenis || !Jenis.length)
            return res.status(400).json({ message: "Jenis requested" });
        else if (isAmbilKaos === undefined || isAmbilKaos === null)
            return res.status(400).json({ message: "isAmbilKaos requested" });

        if (Jenis === 'dosen' || Jenis === 'Dosen' || Jenis === 'tendik' || Jenis === 'Tendik') {
            
        }
        else
            return res.status(400).json({ message: 'Isi dengan dosen atau tendik' });
        const dosenBaru = await Dosen.create({
            Nama: Nama,
            Jenis: Jenis,
            isAmbilKaos: isAmbilKaos
        });
        res.status(200).json(await Dosen.find());
    } catch (err) {
        next(err); //kesalahan ditanggung server
    }
};

exports.updateDosen = async (req, res, next) => {
    try {
        const { id, Nama, Jenis, isAmbilKaos } = req.body;
        if (!id) return res.status(400).json({ message: "Invalid ID" });
        const foundDosen = await Dosen.findOne({ _id: id }).exec();
        if (foundDosen) {
            if (Nama && Nama.length > 0) foundDosen.Nama = Nama;
            if (Jenis && Jenis.length > 0) foundDosen.Jenis = Jenis;
            if (isAmbilKaos !== undefined) foundDosen.isAmbilKaos = isAmbilKaos;
            const result = await foundDosen.save();
            res.json({ message: `Dosen with name ${result.Nama} already updated` });
        } else {
            res.status(400).json({
                message: `Dosen dengan ID ${id} tidak ditemukan`,
            });
        }
    } catch (err) {
        next(err); //kesalahan ditanggung server
    }
};

exports.deleteDosen = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ message: "Invalid ID" });
        const foundDosen = await Dosen.findOne({ _id: id }).exec();
        if (foundDosen) {
            const result = await foundDosen.deleteOne();
            res.json({
                message: `Dosen dengan nama ${result.Nama} berhasil dihapus`,
            });
        } else {
            res.status(400).json({
                message: `Dosen dengan ID ${id} tidak ditemukan`,
            });
        }
    } catch (err) {
        next(err); //kesalahan ditanggung server
    }
};

exports.getOneDosen = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Invalid ID" });
        const foundDosen = await Dosen.findOne({ _id: id })
            .lean()
            .exec();
        if (foundDosen) {
            res.json(foundDosen);
        } else {
            res.status(400).json({
                message: `Dosen dengan ID ${id} tidak ditemukan`,
            });
        }
    } catch (err) {
        next(err); //kesalahan ditanggung server
    }
};
