require("dotenv").config();
const express = require("express");

const app = express();
const dbConnect = require("./database");

const router = require("./routes");
const cors = require("cors");

const corsOption = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));

const PORT = process.env.PORT || 5500;
dbConnect();
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello from ExpressJS!");
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
