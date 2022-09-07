require("dotenv").config()
const app = require('express')()
const axios = require("axios")
const mongoose = require("mongoose")
const { SongList } = require("./models")

const MONGODB_ENDPOINT = `mongodb+srv://${process.env.USER}:${process.env.PW}@${process.env.ENDPOINT}/?retryWrites=true&w=majority`
const PORT = 8080
const paidFilter = ({ data }) => data.filter(({ creator }) => creator !== "Ubisoft")
const request = async (user, query) => {
    let res = await axios(`https://rsplaylist.com/api/search.php?search=${query}`)
    // paid filter on by default
    if (1 === 1) {
        return paidFilter(res)
    }

    
    // await SongList.insertMany(res)
    
    return res
}
console.log(MONGODB_ENDPOINT)

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

app.get('/api/req', async (req, res) => {
    const test = await request("bob", "Thunder%20Horse")
    console.log(test)
})

app.listen(PORT, () => console.log(`Now listening on ${PORT}`))