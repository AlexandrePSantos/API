const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../../utils/authenticate.js');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(`Attempting to sign in with email: ${email}`);

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (user) {
            console.log(`User found: ${JSON.stringify(user)}`);

            var passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );

            console.log(`Password is valid: ${passwordIsValid}`);

            if (passwordIsValid) {
                const accessToken = authenticateUtil.generateAccessToken({ id: user.id, name: user.name });
                res.status(200).json({ name: user.name, token: accessToken });
                return;
            }
        } else {
            console.log('No user found with that email');
        }

        res.status(401).json({ msg: "invalid_login" });

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(401).json({ msg: error.message })
    }
}


exports.signup = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;

        await prisma.users.create({
            data: {
                email: email,
                username: username,
                name: name,
                password: bcrypt.hashSync(password, 8),
            },
        })

        return this.signin(req, res);
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}