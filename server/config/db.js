const mogoose = require("mongoose");

// using async function to connect to the database
// as mongoose functions return promises
const connectDB = async () => {
  const conn = await mogoose.connect(process.env.MONGO_URI);
  // logs a message to the console when the app successfully connects to MongoDB
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose.
// It uses an async function to establish the connection and logs a message to the console when successful.
// The connection string is stored in an environment variable called MONGO_URI in .env file
// The connectDB function is exported for use in other parts of the application.
