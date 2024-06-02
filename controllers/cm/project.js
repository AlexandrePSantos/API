const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all projects
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.project.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Return project by id
exports.getById = async (req, res) => {
    const id = req.params.idProject;
    try {
        const response = await prisma.project.findUnique({
            where: {
                idProject: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create project
exports.create = async (req, res) => {
    const { nameProject, startDateP, endDateP, idState, idUser, completionStatus, performanceReview, obs } = req.body;
    try {
        const project = await prisma.project.create({
            data: {
                nameProject: nameProject,
                startDateP: startDateP,
                endDateP: endDateP,
                idState: idState,
                idUser: idUser,
                completionStatus: completionStatus,
                performanceReview: performanceReview,
                obs: obs
            },
        })
        res.status(201).json(project)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Update project
exports.update = async (req, res) => {
    const id = req.params.idProject;
    const { nameProject, startDateP, endDateP, idState, idUser, completionStatus, performanceReview, obs } = req.body;

    try {
        const project = await prisma.project.update({
            where: {
                idProject: Number(id),
            },
            data: {
                nameProject: nameProject,
                startDateP: startDateP,
                endDateP: endDateP,
                idState: idState,
                idUser: idUser,
                completionStatus: completionStatus,
                performanceReview: performanceReview,
                obs: obs
            },
        })
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Delete project by id
exports.delete = async (req, res) => {
    const id = req.params.idProject;
    try {
        await prisma.project.delete({
            where: {
                idProject: Number(id),
            },
        })
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}