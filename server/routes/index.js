const express = require("express");
const router = express.Router();

// Other sub-routers;
const usersRouter = require("./users");

// Mount sub-routers;
router.use("/users", usersRouter);

// Error handling middleware;
router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
