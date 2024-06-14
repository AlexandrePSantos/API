const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.createUserTask = async (req, res) => {
  const { iduser, idtask } = req.body;
  const usertask = await prisma.usertask.create({
    data: {
      iduser,
      idtask,
    },
  });
  res.json(usertask);
};

exports.getUserTasks = async (req, res) => {
  try {
    const response = await prisma.usertask.findMany();
    res.status(200).json(response)
  } catch (error) {
      res.status(500).json({ msg: error.message })
  }
};
