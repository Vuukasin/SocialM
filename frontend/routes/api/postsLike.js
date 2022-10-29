const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();
// expected post request to express server /auth
router.post('/post-like', async (req, res) => {
    const { postId, action } = req.body;
    const post_id = postId
    const body = JSON.stringify({ post_id, action })
    
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/post-action/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${access}`
                Authorization: req.headers.authorization
            },
            body
        })

        const data = await apiRes.json()
        console.log(data)

        if (apiRes.status === 200) {
            return res.json(data)
        } else {
            return res.status(apiRes.status).json(data)
        }
    } catch (err) {
        return res.status(500).json({ error: 'Something went wront admin' })
    }
    
})

module.exports = router;