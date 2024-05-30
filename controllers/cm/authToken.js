const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all auth tokens
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.authToken.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Return auth token by id
exports.getById = async (req, res) => {
    const id = req.params.idToken;
    try {
        const response = await prisma.authToken.findUnique({
            where: {
                idToken: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create auth token
exports.create = async (req, res) => {
    const { idUser, token, expires } = req.body;
    try {
        const authToken = await prisma.authToken.create({
            data: {
                idUser: idUser,
                token: token,
                expires: expires
            },
        })
        res.status(201).json(authToken)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Update auth token
exports.update = async (req, res) => {
    const { idToken, idUser, token, expires } = req.body;

    try {
        const authToken = await prisma.authToken.update({
            where: {
                idToken: Number(idToken),
            },
            data: {
                idUser: idUser,
                token: token,
                expires: expires
            },
        })
        res.status(200).json(authToken)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Delete auth token by id
exports.delete = async (req, res) => {
    const id = req.params.idToken;
    try {
        await prisma.authToken.delete({
            where: {
                idToken: Number(id),
            },
        })
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}