// Import our db instance;
const db = require("./db");

// Register our models, including their relationships;
require("./models");

// Export the modified database instance, which will be used in our application;
module.exports = db;
