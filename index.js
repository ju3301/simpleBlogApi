const express = require('express')
const app = express()
const port = 4000
const { body } = require('express-validator')
const { getCategories, postCategory } = require('./src/category')
const { getArticles, postArticle } = require('./src/article')
const { getUsers, postUser } = require('./src/user')
const { authenticate } = require('./src/token')

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// USERS
app.get('/api/users', authenticate, getUsers)
app.post('/api/user', body('email').isEmail(), body('password').isStrongPassword(), postUser)

// ARTICLES
app.get('/api/articles', authenticate, getArticles)
app.post('/api/article', body('title').isString(), body('content').isString(), authenticate, postArticle)

// CATEGORIES
app.get('/api/categories', authenticate, getCategories)
app.post('/api/category', body('name').isString(), authenticate, postCategory)

app.get('/', function (req, res) {
    res.status(200)
    res.send("Welcome on Blog API")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})