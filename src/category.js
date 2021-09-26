const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { validationResult } = require('express-validator')
const { default: slugify } = require('slugify')

module.exports.getCategories = async (req, resp) => {
    const categories = await prisma.category.findMany()
    resp.json(categories)
}

module.exports.postCategory = async (req, resp) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        resp.status(400).json({ errors: errors.array() })
    } else {
        const getCategory = await prisma.category.findUnique({
            where: {
                name: req.body.name
            }
        })
        if (getCategory) {
            resp.status(406).json({ errors: { content: "Category with same name already exist" } })
        } else {
            const newCategory = await prisma.category.create({
                data: {
                    name: req.body.name,
                    slug: slugify(req.body.name),
                }
            })
            resp.status(201).json(newCategory)
        }
    }
}
