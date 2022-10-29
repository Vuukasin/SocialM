const express = require('express')
const cookie = require('cookie');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();
// expected post request to express server /auth
router.get('/users', async (req, res) => {
    
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${access}`
                Authorization: req.headers.authorization
            }
        })

        const data = await apiRes.json()    

        if (apiRes.status === 200) {
            return res.json(data)
        } else {
            return res.status(apiRes.status).json(data)
        }
    } catch (err) {
        return res.status(500).json({ error: 'Something went wront admin' })
    }
    
    
    

    // try {
    //     // fetch tokens from django server
    //     const apiRes = await fetch(`${process.env.API_URL}/api/users/`, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //     })

    //     const data = await apiRes.json()

    //     if (apiRes.status === 200) {
    //         return res.json({ data })
    //     } else {
    //         return res.status(apiRes.status).json(data)
    //     }
    // } catch (err) {
    //     return res.status(500).json({ error: 'Something went wrong admin' })
    // }
})

module.exports = router;