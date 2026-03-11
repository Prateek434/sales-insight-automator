require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const limiter = require("./middleware/rateLimit");
const uploadRouter = require("./routes/upload");
const openApiSpec = require("./openapi.json");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));
app.use(limiter);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/upload", uploadRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.listen(PORT, () => {
  process.stderr.write(`Server running on port ${PORT}\n`);
});
