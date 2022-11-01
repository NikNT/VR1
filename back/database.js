const mongoose = require("mongoose");

function dbConnect() {
  const DB_URL = process.env.DB_URL;

  //DataBase Connection

  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection Error: "));
  db.once("open", () => {
    console.log("DB Connected");
  });
}

module.exports = dbConnect;
