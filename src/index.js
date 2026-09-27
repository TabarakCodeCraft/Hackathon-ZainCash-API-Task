require("dotenv").config();
const express = require("express");
const cors = require("cors");

const ticketsRouter = require("./routes/tickets.routes");
const complainesRouter = require("./routes/complaines.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/tickets", ticketsRouter);
app.use("/complaines", complainesRouter);


app.use((req, res) => res.status(404).json({ error: "Not found" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
