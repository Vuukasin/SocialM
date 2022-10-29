
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path')
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));



const loginRoute = require('./routes/auth/login');
const refreshRoute = require('./routes/auth/refresh');
const usersListRoute = require('./routes/api/users');
const postsFeedRoute = require('./routes/api/posts');
const likePostRoute = require('./routes/api/postsLike');
const authUser = require('./routes/auth/authUser')





app.use(loginRoute);
app.use(refreshRoute);
app.use(usersListRoute);
app.use(postsFeedRoute);
app.use(likePostRoute);
app.use(authUser);




app.use(express.static('client/build'))
app.get("*", (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))