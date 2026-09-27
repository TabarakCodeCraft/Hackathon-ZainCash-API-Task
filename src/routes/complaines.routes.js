const express = require("express");
const {
  listcomplaines,
  getcomplaine,
  createcomplaine,
} = require("../controllers/complaines.controller");

const router = express.Router();

router.get("/", listcomplaines);
router.get("/:id", getcomplaine);
router.post("/", createcomplaine);

module.exports = router;
