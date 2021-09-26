const { PrismaClient } = require('@prisma/client')
const { validationResult } = require('express-validator')
const { default: slugify } = require('slugify')
const prisma = new PrismaClient()

module.exports.getArticles = async (req, resp) => {
    const articles = await prisma.article.findMany({
        select: {
            title: true,
            slug: true,
            content: true,
            Categories: {
                select: {
                    name: true
                }
            }
        }
    })
    resp.json(articles)
}

module.exports.postArticle = async (req, resp) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        resp.status(400).json({ errors: errors.array() })
    } else {
        const getArticle = await prisma.article.findUnique({
            where: {
                title: req.body.title
            }
        })
        if (getArticle) {
            resp.status(406).json({ errors: { content: "Article with same title already exist" } })
        } else {
            const newArticle = await prisma.article.create({
                data: {
                    title: req.body.title,
                    slug: slugify(req.body.title),
                    content: req.body.content,
                    userId: req.user.id
                }
            })
            resp.status(201).json(newArticle)
        }
    }
}