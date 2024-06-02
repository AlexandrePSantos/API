const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all sync logs
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.syncLog.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Return sync log by id
exports.getById = async (req, res) => {
    const id = req.params.idLog;
    try {
        const response = await prisma.syncLog.findUnique({
            where: {
                idLog: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create sync log
exports.create = async (req, res) => {
    const { idUser, timestamp, action, status } = req.body;
    try {
        const syncLog = await prisma.syncLog.create({
            data: {
                idUser: idUser,
                timestamp: timestamp,
                action: action,
                status: status
            },
        })
        res.status(201).json(syncLog)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Update sync log
exports.update = async (req, res) => {
    const id = req.params.idLog;
    const { idUser, timestamp, action, status } = req.body;

    try {
        const syncLog = await prisma.syncLog.update({
            where: {
                idLog: Number(id),
            },
            data: {
                idUser: idUser,
                timestamp: timestamp,
                action: action,
                status: status
            },
        })
        res.status(200).json(syncLog)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Delete sync log by id
exports.delete = async (req, res) => {
    const id = req.params.idLog;
    try {
        await prisma.syncLog.delete({
            where: {
                idLog: Number(id),
            },
        })
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}