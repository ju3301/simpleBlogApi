const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { validationResult } = require('express-validator')
const jsonwebtoken = require('./token')

module.exports.getUsers = async (req, resp) => {
    const users = await prisma.user.findMany({
        select: {
            email: true
        }
    })
    resp.status(200).json(users)
}
module.exports.postUser = async (req, resp) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        resp.status(400).json({ errors: errors.array() })
    } else {
        const getUser = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        })
        if (getUser) {
            resp.status(406).json({ errors: { content: "user already exist" } })
        } else {
            var passwordHash = require('password-hash')
            const newUser = await prisma.user.create({
                data: {
                    email: req.body.email,
                    hashedPassword: passwordHash.generate(req.body.password)
                },
                select: {
                    id: true,
                    email: true
                }
            })
            const token = jsonwebtoken.generate({ id: newUser.id });
            resp.status(201).json({
                user: newUser,
                token: token
            })
        }
    }

}

module.exports.login = async (req, resp) => {
    var user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    var passwordHash = require('password-hash')
    var result = passwordHash.verify(req.body.password, user.hashedPassword)
    if (result === true) {
        const token = jsonwebtoken.generate({ id: user.id })
        resp.status(200).json({
            user: user,
            token: token
        })
    }
}