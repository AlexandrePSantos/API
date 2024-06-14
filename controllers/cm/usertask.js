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
  const usertask = await prisma.usertask.findMany({
    data: {
      iduser,
      idtask,
    },
  });
  res.json(usertask);
};
