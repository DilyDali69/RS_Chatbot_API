require("dotenv").config({ path: "../.env" })
const app = require('express')()
const mongoose = require("mongoose")

const MONGODB_ENDPOINT = `mongodb+srv://${process.env.USER_NAME}:${process.env.PW}@${process.env.ENDPOINT}/?retryWrites=true&w=majority`
const PORT = 8080

app.use(require('./routes'))

mongoose.connect(MONGODB_ENDPOINT, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () =>
    console.log('Connected to MongoDB Endpoint')
);
mongoose.connection.on('error', (err) =>
    console.log(`Mongoose default connection error: ${err}`)
);

app.listen(PORT, () => console.log(`Now listening on ${PORT}`))