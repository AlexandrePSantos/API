const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');

// Return all users
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.user.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Return user by id
exports.getById = async (req, res) => {
    const id = req.params.idUser;
    try {
        const response = await prisma.user.findUnique({
            where: {
                idUser: Number(id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// Create user
exports.create = async (req, res) => {
    const { email, photo, password, idType, username, name, last_login } = req.body;
    var hashedPassword = bcrypt.hashSync(password, 8);
    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                photo: photo,
                password: hashedPassword,
                idType: idType,
                username: username,
                name: name,
                last_login: last_login
            },
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
// Update user
exports.update = async (req, res) => {
    const id = req.params.id;
    const { email, photo, password, idType, username, name, last_login } = req.body;
    var hashedPassword = bcrypt.hashSync(password, 8);
    try {
        const user = await prisma.user.update({
            where: {
                idUser: Number(id),
            },
            data: {
                email: email,
                photo: photo,
                password: hashedPassword,
                idType: idType,
                username: username,
                name: name,
                last_login: last_login
            },
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Delete user by id
exports.delete = async (req, res) => {
    const id = req.params.idUser;
    try {
        await prisma.user.delete({
            where: {
                idUser: Number(id),
            },
        })
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}