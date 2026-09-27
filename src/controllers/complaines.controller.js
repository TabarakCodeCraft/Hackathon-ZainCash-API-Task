const prisma = require("../lib/prisma");

async function listcomplaines(req, res) {
  const complaines = await prisma.complaines.findMany({
    include: { ticket: true },
    orderBy: { createdAt: "desc" },
  });

  res.json(complaines);
}

async function getcomplaine(req, res) {
  const complaine = await prisma.complaines.findUnique({
    where: { UniqueID: req.params.id },
    include: { ticket: true },
  });

  if (!complaine) {
    return res.status(404).json({
      error: "complaine not found",
    });
  }

  res.json(complaine);
}

async function createcomplaine(req, res) {
  const { msgs } = req.body;

  if (!msgs) {
    return res.status(400).json({
      error: "msgs is required",
    });
  }

  const complaine = await prisma.complaines.create({
    data: {
      msgs,
    },
  });

  res.status(201).json(complaine);
}

module.exports = {
  listcomplaines,
  getcomplaine,
  createcomplaine,
};