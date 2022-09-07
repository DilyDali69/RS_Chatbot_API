const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserQuery = new Schema({
    _id: ObjectId,
    user_name: String,
    query: String,
    date: Date
});

const MyModelUserQuery = mongoose.model('UserQuery', UserQuery);

module.exports = { UserQuery: MyModelUserQuery }