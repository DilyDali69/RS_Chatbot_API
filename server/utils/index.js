const axios = require("axios")

const paidFilter = ({ data }) => data.filter(({ creator }) => creator !== "Ubisoft")
const requestRsAPI = async (user, query) => {
    const res = await axios(`https://rsplaylist.com/api/search.php?search=${query}`)
    return res.data
}

module.exports = {
    paidFilter,
    requestRsAPI
}