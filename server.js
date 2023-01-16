const app = require("./app")
const mongoose = require("mongoose")

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server started, use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not started. Error message: ${err.message}`);
    process.exit(1);
  });
