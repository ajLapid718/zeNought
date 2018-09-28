// Module dependencies;
const Sequelize = require("sequelize");
const pkg = require("../../package.json");

// Tailor the name of the Postgres database to the current environment;
const databaseName = pkg.name.toLowerCase() + (process.env.NODE_ENV === "test" ? "-test" : "");

// Confirmation message;
// In production, limit the amount of console logs, remove as necessary;
console.log("Opening database connection");

// This is our entry point, we instantiate the Sequelize instance accordingly;
const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, { logging: false });

// If we are in a testing environment, close the connection to the Sequelize instance;
// Close all connections used by this Sequelize instance, and free all references so the instance can be garbage collected;
if (process.env.NODE_ENV === "test") {
  after("close database connection", () => db.close());
}

// Export our instance of Sequelize, which will be modified with models;
module.exports = db;
