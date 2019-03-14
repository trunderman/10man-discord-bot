const mongoose = require("mongoose");

const statSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: String,
    userId: String,
    HLTV: String,
    ADR: String,
    HS: String,
    W: Number,
    L: Number,
    T: String,
    totalGames: Number,
    win_percent: String

});

module.exports = mongoose.model("Stats", statSchema)