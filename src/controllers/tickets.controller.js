const prisma = require("../lib/prisma");

async function listTickets(req, res) {
  const { status, category, priority } = req.query;
  const tickets = await prisma.tickets.findMany({
    where: {
      ...(status && { status }),
      ...(category && { category }),
      ...(priority && { priority: Number(priority) }),
    },
    include: { complaine: true },
    orderBy: { UniqueID: "desc" },
  });
  res.json(tickets);
}

async function getTicket(req, res) {
  const ticket = await prisma.tickets.findUnique({
    where: { UniqueID: req.params.id },
    include: { complaine: true },
  });
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.json(ticket);
}

async function updateTicket(req, res) {
  const {
    status,
    draft_report,
    department,
    category,
    priority,
    confidence_score,
    extracted_entites,
  } = req.body;
  try {
    const ticket = await prisma.tickets.update({
      where: { UniqueID: req.params.id },
      data: {
        ...(status && { status }),
        ...(draft_report !== undefined && { draft_report }),
        ...(department !== undefined && { department }),
        ...(category && { category }),
        ...(priority !== undefined && { priority: Number(priority) }),
        ...(confidence_score !== undefined && { confidence_score }),
        ...(extracted_entites !== undefined && { extracted_entites }),
      },
    });
    res.json(ticket);
  } catch (err) {
    res.status(404).json({ error: "Ticket not found" });
  }
}

async function deleteTicket(req, res) {
  try {
    await prisma.tickets.delete({ where: { UniqueID: req.params.id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: "Ticket not found" });
  }
}

module.exports = { listTickets, getTicket, updateTicket, deleteTicket };
//this for next step