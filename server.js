const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const tourController = require("./controllers/tours");
const userController = require("./controllers/users");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const requireAuth = require("./middleware/requireAuth");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/tours", tourController.fetchNotes);
app.get("/tour/:id", tourController.fetchNote);
app.post("/tour", tourController.createNote);
app.put("/tour/:id", tourController.updateNote);
app.delete("/tour/:id", tourController.deleteNote);

app.post("/signup", userController.signup);
app.post("/login", userController.login);
app.get("/logout", userController.logout);
app.get("/check-auth", requireAuth, userController.checkAuth);

app.get("/", (req, res) => {
  res.json("Hello World");
});

connectDB();
app.listen(process.env.PORT);
