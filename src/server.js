const express = require("express");
const morgan = require("morgan");

require("dotenv").config(); // read environment variable from .env file

// create instance of express
const app = express();

// create logger instance
const logger = morgan("dev");
app.use(logger);

// incoming request parser
app.use(express.json());

// get port from environment variable, if not exist then use default port 5000
const port = process.env.PORT || 5000;

// get router
const router = require("./routes");
// create router group
app.use("/api/v1/", router);

// run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
