const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SongList = new Schema({
    id: Number,
    cdlc_id: Number,
    artist: String,
    artist_id: Number,
    title: String,
    album: String,
    tuning: Number,
    parts: Schema.Types.Mixed,
    dd: Boolean,
    official: Number,
    creator: String,
    estimated_length: Number,
    trr_url: Schema.Types.Mixed,
    updated: Number,
    downloads: Number,
    tuning_name: String,
    paths: Number,
    paths_string: String
});

const MyModelSongList = mongoose.model('SongList', SongList);

module.exports = { SongList: MyModelSongList }