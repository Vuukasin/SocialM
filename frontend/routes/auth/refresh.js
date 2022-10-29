const express = require('express')
const cookie = require('cookie')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();
// expected post request to express server /auth
router.get('/refresh', async (req, res) => {
    const { refresh } = req.cookies;
    const body = JSON.stringify({ refresh: refresh })
    
    try {
        // fetch tokens from django server
        const apiRes = await fetch(`${process.env.API_URL}/api/token/refresh/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body
        })

        const data = await apiRes.json()


        if (apiRes.status === 200) {
            res.setHeader('Set-Cookie', [
                cookie.serialize('refresh', data.refresh, {
                    httpOnly: true,
                    maxAge: 60 * 30,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production'
                })
            ])
            return res.status(200).json({ accessToken: data.access })
        } else {
            return res.status(apiRes.status).json(data)
        }
    } catch(err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong admin' })
    }
})

module.exports = router;