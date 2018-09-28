// Import all the individual models in order to establish assocations;
const User = require("./user");

// Establish associations between models/tables below;
// ******************************************* \\
// Establish associations between models/tables above;

// Barrel file for models, which are necessary for routes and testing;
module.exports = {
  User
};
