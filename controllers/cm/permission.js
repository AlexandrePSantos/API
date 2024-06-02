const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all permissions
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.permission.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Return permission by id
exports.getById = async (req, res) => {
    const id = req.params.idPermission;
    try {
        const response = await prisma.permission.findUnique({
            where: {
                idPermission: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create permission
exports.create = async (req, res) => {
    const { role, can_create_project, can_edit_project, can_delete_project, can_manage_users, can_assign_tasks, can_export_stats, idType } = req.body;
    try {
        const permission = await prisma.permission.create({
            data: {
                role: role,
                can_create_project: can_create_project,
                can_edit_project: can_edit_project,
                can_delete_project: can_delete_project,
                can_manage_users: can_manage_users,
                can_assign_tasks: can_assign_tasks,
                can_export_stats: can_export_stats,
                idType: idType
            },
        })
        res.status(201).json(permission)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Update permission
exports.update = async (req, res) => {
    const id = req.params.idPermission;
    const { role, can_create_project, can_edit_project, can_delete_project, can_manage_users, can_assign_tasks, can_export_stats, idType } = req.body;

    try {
        const permission = await prisma.permission.update({
            where: {
                idPermission: Number(id),
            },
            data: {
                role: role,
                can_create_project: can_create_project,
                can_edit_project: can_edit_project,
                can_delete_project: can_delete_project,
                can_manage_users: can_manage_users,
                can_assign_tasks: can_assign_tasks,
                can_export_stats: can_export_stats,
                idType: idType
            },
        })
        res.status(200).json(permission)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Delete permission by id
exports.delete = async (req, res) => {
    const id = req.params.idPermission;
    try {
        await prisma.permission.delete({
            where: {
                idPermission: Number(id),
            },
        })
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}