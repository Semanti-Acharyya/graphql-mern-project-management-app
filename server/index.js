const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const port = process.env.PORT || 5001;

const app = express();

// Connect to database
connectDB();

app.use(cors());

// Middleware sets up express app to handle graphql requests
// and custom schema to resolve queries
// show the GraphiQL UI (only in development)
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server is running on port ${port}`));
