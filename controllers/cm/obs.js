const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all observations
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.obs.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Return obs by id
exports.getById = async (req, res) => {
    const id = req.params.idobs;
    try {
        const response = await prisma.obs.findUnique({
            where: {
                idobs: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create obs
exports.create = async (req, res) => {
    const { nameobs, idtask, content } = req.body;
    try {
        const obs = await prisma.obs.create({
            data: {
                nameobs: nameobs,
                idtask: idtask,
                content: content
            },
        })
        res.status(201).json(obs)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}