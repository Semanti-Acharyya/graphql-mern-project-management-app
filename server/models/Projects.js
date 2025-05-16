// Creating a model for Projects
const moongoose = require("mongoose");

// Creating moongoose schema for Projects
const ProjectSchema = new moongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"],
  },
  clientId: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "Client", // reference to the Client model
  },
});

// exporting the model
//  model() gets the arguments 'Project' as name of the model and the schema
module.exports = moongoose.model("Project", ProjectSchema);
