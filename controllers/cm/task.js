const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all tasks
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.task.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Return task by id
exports.getById = async (req, res) => {
    const id = req.params.idTask;
    try {
        const response = await prisma.task.findUnique({
            where: {
                idTask: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create task
exports.create = async (req, res) => {
    const { nameTask, startDateT, endDateT, idProject, idState, photo, timeSpend, local, taxes, completionRate, photos, observations } = req.body;
    try {
        const task = await prisma.task.create({
            data: {
                nameTask: nameTask,
                startDateT: startDateT,
                endDateT: endDateT,
                idProject: idProject,
                idState: idState,
                photo: photo,
                timeSpend: timeSpend,
                local: local,
                taxes: taxes,
                completionRate: completionRate,
                photos: photos,
                observations: observations
            },
        })
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Update task
exports.update = async (req, res) => {
    const id = req.params.idTask;
    const { nameTask, startDateT, endDateT, idProject, idState, photo, timeSpend, local, taxes, completionRate, photos, observations } = req.body;

    try {
        const task = await prisma.task.update({
            where: {
                idTask: Number(id),
            },
            data: {
                nameTask: nameTask,
                startDateT: startDateT,
                endDateT: endDateT,
                idProject: idProject,
                idState: idState,
                photo: photo,
                timeSpend: timeSpend,
                local: local,
                taxes: taxes,
                completionRate: completionRate,
                photos: photos,
                observations: observations
            },
        })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Delete task by id
exports.delete = async (req, res) => {
    const id = req.params.idTask;
    try {
        await prisma.task.delete({
            where: {
                idTask: Number(id),
            },
        })
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}