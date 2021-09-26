const express = require('express')
const app = express()
const port = 4000
const { body } = require('express-validator')
const { getCategories, postCategory } = require('./src/category')
const { getArticles, postArticle } = require('./src/article')
const { getUsers, postUser } = require('./src/user')
const { authenticate } = require('./src/token')
const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// USERS
app.get('/api/users', authenticate, getUsers)
app.post('/api/user', body('email').isEmail(), body('password').isStrongPassword(), postUser)

// ARTICLES
app.get('/api/articles', getArticles)
app.post('/api/article', body('title').isString(), body('content').isString(), authenticate, postArticle)

// CATEGORIES
app.get('/api/categories', getCategories)
app.post('/api/category', body('name').isString(), authenticate, postCategory)

app.get('/', function (req, res) {
    console.log(req.ip)
    res.status(200)
    res.send("Welcome on Blog API")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})