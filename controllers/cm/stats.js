const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Retorna estatísticas para um usuário específico
exports.userStats = async (req, res) => {
    const idUser = req.params.idUser; // Obtenha o idUser do parâmetro da rota
    try {
        const stats = await prisma.$queryRaw`
            SELECT 
                u.idUser,
                u.name,
                COUNT(t.idTask) AS tasksCompleted,
                SUM(t.timeSpent) AS totalTimeSpent,
                COUNT(DISTINCT p.idProject) AS projectsCompleted
            FROM 
                User u
            LEFT JOIN 
                Task t ON u.idUser = t.idUser AND t.idState = (SELECT idState FROM State WHERE state = 'completo')
            LEFT JOIN 
                Project p ON u.idUser = p.idUser AND p.completionStatus = TRUE
            WHERE 
                u.idUser = ${idUser} // Adicione a condição WHERE para filtrar pelo idUser
            GROUP BY 
                u.idUser, u.name
        `;
        res.status(200).json(stats)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Retorna estatísticas sobre um projeto específico
exports.projectStats = async (req, res) => {
    const idProject = req.params.idProject; // Obtenha o idProject do parâmetro da rota
    try {
        const stats = await prisma.$queryRaw`
            SELECT 
                p.idProject,
                p.name,
                COUNT(t.idTask) AS tasksCompleted,
                SUM(t.timeSpent) AS totalTimeSpent
            FROM 
                Project p
            LEFT JOIN 
                Task t ON p.idProject = t.idProject AND t.idState = (SELECT idState FROM State WHERE state = 'completo')
            WHERE 
                p.idProject = ${idProject} // Adicione a condição WHERE para filtrar pelo idProject
            GROUP BY 
                p.idProject, p.name
        `;
        res.status(200).json(stats)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Retorna estatísticas para uma tarefa específica
exports.taskStats = async (req, res) => {
    const idTask = req.params.idTask; // Obtenha o idTask do parâmetro da rota
    try {
        const stats = await prisma.$queryRaw`
            SELECT 
                t.idTask,
                t.nameTask,
                s.state
            FROM 
                Task t
            LEFT JOIN 
                State s ON t.idState = s.idState
            WHERE 
                t.idTask = ${idTask} 
        `;
        res.status(200).json(stats)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}