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

// Lista todas as tarefas de um projeto específico
exports.getTasks = async (req, res) => {
    const idProject = req.params.idProject;
    try {
        const tasks = await prisma.$queryRaw`
            SELECT 
                t.idTask,
                t.name
            FROM 
                Task t
            WHERE 
                t.idProject = ${idProject}
        `;
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Lista todos os usuários associados a um projeto específico
exports.getUsers = async (req, res) => {
    const idProject = req.params.idProject;
    try {
        const users = await prisma.$queryRaw`
            SELECT 
                u.idUser,
                u.name
            FROM 
                User u
            INNER JOIN 
                UserProject up ON u.idUser = up.idUser
            WHERE 
                up.idProject = ${idProject}
        `;
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Associa um usuário a um projeto
exports.assignUser = async (req, res) => {
    const idProject = req.params.idProject;
    const idUser = req.params.idUser;
    try {
        await prisma.$queryRaw`
            INSERT INTO UserProject (idUser, idProject)
            VALUES (${idUser}, ${idProject})
        `;
        res.status(200).json({ msg: 'User assigned to project successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Remove um usuário de um projeto
exports.removeUser = async (req, res) => {
    const idProject = req.params.idProject;
    const idUser = req.params.idUser;
    try {
        await prisma.$queryRaw`
            DELETE FROM UserProject 
            WHERE idUser = ${idUser} AND idProject = ${idProject}
        `;
        res.status(200).json({ msg: 'User removed from project successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Marca um projeto como concluído
exports.completeProject = async (req, res) => {
    const idProject = req.params.idProject;
    try {
        await prisma.$queryRaw`
            UPDATE Project 
            SET idState = (SELECT idState FROM State WHERE state = 'completo') 
            WHERE idProject = ${idProject}
        `;
        res.status(200).json({ msg: 'Project marked as complete successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Define a avaliação de desempenho de um projeto
exports.setPerformanceReview = async (req, res) => {
    const idProject = req.params.idProject;
    const { performanceReview } = req.body;
    try {
        await prisma.$queryRaw`
            UPDATE Project 
            SET performanceReview = ${performanceReview} 
            WHERE idProject = ${idProject}
        `;
        res.status(200).json({ msg: 'Project performance review updated successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}