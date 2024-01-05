import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./index";

// Stop the server if something goes wrong with initialization
process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION!");
  console.log(err.name, err.message);
  process.exit(1);
});

// Connect to database
mongoose
  .connect(process.env.DATABASE!)
  .then(() => console.log("DB Connection Success!"));

// Start the server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Stop the server if something went wrong with the connection
process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
