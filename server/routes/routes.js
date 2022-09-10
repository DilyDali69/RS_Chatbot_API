const router = require("express").Router()
const moment = require("moment")
const { SongList, UserQuery } = require("../models")
const { paidFilter, requestRsAPI } = require("../utils")

router.get('/req', async (req, res) => {
    const { user, query, index } = req.query
    const currentIndex = parseInt(index || "0")

    // Scrape all non-duplicates for db
    const rsPlaylistAPIRes = await requestRsAPI(user, query)
    const songs = Promise.all(
        rsPlaylistAPIRes.length ? rsPlaylistAPIRes.map(async ({ id, ...rest }) => SongList.findOneAndUpdate(
            { id },
            { $setOnInsert: { id, ...rest } },
            { upsert: true }
        )) : []
    )

    // Process user requests
    let timeSinceRequest
    const userIdentifier = { user_name: user }
    const userQuery = {
        $setOnInsert: {
            date: new Date(),
            query: {
                song_name: query,
                cdlc_id: rsPlaylistAPIRes[currentIndex].cdlc_id
            },
        }
    }
    const options = { upsert: true, new: true };

    try {
        const { _id, ...userQueryDocument } = await UserQuery.findOneAndUpdate(userIdentifier, userQuery, options).lean()
        timeSinceRequest = moment(userQueryDocument.date).fromNow()

        console.log(userQueryDocument)

        if (userQueryDocument.query.song_name !== query) {
            const updatedUser = await UserQuery.findByIdAndUpdate({ _id }, {
                date: new Date(),
                query: {
                    song_name: query,
                    cdlc_id: rsPlaylistAPIRes[currentIndex].cdlc_id
                },
            }).lean()
            timeSinceRequest = moment(updatedUser.date).fromNow()
        }

        console.log(timeSinceRequest)

        res.send({ data: { timeSinceRequest, songs: rsPlaylistAPIRes } })
        await songs

    } catch (error) {
        console.log({ error: error || "Hello" })
    }

})

router.get('/accept', async (req, res) => {
    const { user, query } = req.query

    if (query === "true") {
        try {
            const userRes = await UserQuery.findOne({ user_name: user })

            console.log(userRes)

            if (userRes === null || JSON.stringify(userRes) === '{}') {
                return res.send({ data: "No Request made" })
            }

            res.send({ data: `!sr ${userRes.query.cdlc_id}` })
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    } else {

    }
})

module.exports = router