const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserQuery = new Schema({
    user_name: String,
    date: Date,
    query: {
        song_name: String,
        cdlc_id: Number
    },
});

const MyModelUserQuery = mongoose.model('UserQuery', UserQuery);

module.exports = { UserQuery: MyModelUserQuery }