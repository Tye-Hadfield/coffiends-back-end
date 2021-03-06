const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
require("./passport.js");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

const CONNECTION_URL =
  "mongodb+srv://ntaevere:ntaevere123@coffee.nip9p.mongodb.net/coffiends?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

app.use(session({
  secret: "secret", // should be changed & in .env
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
      mongooseConnection: mongoose.connection
  })
}));

app.use(cookieParser("secret"));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
app.use("/coffees", require("./routes/coffees.js"));
app.use("/cafes", require("./routes/cafes.js"));
app.use("/users", require("./routes/users.js"));
app.use("/map", require("./routes/map.js"));
app.use("/orders", require("./routes/orders.js"));
app.use("/menuItems", require("./routes/menuItems.js"));
