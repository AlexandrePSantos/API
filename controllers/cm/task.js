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
                idProject: {
                    connect: {
                        idproject: idProject
                    }
                },
                idState: {
                    connect: {
                        idState: idState
                    }
                },
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
                idProject: {
                    connect: {
                        idproject: idProject
                    }
                },
                idState: {
                    connect: {
                        idState: idState
                    }
                },
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

// Lista todos os usuários associados a uma tarefa específica
exports.getUsers = async (req, res) => {
    const idTask = req.params.idTask;
    try {
        const users = await prisma.$queryRaw`
            SELECT 
                u.idUser,
                u.name
            FROM 
                User u
            INNER JOIN 
                UserTask ut ON u.idUser = ut.idUser
            WHERE 
                ut.idTask = ${idTask}
        `;
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Associa um usuário a uma tarefa
exports.assignUser = async (req, res) => {
    const idTask = req.params.idTask;
    const idUser = req.params.idUser;
    try {
        await prisma.$queryRaw`
            INSERT INTO UserTask (idUser, idTask)
            VALUES (${idUser}, ${idTask})
        `;
        res.status(200).json({ msg: 'User assigned to task successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Remove um usuário de uma tarefa
exports.removeUser = async (req, res) => {
    const idTask = req.params.idTask;
    const idUser = req.params.idUser;
    try {
        await prisma.$queryRaw`
            DELETE FROM UserTask 
            WHERE idUser = ${idUser} AND idTask = ${idTask}
        `;
        res.status(200).json({ msg: 'User removed from task successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Marca uma tarefa como concluída
exports.completeTask = async (req, res) => {
    const idTask = req.params.idTask;
    try {
        await prisma.$queryRaw`
            UPDATE Task 
            SET idState = (SELECT idState FROM State WHERE state = 'completo') 
            WHERE idTask = ${idTask}
        `;
        res.status(200).json({ msg: 'Task marked as complete successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Define o estado de uma tarefa
exports.setState = async (req, res) => {
    const idTask = req.params.idTask;
    const { state } = req.body;
    try {
        await prisma.$queryRaw`
            UPDATE Task 
            SET idState = (SELECT idState FROM State WHERE state = ${state}) 
            WHERE idTask = ${idTask}
        `;
        res.status(200).json({ msg: 'Task state updated successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
