const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all reviews
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.performance.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Return user by id
exports.getById = async (req, res) => {
    const id = req.params.idtask;
    try {
        const response = await prisma.performance.findUnique({
            where: {
                idtask: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create user
exports.create = async (req, res) => {
    const { iduser, stars, review } = req.body;
    try {
        const user = await prisma.performance.create({
            data: {
                iduser: iduser,
                idtask: idtask,
                stars: stars,
                review: review
            },
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}