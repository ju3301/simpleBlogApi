const jwt = require('jsonwebtoken')

module.exports.generate = function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '24h' });
}

module.exports.authenticate = function authenticateToken(req, resp, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return resp.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}