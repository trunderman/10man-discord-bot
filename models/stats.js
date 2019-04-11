const mongoose = require("mongoose");

const statSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: String,
    userId: String,
    HLTV: Number,
    ADR: String,
    HS: String,
    W: Number,
    L: Number,
    totalGames: Number,
    win_percent: String,
    rank: String

});

module.exports = mongoose.model("Stats", statSchema)