const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all user types
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.userType.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Return user type by id
exports.getById = async (req, res) => {
    const id = req.params.idType;
    try {
        const response = await prisma.userType.findUnique({
            where: {
                idType: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create user type
exports.create = async (req, res) => {
    const { type } = req.body;
    try {
        const userType = await prisma.userType.create({
            data: {
                type: type
            },
        })
        res.status(201).json(userType)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Update user type
exports.update = async (req, res) => {
    const id = req.params.idType;
    const { type } = req.body;

    try {
        const userType = await prisma.userType.update({
            where: {
                idType: Number(id),
            },
            data: {
                type: type
            },
        })
        res.status(200).json(userType)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Delete user type by id
exports.delete = async (req, res) => {
    const id = req.params.idtype;
    try {
        await prisma.usertype.delete({
            where: {
                idtype: Number(id),
            },
        })
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}