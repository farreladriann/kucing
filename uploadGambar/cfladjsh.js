const { Tim, Peserta } = require("../models/Peserta");
const ErrorHandler = require("../middleware/errorHandler");
const { v4: uuidv4 } = require("uuid");
const {
  SaveOneFileToDrive,
  DeleteFileInDrive,
  createFolder,
} = require("../services/CRUDFileToDrive");
const emailAddress = [
  'muhamadfarreladrian@mail.ugm.ac.id',
  'lustrumdteti@gmail.com',
  'wafiafdi@gmail.com',
  'yitzhakedmundtiomanalu@mail.ugm.ac.id'
]

const fileIdToLink = (fileId) => { return `https://drive.google.com/uc?export=view&id=${fileId}` };
const linkToId = (link) => { return link.split("=")[1] };

exports.createTim = async (req, res) => {
  try {
    const { id } = req.params;
    let getJson = JSON.parse(req.body.json);
    // Restructure the previous structure
    req.files.forEach((file) => {
      const splitName = file.fieldname.split(".");

      if (splitName.length === 1) getJson[splitName[0]] = file;
      else if (splitName.length === 2) {
        if (splitName[0].includes("~")) {
          const scndSplit = splitName[0].split("~");
          getJson[scndSplit[0]][parseInt(scndSplit[1])][splitName[1]] = file;
        } else {
          if (!getJson[splitName[0]]) getJson[splitName[0]] = {};
          getJson[splitName[0]][splitName[1]] = file;
        }
      }
    });

    // check SLOT untuk ML dan VALO
    
    const createPeserta = async (pesertaObject, folderId, namaLomba) => {
      const pesertaInstance = new Peserta({
        ...(pesertaObject.hasOwnProperty('foto')) && { foto: fileIdToLink(await SaveOneFileToDrive(pesertaObject.foto, `${namaLomba}-${pesertaObject.nama}-foto`, folderId)) },
        nama: pesertaObject.nama,
        noHP: pesertaObject.noHP,
        email: pesertaObject.email,
        ...(pesertaObject.hasOwnProperty('ingameID') && { ingameID: pesertaObject.ingameID }),
        ...(pesertaObject.hasOwnProperty('discord') && { discord: pesertaObject.discord }),
        identitas: fileIdToLink(await SaveOneFileToDrive(pesertaObject.identitas, `${namaLomba}-${pesertaObject.nama}-identitas`, folderId)),
        buktiFollow: fileIdToLink(await SaveOneFileToDrive(pesertaObject.buktiFollow, `${namaLomba}-${pesertaObject.nama}-buktiFollow`, folderId)),
        buktiTwibbon: fileIdToLink(await SaveOneFileToDrive(pesertaObject.buktiTwibbon, `${namaLomba}-${pesertaObject.nama}-buktiTwibbon`, folderId)),
      });
      await pesertaInstance.save();
      return pesertaInstance._id;
    }

    const {
      userID, // all
      pilihanLomba, // all
      slot, // ml valo
      logoTim, // ml valo and default undefined
      namaTim, // ml valo dance
      instagram, // vocal dance
      coach, // ml valo
      ketuaTim, // all
      anggotaTim, // ml valo dance
      atasNamaPembayaran, // all
      norek, // all
      bank, // all
      buktiBayar // all
    } = getJson;
    
    let countSlot = 0;
    const maximumSlot = 32;
    if (id === "mobilelegend" || id === "valorant")
    {
      const AllTim = await Tim.find({ pilihanLomba: id }).lean();
      AllTim.forEach((tim) => {
        countSlot += tim.slot;
      });
      if (countSlot + slot > maximumSlot)
        return res.status(200).json({ message: "Slot lomba udah full" });
    }
    
    let folderTim;
    if (id === "vocal")
      folderTim = await createFolder(process.env.FOLDER_VOCAL, ketuaTim.nama);
    else if (id === "dance")
      folderTim = await createFolder(process.env.FOLDER_DANCE, ketuaTim.nama);
    else if (id === "mobilelegend")
      folderTim = await createFolder(process.env.FOLDER_MOBILE_LEGEND, ketuaTim.nama);
    else if (id === "valorant")
      folderTim = await createFolder(process.env.FOLDER_VALORANT, ketuaTim.nama);

    const dataTim = {
      // userID: req.user._id,
      pilihanLomba,
      ...(id === "mobilelegend" || id === "valorant") && { slot: slot },
      ...(id === "mobilelegend" || id === "valorant" || id === "dance") && { logoTim: logoTim ? fileIdToLink(await SaveOneFileToDrive(logoTim, `${id}-${namaTim}-logoTim`, folderTim)) : undefined },
      ...(id === "mobilelegend" || id === "valorant" || id === "dance") && { namaTim: namaTim },
      ...(id === "vocal" || id === "dance") && { instagram: instagram },
      ...(id === "mobilelegend" || id === "valorant") && coach && { coach: coach ? (await createPeserta(coach, folderTim, id)) : undefined },
      folderId: folderTim,
      ketuaTim: (await createPeserta(ketuaTim, folderTim, id)),
      ...(id === "mobilelegend" || id === "valorant" || id === "dance") && { anggotaTim: await Promise.all(anggotaTim.map(async (newAnggota) => (await createPeserta(newAnggota, folderTim, id)))) },
      atasNamaPembayaran,
      norek,
      bank,
      buktiBayar: fileIdToLink(await SaveOneFileToDrive(buktiBayar, `${id}-${ketuaTim.nama}-buktiBayar`, folderTim))
    }

    await Tim.create(dataTim);

    const translateLomba = [
      {
        id: "vocal",
        lomba: "Vocal",
      },
      {
        id: "dance",
        lomba: "Dance",
      },
      {
        id: "mobilelegend",
        lomba: "Mobile Legend",
      },
      {
        id: "valorant",
        lomba: "Valorant",
      },
    ];
    const lomba =
      translateLomba[translateLomba.findIndex((p) => p.id === id)].lomba;
    res
      .status(200)
      .send(
        `Akun ${lomba} dari ${
          lomba !== "Vocal" ? "tim " + getJson.namaTim : getJson.ketuaTim.nama
        } telah diterima!`
      );
  } catch (error) {
    console.error(error);

    // Check for specific error conditions and send appropriate responses
    if (error.name === "ValidationError") {
      // Handle validation errors
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: "Validation error", errors });
    } else {
      // Handle other errors
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

exports.getAllTim = async (req, res) => {
  try {
    const getDocumentTim = await Tim.find()
      .populate("ketuaTim")
      .populate({
        path: "anggotaTim",
        model: "Peserta",
        options: { lean: true },
      })
      .populate({
        path: "coach",
        model: "Peserta",
        options: { lean: true },
      })
      .lean();

    // Iterate through documents and handle optional fields
    const documentTim = getDocumentTim.map((tim) => {
      // Handle optional fields: "anggotaTim" and "coach"
      tim.anggotaTim = tim.anggotaTim || [];
      tim.coach = tim.coach || null;

      return tim;
    });

    if (!documentTim?.length) {
      return res.status(400).json({ message: "No tims found" });
    }

    res.json(documentTim);
  } catch (err) {
    next(err);
  }
};

exports.setFeedbackTim = async (req, res) => {
  try {
    const { id } = req.params;
    const { komentar, status } = req.body;

    // Check if komentar is provided in the request body
    if (!komentar && !status)
      return res.status(400).json({ message: "Changes for Komentar or Status is required" });

    // Find and update
    const updateField = {};
    if (komentar) updateField.komentar = komentar;
    if (status) updateField.statusPeserta = status;

    const updatedTim = await Tim.findByIdAndUpdate(
      id,
      updateField,
      { new: true }
    );

    if (!updatedTim)
      return res
        .status(400)
        .json({ message: "No tim found with the provided ID" });

    const findKetua = await Peserta.findById(updatedTim.ketuaTim);

    let message = `Akun dari user ${findKetua.nama}`;
    if (updatedTim.namaTim) message += ` dari tim ${updatedTim.namaTim}`;
    message += ` telah di-update dengan`;
    if (komentar) message += ` komentar: ${updatedTim.komentar}`;
    if (komentar && status) message += ` dan`;
    if (status) message += ` status: ${updatedTim.statusPeserta}`;
    
    // console.log(message);

    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

exports.getOneValorantTim = async (req, res) => {
  try {
    const { id } = req.params;
    const documentTim = await Tim.findOne({ pilihanLomba: "valorant", _id: id })
      .populate("ketuaTim")
      .populate({
        path: "anggotaTim",
        model: "Peserta",
        options: { lean: true },
      })
      .populate({
        path: "coach",
        model: "Peserta",
        options: { lean: true },
      })
      .lean();

    if (!documentTim) {
      return res.status(400).json({ message: "No tims found" });
    }

    res.json(documentTim);
  } catch (err) {
    next(err);
  }
};

exports.getOneMobileLegendTim = async (req, res) => {
  try {
    const { id } = req.params;
    const documentTim = await Tim.findOne({
      pilihanLomba: "mobilelegend",
      _id: id,
    })
      .populate("ketuaTim")
      .populate({
        path: "anggotaTim",
        model: "Peserta",
        options: { lean: true },
      })
      .populate({
        path: "coach",
        model: "Peserta",
        options: { lean: true },
      })
      .lean();

    if (!documentTim) {
      return res.status(400).json({ message: "No tims found" });
    }

    res.json(documentTim);
  } catch (err) {
    next(err);
  }
};

exports.getOneDanceTim = async (req, res) => {
  try {
    const { id } = req.params;
    const documentTim = await Tim.findOne({ pilihanLomba: "dance", _id: id })
      .populate("ketuaTim")
      .populate("anggotaTim")
      .lean();

    if (!documentTim) {
      return res.status(400).json({ message: "No tims found" });
    }

    res.json(documentTim);
  } catch (err) {
    next(err);
  }
};

exports.getOneVocalTim = async (req, res) => {
  try {
    const { id } = req.params;
    const documentTim = await Tim.findOne({ pilihanLomba: "vocal", _id: id })
      .populate("ketuaTim")
      .lean();

    if (!documentTim) {
      return res.status(400).json({ message: "No tims found" });
    }

    res.json(documentTim);
  } catch (err) {
    next(err);
  }
};

exports.getPaymentTim = async (req, res) => {
  try {
    const { id } = req.params;
    const documentTim = await Tim.findOne({ _id: id }).lean();
    const { buktiBayar, atasNamaPembayaran, norek, bank } = documentTim;
    const Pembayaran = {
      buktiBayar,
      atasNamaPembayaran,
      norek,
      bank,
    };
    if (!documentTim) {
      return res.status(400).json({ message: "No tims found" });
    }

    res.json(Pembayaran);
  } catch (err) {
    next(err);
  }
};

exports.getProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;
    const documentPeserta = await Peserta.findOne({ _id: id }).lean();

    if (!documentPeserta) {
      return res.status(400).json({ message: "No pesertas found" });
    }

    res.json(documentPeserta.foto);
  } catch (err) {
    next(err);
  }
};

// Get Request Semua Data User yang menggunakan akun dan pada lomba tersebut
exports.getTimInfo = async (req, res, next) => {
  const { lomba } = req.params;
  const { _id } = req.user;
  try {
    const getTim = await Tim.findOne({ userID: _id, pilihanLomba: lomba })
      .populate("anggotaTim coach ketuaTim")
      .exec();
    if (!getTim) return res.json({ message: "Not Found" }).status(400);
    else {
      return res.status(200).json(getTim);
    }
  } catch (error) {
    next(error);
  }
};

// Post Request untuk user
exports.updatePembayaran = async (req,res,next) => {
  const { lomba } = req.query
  const informasiBayar = JSON.parse(req.body.informasiBayar) || undefined
  const fileBayar = req.files[0] || undefined
  const { _id} = req.user
  if(!informasiBayar.bank || !informasiBayar.norek  || !informasiBayar.atasNamaPembayaran ) {
    return res.status(400).json({message :"Data kurang"})
  }
  // jadiin yg buffer itu pal atau ijal untuk siap" tp belum dikirim

  try {
    const getTim = await Tim.findOne({ userID: _id, pilihanLomba: lomba })
      .populate("anggotaTim coach ketuaTim")
      .exec();
    if (!getTim) return res.status(400).json({ message: "Not Found" });
    else {
      getTim.atasNamaPembayaran = informasiBayar.atasNamaPembayaran
      getTim.bank = informasiBayar.bank
      getTim.norek = informasiBayar.norek
      };
      // ngecek kalo gambar perlu diubah g bukti pembayaran
      if (informasiBayar.buktiBayar) {
        // jika true maka perlu diganti nanti delete yg lama ubah yg baru
        // delete dulu
        await DeleteFileInDrive(linkToId(getTim.buktiBayar));

        if(fileBayar) {
          // barutuh upload yg baru
          

          getTim.buktiBayar = fileIdToLink(await SaveOneFileToDrive(fileBayar, `${getTim.pilihanLomba}-${getTim.ketuaTim.nama}-buktiBayar`, getTim.folderid)); // ganti yg baru itu kalo g ada berati 
        }
        else {
          getTim.buktiBayar = undefined
        }

        
      } else {
        // aman g perlu diganti
      }

      await getTim.save();
      res.status(200).json({ message: "Successful changed" });
    }
    catch (error) {
    next(error);
  }
};

// post request
exports.updateLinkInstagram = async (req, res, next) => {
  const { lomba } = req.params;
  const { instagram } = req.body;
  try {
    let getTim = await Tim.findOne({ userID: _id, pilihanLomba: lomba })
      .populate("anggotaTim coach ketuaTim")
      .exec();
    if (!getTim) return res.status(400).json({ message: "Not Found" });
    else {
      getTim.instagram = instagram;

      await getTim.save();
      res.status(200).json({ message: "Successfully changed" });
    }
  } catch (error) {
    next(error);
  }
};

// keperluan
const { updateObjectTextOnly, updateDanceOnlyText } = require("../utils/checkingFileEdit")
// post request untuk edit data
exports.updateMLAtauValo = async (req, res, next) => {
  const { lomba } = req.params
  const { _id} = req.user
  const dataTim = JSON.parse(req.body.dataTim)
  const fileUpload = req.files
  try {
    const getTim =  await Tim.findOne({userID : _id, pilihanLomba : lomba}).populate('anggotaTim coach ketuaTim').exec()
    if(!getTim) return res.status(401).json({message: "Not found"})
    
    // cek jika logo tim berubah 
    if(dataTim.logoTim) {
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "logoTim") {
          //  ada file baru upload drive bawah sini sm buffer
          await deleteFileInDrive(linkToId(getTim.logoTim));

          getTim.logoTim = fileIdToLink(await SaveOneFileToDrive(fileUpload[i], `${getTim.pilihanLomba}-${getTim.namaTim}-logoTim`, getTim.folderId)); //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
          break;
        }
        else getTim.logoTim = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      } 
    }


    // cek kapten dulu 
    await updateObjectTextOnly(getTim, "ketua", false, dataTim, 0) // ngeupdate yg dari database untuk ketua
    if(dataTim.ketuaTim?.buktiIdentitas != undefined || dataTim.ketuaTim?.buktiIdentitas != false) {
      // delete drive disini untuk ketua tim identitas
      await deleteFileInDrive(linkToId(getTim.ketuaTim.identitas));


      // cek dulu jika ada file baru
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "buktiIdentitasKetua") {
          //  ada file baru upload drive bawah sini sm buffer


          getTim.ketuaTim.identitas = fileIdToLink(await SaveOneFileToDrive(fileUpload[i], `${getTim.pilihanLomba}-${getTim.ketuaTim.nama}-identitas`, getTim.folderId)); // ganti apa gitu undefined kalo dihapus total tanpa ada ganti sm link baru
          break;
        }
        else getTim.ketuaTim.identitas = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      }
      
    }
    if(dataTim.ketuaTim?.buktiTwibbon != undefined || dataTim.ketuaTim?.buktiTwibbon != false) {
      // delete drive disini untuk ketua tim buktiTwibbon
      await deleteFileInDrive(linkToId(getTim.ketuaTim.buktiTwibbon));


      // cek dulu jika ada file baru
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "buktiTwibbonKetua") {
          //  ada file baru upload drive bawah sini sm buffer



          getTim.ketuaTim.buktiTwibbon = fileIdToLink(await SaveOneFileToDrive(fileUpload[i], `${getTim.pilihanLomba}-${getTim.ketuaTim.nama}-buktiTwibbon`, getTim.ketuaTim.folderId)); //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
          break;
        }
        else getTim.ketuaTim.buktiTwibbon = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      }
    }
    if(dataTim.ketuaTim?.buktiFollow != undefined || dataTim.ketuaTim?.buktiFollow != false) {
      // delete drive disini untuk ketua tim buktiFollow
      await deleteFileInDrive(linkToId(getTim.ketuaTim.buktiFollow));


      // cek dulu jika ada file baru
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "buktiFollowKetua") {
          //  ada file baru upload drive bawah sini sm buffer


          const fileId = await SaveOneFileToDrive(fileUpload[i], `${getTim.pilihanLomba}-${getTim.ketuaTim.nama}-buktiFollow`, getTim.folderId)
          getTim.ketuaTim.buktiFollow = fileIdToLink(fileId); //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
          break;
        }
        else getTim.ketuaTim.buktiFollow = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      }
    }
    getTim.ketuaTim.save(); // save yg peserta itu 

    
    // iterasi bagian anggota
    for (let anggota = 0; anggota < dataTim.anggota.length; anggota++) {
      if(getTim.anggotaTim.length - 1 < anggota) {
        const newPeserta = new Peserta({
          nama: dataTim.anggota[anggota].nama,
          noHP: dataTim.anggota[anggota].noHp,
          email:  dataTim.anggota[anggota].email,
          discord : dataTim.anggota[anggota].discord,
          inGameID :dataTim.anggota[anggota].ingameID
        })
        const data = await newPeserta.save()
        console.log(getTim.anggotaTim)
        getTim.anggotaTim.push({_id : data._id})
        await getTim.save()
        
      }
      // ini save dari json
      await updateObjectTextOnly(getTim, "", true, dataTim, anggota) // ngeupdate yg dari database untuk anggota


      if(dataTim.anggota[anggota].buktiIdentitas != undefined || dataTim.anggota[anggota].buktiIdentitas != false) {
        // delete drive disini untuk anggota tim identitas
        await deleteFileInDrive(linkToId(getTim.anggotaTim[anggota].identitas));
  
  
        // cek dulu jika ada file baru
        for (let i = 0; i < fileUpload.length; i++) {
          if(fileUpload[i].fieldname == `buktiIdentitas${anggota+1}`) {
            //  ada file baru upload drive bawah sini sm buffer
  
  
            const fileId = await SaveOneFileToDrive(fileUpload[i], `${getTim.pilihanLomba}-${getTim.anggotaTim[anggota].nama}-identitas`, getTim.folderId)
            getTim.anggotaTim[i].identitas = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
            break;
          }
        else getTim.anggotaTim[i].identitas = undefined //ini kalo g ada yg diupload atau didelete sm mereka
        }
      }
      if(dataTim.anggota[anggota].buktiTwibbon != undefined || dataTim.anggota[anggota].buktiTwibbon != false) {
        // delete drive disini untuk ketua tim buktiTwibbon
  
  
        // cek dulu jika ada file baru
        for (let i = 0; i < fileUpload.length; i++) {
          if(fileUpload[i].fieldname == `buktiTwibbon${anggota+1}`) {
            //  ada file baru upload drive bawah sini sm buffer
  
  
            getTim.anggotaTim[i].buktiTwibbon = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
            break;
          }
          else getTim.anggotaTim[i].buktiTwibbon = undefined //ini kalo g ada yg diupload atau didelete sm mereka
        }
      }
      if(dataTim.anggota[anggota].buktiFollow != undefined || dataTim.anggota[anggota].buktiFollow != false) {
        // delete drive disini untuk ketua tim buktiFollow
  
  
        // cek dulu jika ada file baru
        for (let i = 0; i < fileUpload.length; i++) {
          if(fileUpload[i].fieldname == `buktiFollow${anggota+1}`) {
            //  ada file baru upload drive bawah sini sm buffer
  
  
            getTim.anggotaTim[i].buktiFollow = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
            break;
          }
          else getTim.anggotaTim[i].buktiFollow = undefined //ini kalo g ada yg diupload atau didelete sm mereka
        }
      }
      getTim.anggotaTim[anggota].save(); // save yg peserta itu
    }

    // cek kalo lomba ini berarti ada coach
    // ini save dari json
    if(getTim.coach == undefined) {
      const newPeserta = new Peserta({
        nama: dataTim.coach.nama,
        noHP: dataTim.coach.noHp,
        email:  dataTim.coach.email,
        discord : dataTim.coach.discord,
        inGameID :dataTim.coach.ingameID
      })
      const data = await newPeserta.save()
      console.log()
      getTim.coach = data._id
      await getTim.save()
      
    }
    await updateObjectTextOnly(getTim, "", false, dataTim, 0) // ngeupdate yg dari database untuk coach
      if(dataTim.coach.buktiIdentitas != undefined || dataTim.coach.buktiIdentitas != false) {
        // delete drive disini untuk coach tim identitas
  
        // cek dulu jika ada file baru
        for (let i = 0; i < fileUpload.length; i++) {
          if(fileUpload[i].fieldname == "buktiIdentitasCoach") {
            //  ada file baru upload drive bawah sini sm buffer
  
  
  
            break;
          }
        }
        getTim.coach.identitas = "" // ganti apa gitu undefined kalo dihapus total tanpa ada ganti sm link baru
      }
      if(dataTim.coach.buktiTwibbon != undefined || dataTim.coach.buktiTwibbon != false) {
        // delete drive disini untuk ketua tim buktiTwibbon
  
  
        // cek dulu jika ada file baru
        for (let i = 0; i < fileUpload.length; i++) {
          if(fileUpload[i].fieldname == "buktiTwibbonCoach") {
            //  ada file baru upload drive bawah sini sm buffer
  
  
  
            getTim.coach.buktiTwibbon = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
            break;
          }
          else getTim.coach.buktiTwibbon = undefined //ini kalo g ada yg diupload atau didelete sm mereka
        }
      }
      if(dataTim.coach.buktiFollow != undefined || dataTim.coach.buktiFollow != false) {
        // delete drive disini untuk ketua tim buktiFollow
  
  
        // cek dulu jika ada file baru
        for (let i = 0; i < fileUpload.length; i++) {
          if(fileUpload[i].fieldname == "buktiFollowCoach") {
            //  ada file baru upload drive bawah sini sm buffer
  
  
  
            getTim.coach.buktiFollow = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
            break;
          }
          else getTim.coach.buktiFollow = undefined //ini kalo g ada yg diupload atau didelete sm mereka
        }
      }
      getTim.coach.save(); // save yg peserta itu
    // bagian terakhir save aja
    getTim.namaTim = dataTim.namaTim
    if(getTim.slot != dataTim.slot) {
      getTim.slot == dataTim.slot
      getTim.statusPeserta == "Belum Terverifikasi"
    }

    await getTim.save()
    return res.status(200).json({message : "Succesfully editted"})

  } catch (error) {
    next(error)
  

  }
}

// Post request untuk dance
exports.updateDance = async (req,res,next) => {
  const dataTim = JSON.parse(req.body.dataTim)
  const fileUpload = req.files


  try {
    const getTim =  await Tim.findOne({userID : _id, pilihanLomba : "dance"}).populate('anggotaTim ketuaTim').exec()
    if(!getTim) return res.status(401).json({message: "Not found"})

    // cek jika logo tim berubah 
    if(dataTim.accPic) {
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "accPic") {
          //  ada file baru upload drive bawah sini sm buffer
          

          getTim.logoTim = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
          break;
        }
        else getTim.logoTim = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      } 
    }


    // cek kapten dulu 
    updateDanceOnlyText(getTim, false, dataTim, 0) // ngeupdate yg dari database untuk ketua
    if(dataTim.ketuaTim.buktiIdentitas) {
      // delete drive disini untuk ketua tim identitas


      // cek dulu jika ada file baru
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "buktiIdentitasKetua") {
          //  ada file baru upload drive bawah sini sm buffer


          getTim.ketuaTim.identitas = "" // ganti apa gitu undefined kalo dihapus total tanpa ada ganti sm link baru
          break;
        }
        else getTim.ketuaTim.identitas = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      }
      
    }
    if(dataTim.ketuaTim.buktiTwibbon) {
      // delete drive disini untuk ketua tim buktiTwibbon


      // cek dulu jika ada file baru
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "buktiTwibbonKetua") {
          //  ada file baru upload drive bawah sini sm buffer



          getTim.ketuaTim.buktiTwibbon = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
          break;
        }
        else getTim.ketuaTim.buktiTwibbon = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      }
    }
    if(dataTim.ketuaTim.buktiFollow) {
      // delete drive disini untuk ketua tim buktiFollow


      // cek dulu jika ada file baru
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "buktiFollowKetua") {
          //  ada file baru upload drive bawah sini sm buffer



          getTim.ketuaTim.identitas = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
          break;
        }
        else getTim.ketuaTim.identitas = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      }
      
    }
    if(dataTim.ketua.profilePic) {
      // delete drive disini untuk ketua tim buktiFollow


      // cek dulu jika ada file baru
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == `profilePicKetua`) {
          //  ada file baru upload drive bawah sini sm buffer


          getTim.ketuaTim.foto = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
          break;
        }
        else getTim.ketuaTim.foto = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      }
    }
    /////////////////////////////////
    // PEMBATAS
    /////////////////////////////////
    // iterasi bagian anggota
    for (let anggota = 0; anggota < dataTim.anggota.length; i++) {
      // ini save dari json
      updateDanceOnlyText(getTim, true, dataTim, anggota) // ngeupdate yg dari database untuk anggota


      if(dataTim.anggota[anggota].buktiIdentitas) {
        // delete drive disini untuk anggota tim identitas
  
  
        // cek dulu jika ada file baru
        for (let i = 0; i < fileUpload.length; i++) {
          if(fileUpload[i].fieldname == `buktiIdentitas${anggota+1}`) {
            //  ada file baru upload drive bawah sini sm buffer
  
  
  
            getTim.anggota[i].identitas = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
            break;
          }
        else getTim.anggota[i].identitas = undefined //ini kalo g ada yg diupload atau didelete sm mereka
        }
      }
      if(dataTim.anggota[anggota].buktiTwibbon) {
        // delete drive disini untuk ketua tim buktiTwibbon
  
  
        // cek dulu jika ada file baru
        for (let i = 0; i < fileUpload.length; i++) {
          if(fileUpload[i].fieldname == `buktiTwibbon${anggota+1}`) {
            //  ada file baru upload drive bawah sini sm buffer
  
  
            getTim.anggota[i].buktiTwibbon = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
            break;
          }
          else getTim.anggota[i].buktiTwibbon = undefined //ini kalo g ada yg diupload atau didelete sm mereka
        }
      }
      if(dataTim.anggota[anggota].buktiFollow) {
        // delete drive disini untuk ketua tim buktiFollow
  
  
        // cek dulu jika ada file baru
        for (let i = 0; i < fileUpload.length; i++) {
          if(fileUpload[i].fieldname == `buktiFollow${anggota+1}`) {
            //  ada file baru upload drive bawah sini sm buffer
  
  
            getTim.anggota[i].buktiFollow = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
            break;
          }
          else getTim.anggota[i].buktiFollow = undefined //ini kalo g ada yg diupload atau didelete sm mereka
        }
      }

      if(dataTim.anggota[anggota].profilePic) {
        // delete drive disini untuk ketua tim buktiFollow
  
  
        // cek dulu jika ada file baru
        for (let i = 0; i < fileUpload.length; i++) {
          if(fileUpload[i].fieldname == `profilePic${anggota+1}`) {
            //  ada file baru upload drive bawah sini sm buffer
  
  
            getTim.anggota[i].foto = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
            break;
          }
          else getTim.anggota[i].foto = undefined //ini kalo g ada yg diupload atau didelete sm mereka
        }
      }
      
    }

    // bagian terakhir save aja
    getTim.namaTim = dataTim.namaTim


    await getTim.save()
    return res.status(200).json({message : "Succesfully editted"})

  } catch (error) {
    next(error)
  }
}

exports.updateVocal = async (req, res, next) => {
  const dataTim = JSON.parse(req.body.dataTim)
  const fileUpload = req.files
  try {
    let getTim =  await Tim.findOne({userID : _id, pilihanLomba : "dance"}).populate('anggotaTim ketuaTim').exec()
    if(!getTim) return res.status(401).json({message: "Not found"})

    if(dataTim.buktiIdentitas) {
      // delete drive disini untuk ketua tim identitas


      // cek dulu jika ada file baru
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "buktiIdentitasKetua") {
          //  ada file baru upload drive bawah sini sm buffer


          getTim.ketuaTim.identitas = "" // ganti apa gitu undefined kalo dihapus total tanpa ada ganti sm link baru
          break;
        }
        else getTim.ketuaTim.identitas = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      }
      
    }
    if(dataTim.buktiTwibbon) {
      // delete drive disini untuk ketua tim buktiTwibbon


      // cek dulu jika ada file baru
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "buktiTwibbonKetua") {
          //  ada file baru upload drive bawah sini sm buffer



          getTim.ketuaTim.buktiTwibbon = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
          break;
        }
        else getTim.ketuaTim.buktiTwibbon = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      }
    }
    if(dataTim.buktiFollow) {
      // delete drive disini untuk ketua tim buktiFollow


      // cek dulu jika ada file baru
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "buktiFollowKetua") {
          //  ada file baru upload drive bawah sini sm buffer



          getTim.ketuaTim.identitas = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
          break;
        }
        else getTim.ketuaTim.identitas = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      }
    }
    if(dataTim.foto) {
      // delete drive disini untuk ketua tim buktiFollow


      // cek dulu jika ada file baru
      for (let i = 0; i < fileUpload.length; i++) {
        if(fileUpload[i].fieldname == "fotoKetua") {
          //  ada file baru upload drive bawah sini sm buffer



          getTim.ketuaTim.foto = "" //ubah sm link logo baru ato bikin undefined aja kalo gada ketemu
          break;
        }
        else getTim.ketuaTim.foto = undefined //ini kalo g ada yg diupload atau didelete sm mereka
      }
    }

    await getTim.save()
    res.status(200).json({message: "data berhasil diubah"})

  } catch (error) {
    next(error)
  }
}
