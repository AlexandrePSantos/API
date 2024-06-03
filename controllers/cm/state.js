const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all states
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.state.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Return state by id
exports.getById = async (req, res) => {
    const id = req.params.idstate;
    try {
        const response = await prisma.state.findUnique({
            where: {
                idstate: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create state
exports.create = async (req, res) => {
    const { state } = req.body;
    try {
        const newState = await prisma.state.create({
            data: {
                state: state
            },
        })
        res.status(201).json(newState)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Update state
exports.update = async (req, res) => {
    const id = req.params.idstate;
    const { state } = req.body;

    try {
        const updatedState = await prisma.state.update({
            where: {
                idstate: Number(id),
            },
            data: {
                state: state
            },
        })
        res.status(200).json(updatedState)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Delete state by id
exports.delete = async (req, res) => {
    const id = req.params.idstate;
    try {
        await prisma.state.delete({
            where: {
                idstate: Number(id),
            },
        })
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

