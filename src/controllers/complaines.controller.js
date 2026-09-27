const prisma = require("../lib/prisma");

async function listcomplaines(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const [complaines, total] = await Promise.all([
      prisma.complaines.findMany({
        include: { ticket: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.complaines.count(),
    ]);

    res.json({
      data: complaines,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    console.error("listcomplaines error:", err);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
}

async function getcomplaine(req, res) {
  try {
    const complaine = await prisma.complaines.findUnique({
      where: { UniqueID: req.params.id },
      include: { ticket: true },
    });

    if (!complaine) {
      return res.status(404).json({ error: "complaine not found" });
    }

    res.json(complaine);
  } catch (err) {
    console.error("getcomplaine error:", err);
    res.status(500).json({ error: "Failed to fetch complaint" });
  }
}

async function createcomplaine(req, res) {
  try {
    const { msgs } = req.body;

    if (!msgs) {
      return res.status(400).json({ error: "msgs is required" });
    }

    const complaine = await prisma.complaines.create({
      data: { msgs },
    });

    res.status(201).json(complaine);
  } catch (err) {
    console.error("createcomplaine error:", err);
    res.status(500).json({ error: "Failed to create complaint" });
  }
}

module.exports = {
  listcomplaines,
  getcomplaine,
  createcomplaine,
};