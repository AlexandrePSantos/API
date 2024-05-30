const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all local backups
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.localBackup.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Return local backup by id
exports.getById = async (req, res) => {
    const id = req.params.idBackup;
    try {
        const response = await prisma.localBackup.findUnique({
            where: {
                idBackup: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create local backup
exports.create = async (req, res) => {
    const { data, timestamp, idUser } = req.body;
    try {
        const localBackup = await prisma.localBackup.create({
            data: {
                data: data,
                timestamp: timestamp,
                idUser: idUser
            },
        })
        res.status(201).json(localBackup)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Update local backup
exports.update = async (req, res) => {
    const { idBackup, data, timestamp, idUser } = req.body;

    try {
        const localBackup = await prisma.localBackup.update({
            where: {
                idBackup: Number(idBackup),
            },
            data: {
                data: data,
                timestamp: timestamp,
                idUser: idUser
            },
        })
        res.status(200).json(localBackup)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Delete local backup by id
exports.delete = async (req, res) => {
    const id = req.params.idBackup;
    try {
        await prisma.localBackup.delete({
            where: {
                idBackup: Number(id),
            },
        })
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}