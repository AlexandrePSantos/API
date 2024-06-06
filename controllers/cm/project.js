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
    const id = req.params.idproject;
    try {
        const response = await prisma.project.findUnique({
            where: {
                idproject: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create project
exports.create = async (req, res) => {
    const { nameproject, startdatep, enddatep, idstate, iduser, completionstatus, performancereview, obs } = req.body;
    try {
        const project = await prisma.project.create({
            data: {
                nameproject: nameproject,
                startsatep: startdatep,
                enddatep: enddatep,
                idstate: {
                    connect: {
                        idstate: idstate
                    }
                },
                iduser: {
                    connect: {
                        iduser: iduser
                    }
                },
                completionstatus: completionstatus,
                performancereview: performancereview,
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
    const id = req.params.idproject;
    const { nameproject, startsatep, enddatep, idstate, iduser, completionstatus, performancereview, obs } = req.body;

    try {
        const project = await prisma.project.update({
            where: {
                idproject: Number(id),
            },
            data: {
                nameproject: nameproject,
                startsatep: startsatep,
                enddatep: enddatep,
                idstate: {
                    connect: {
                        idstate: idstate
                    }
                },
                iduser: {
                    connect: {
                        iduser: iduser
                    }
                },
                completionstatus: completionstatus,
                performancereview: performancereview,
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
    const id = req.params.idproject;
    try {
        await prisma.project.delete({
            where: {
                idproject: Number(id),
            },
        })
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Lista todas as tarefas de um projeto específico
exports.getTasks = async (req, res) => {
    const idproject = req.params.idproject;
    try {
        const tasks = await prisma.$queryRaw`
            SELECT 
                t.idtask,
                t.name
            FROM 
                Task t
            WHERE 
                t.idproject = ${idproject}
        `;
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Lista todos os usuários associados a um projeto específico
exports.getUsers = async (req, res) => {
    const idproject = req.params.idproject;
    try {
        const users = await prisma.$queryRaw`
            SELECT 
                u.iduser,
                u.name
            FROM 
                User u
            INNER JOIN 
                userproject up ON u.iduser = up.iduser
            WHERE 
                up.idproject = ${idproject}
        `;
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Associa um usuário a um projeto
exports.assignUser = async (req, res) => {
    const idproject = req.params.idproject;
    const iduser = req.params.iduser;
    try {
        await prisma.$queryRaw`
            INSERT INTO userproject (iduser, idproject)
            VALUES (${iduser}, ${idproject})
        `;
        res.status(200).json({ msg: 'User assigned to project successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Remove um usuário de um projeto
exports.removeUser = async (req, res) => {
    const idproject = req.params.idproject;
    const iduser = req.params.iduser;
    try {
        await prisma.$queryRaw`
            DELETE FROM userproject 
            WHERE iduser = ${iduser} AND idproject = ${idproject}
        `;
        res.status(200).json({ msg: 'User removed from project successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Marca um projeto como concluído
exports.completeProject = async (req, res) => {
    const idproject = req.params.idproject;
    try {
        await prisma.$queryRaw`
            UPDATE project 
            SET idstate = (SELECT idstate FROM State WHERE state = 'completo') 
            WHERE idproject = ${idproject}
        `;
        res.status(200).json({ msg: 'project marked as complete successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Define a avaliação de desempenho de um projeto
exports.setPerformanceReview = async (req, res) => {
    const idproject = req.params.idproject;
    const { performancereview } = req.body;
    try {
        await prisma.$queryRaw`
            UPDATE project 
            SET performancereview = ${performancereview} 
            WHERE idproject = ${idproject}
        `;
        res.status(200).json({ msg: 'project performance review updated successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}