// creating the model for Clients
const moongoose = require("mongoose");

// Creating moongoose schema for Clients
const ClientSchema = new moongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

// exporting the model
//  model() gets the arguments 'Client' as name of the model and the schema
module.exports = moongoose.model("Clients", ClientSchema);
