const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const logger = require("./utils/logger");

const reconciliationRoutes = require("./routes/reconciliationRoutes");
const reportRoutes = require("./routes/reportRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/api", reconciliationRoutes);
app.use("/api", reportRoutes);

mongoose
  .connect(config.mongoUri)
  .then(() => {
    logger.info("MongoDB connected");

    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error("Database connection failed", err);
  });

app.use(errorHandler);
