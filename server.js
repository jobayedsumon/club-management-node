const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//Serve static imag or files
app.use(express.static(__dirname));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to club management application." });
});
//Routes
require("./routes/auth.routes")(app);
require("./routes/member.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Connect to MongoDB database
const db = require("./models");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Suucessfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error ", err);
    process.exit();
  });
