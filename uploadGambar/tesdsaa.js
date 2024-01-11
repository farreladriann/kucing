const timSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    pilihanLomba: {
        type: String,
        enum:["mobilelegend","valorant","dance", "vocal"],
        required: true
    },
    slot: {
        type: Number,
    },
    logoTim: {
        type: String,
    },
    namaTim: {
        type: String,
    },
    instagram: {
        type: String,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Peserta",
  },
    ketuaTim: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Peserta",
        required: true
    },
    statusPeserta: {
        type: String,
        enum: ["Belum Terverifikasi", "Terverifikasi", "Perbaikan Data", "Gagal"],
        default: "Belum Terverifikasi",
    },
    anggotaTim: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Peserta",
    }],
    atasNamaPembayaran: {
        type: String,
        required: true
    },
    norek: {
        type: String,
        required: true
    },
    bank: {                           
        type: String,
        required: true
    },
    buktiBayar: {
        type: String
        // required: true
    },
    komentar: {
        type: String,
        default: "",
    },
    linkSubmission: {
        type: String,
        default: "",
    },