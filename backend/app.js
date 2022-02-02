const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
/* const { controller } = require('./Mongo/mongoController'); */
const MongoRouter = require("./Router/mongoRouter");
const KisanRouter = require("./Router/kisanRouter");

const session = require("express-session");
const loginRouter = require("./Router/loginRouter");
const middlewares = require("./Middleware/middleware");
const { controller } = require("./Mongo/loginController");

var MongoDBStore = require("connect-mongodb-session")(session);

//Conifiguring the dotenv to read the env file variables.
dotenv.config({ path: path.resolve(__dirname, "../.env.prod") });

const app = express();

// -------------------------------- Session initilization ----------------------------
var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/VVMS",
  collection: "mySessions",
});
store.on("error", function (error) {
  console.log(error);
});
// -------------------------------- Session initilization ----------------------------

app.listen(process.env.NODE_PORT);
console.log(`Server Listening on ${process.env.NODE_PORT}`);

//Creating MONGO Connection
/* (async () => await controller("Patch",{id:'60ec52b2fb729b44c4e48667'}))(); */

//Creating the build folder path tos erver static resource from build.
app.use(express.static(path.join(__dirname, "build")));

//Enable JSON POST REQUEST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionMW = session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: store,
  cookie: {
    httpOnly: true,
    maxAge: 3600000,
  },
});

app.use("/mongo", sessionMW, middlewares.isAuthenticated, MongoRouter);
app.use("/kisan", sessionMW, middlewares.isAuthenticated, KisanRouter);
app.use("/login", sessionMW, middlewares.isAuthenticated, loginRouter);

app.post("/getLogin", sessionMW, async (req, res) => {
  const logins = await controller("get", {
    userName: req.body.userName,
    password: req.body.password,
  });
  if (logins && Object.keys(logins).length > 0) {
    req.session.user = req.body.userName;
    console.log("Session", req.session.id);
    res.status(200).send({ logins });
  } else {
    res
      .status(400)
      .send({ success: false, message: "Invalid UserName or Password!" });
  }
});

app.get("/logout", sessionMW, (req, res) => {
  console.log("logout session", req.session);
  if (req.session) {
    req.session.destroy();
    delete req.session;
  }
  res.status(200).send({ message: "Logout SuccessFul" });
});

// ALL the API Calls Get Here
app.get("/api/getName", (req, res) => {
  res.send({ message: "hello From API" });
});
app.get("/api/heartbeat", (req, res) => {
  console.log(process.env.NODE_PORT);
  res.send({ message: "Backend Application is alive." });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
