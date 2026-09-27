const express = require("express");
const {
  listTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/tickets.controller");

const router = express.Router();

router.get("/", listTickets);
router.get("/:id", getTicket);
router.patch("/:id", updateTicket);
router.delete("/:id", deleteTicket);

module.exports = router;
